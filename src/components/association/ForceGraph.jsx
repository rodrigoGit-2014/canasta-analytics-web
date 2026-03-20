import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";

export default function ForceGraph({ data, selectedProduct }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 450 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDimensions({ width, height: 450 });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderGraph = useCallback(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const { nodes, links } = data;

    if (nodes.length === 0) return;

    const nodesCopy = nodes.map((d) => ({ ...d }));
    const linksCopy = links.map((d) => ({ ...d }));

    const liftExtent = d3.extent(linksCopy, (d) => d.lift);
    const strokeScale = d3
      .scaleLinear()
      .domain(liftExtent[0] === liftExtent[1] ? [0, liftExtent[1]] : liftExtent)
      .range([1, 5]);

    const opacityScale = d3
      .scaleLinear()
      .domain(liftExtent[0] === liftExtent[1] ? [0, liftExtent[1]] : liftExtent)
      .range([0.3, 0.9]);

    const linkCounts = {};
    linksCopy.forEach((l) => {
      linkCounts[l.source] = (linkCounts[l.source] || 0) + 1;
      linkCounts[l.target] = (linkCounts[l.target] || 0) + 1;
    });

    const radiusScale = d3
      .scaleSqrt()
      .domain([1, d3.max(Object.values(linkCounts)) || 1])
      .range([8, 24]);

    const simulation = d3
      .forceSimulation(nodesCopy)
      .force(
        "link",
        d3
          .forceLink(linksCopy)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d) => radiusScale(linkCounts[d.id] || 1) + 4));

    // Arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-4L10,0L0,4")
      .attr("fill", "#94A3B8");

    const g = svg.append("g");

    // Zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 4])
      .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);

    // Links
    const link = g
      .append("g")
      .selectAll("line")
      .data(linksCopy)
      .join("line")
      .attr("stroke", "#94A3B8")
      .attr("stroke-width", (d) => strokeScale(d.lift))
      .attr("stroke-opacity", (d) => opacityScale(d.lift))
      .attr("marker-end", "url(#arrowhead)");

    // Nodes
    const node = g
      .append("g")
      .selectAll("g")
      .data(nodesCopy)
      .join("g")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Circle
    node
      .append("circle")
      .attr("r", (d) => radiusScale(linkCounts[d.id] || 1))
      .attr("fill", (d) => d.color)
      .attr("fill-opacity", (d) =>
        d.id === selectedProduct ? 1 : 0.8
      )
      .attr("stroke", (d) =>
        d.id === selectedProduct ? "#1E40AF" : "#fff"
      )
      .attr("stroke-width", (d) => (d.id === selectedProduct ? 3 : 2));

    // Label
    node
      .append("text")
      .text((d) =>
        d.id.length > 18 ? d.id.slice(0, 16) + "..." : d.id
      )
      .attr("text-anchor", "middle")
      .attr("dy", (d) => radiusScale(linkCounts[d.id] || 1) + 14)
      .attr("font-size", "10px")
      .attr("font-family", "Inter, system-ui, sans-serif")
      .attr("fill", "#4B5563")
      .attr("pointer-events", "none");

    // Tooltip on hover
    node
      .on("mouseenter", (event, d) => {
        const relatedLinks = linksCopy.filter(
          (l) =>
            (l.source.id || l.source) === d.id ||
            (l.target.id || l.target) === d.id
        );
        const rect = containerRef.current.getBoundingClientRect();
        setTooltip({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          product: d.id,
          category: d.category,
          connections: relatedLinks.length,
          avgLift:
            relatedLinks.length > 0
              ? (
                  relatedLinks.reduce((s, l) => s + l.lift, 0) /
                  relatedLinks.length
                ).toFixed(2)
              : 0,
        });
      })
      .on("mouseleave", () => setTooltip(null));

    link
      .on("mouseenter", (event, d) => {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltip({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          product: `${d.source.id || d.source} → ${d.target.id || d.target}`,
          category: "Regla",
          connections: null,
          avgLift: d.lift.toFixed(2),
          confidence: d.confidence.toFixed(1),
          support: d.support.toFixed(1),
        });
      })
      .on("mouseleave", () => setTooltip(null));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [data, dimensions, selectedProduct]);

  useEffect(() => {
    renderGraph();
  }, [renderGraph]);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-fade-in-up relative"
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Grafo de Asociaciones
      </h3>
      <div className="rounded-lg overflow-hidden bg-gray-50/50 border border-gray-100">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="block"
        />
      </div>

      {data.nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-gray-400">
            Selecciona un producto o categoria para ver asociaciones
          </p>
        </div>
      )}

      {tooltip && (
        <div
          className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 text-xs pointer-events-none"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 10,
            maxWidth: 220,
          }}
        >
          <p className="font-semibold text-gray-900">{tooltip.product}</p>
          <p className="text-gray-500">{tooltip.category}</p>
          {tooltip.connections != null && (
            <p className="text-gray-500 mt-1">
              Conexiones: {tooltip.connections}
            </p>
          )}
          <p className="text-gray-500">Lift: {tooltip.avgLift}</p>
          {tooltip.confidence && (
            <p className="text-gray-500">Confianza: {tooltip.confidence}%</p>
          )}
          {tooltip.support && (
            <p className="text-gray-500">Soporte: {tooltip.support}%</p>
          )}
        </div>
      )}
    </div>
  );
}
