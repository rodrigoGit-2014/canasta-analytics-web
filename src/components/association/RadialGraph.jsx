import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { SECTION_CATEGORIES } from "../../data/categories";

export default function RadialGraph({ product, recommendations, onNodeClick }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 500 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDimensions({ width: Math.max(width, 400), height: 500 });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const cx = width / 2;
    const cy = height / 2;

    if (!recommendations || recommendations.length === 0) return;

    const maxLift = d3.max(recommendations, (d) => d.lift) || 1;
    const minLift = d3.min(recommendations, (d) => d.lift) || 1;

    // Distance: higher lift = closer to center
    const distanceScale = d3
      .scaleLinear()
      .domain([maxLift, minLift])
      .range([80, Math.min(width, height) / 2 - 50]);

    const confidenceScale = d3
      .scaleLinear()
      .domain([0, d3.max(recommendations, (d) => d.confidence) || 1])
      .range([1.5, 5]);

    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);

    // Center node
    g.append("circle")
      .attr("cx", cx).attr("cy", cy)
      .attr("r", 28)
      .attr("fill", "#3B82F6")
      .attr("stroke", "#1E40AF")
      .attr("stroke-width", 3);

    g.append("text")
      .attr("x", cx).attr("y", cy)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "white")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("font-family", "Inter, system-ui, sans-serif")
      .text(product.length > 14 ? product.slice(0, 12) + "..." : product);

    // Satellite nodes
    const angleStep = (2 * Math.PI) / recommendations.length;

    recommendations.forEach((rec, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const dist = distanceScale(rec.lift);
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;

      const sectionColor = SECTION_CATEGORIES[rec.section]?.color || "#6B7280";

      // Connection line
      g.append("line")
        .attr("x1", cx).attr("y1", cy)
        .attr("x2", x).attr("y2", y)
        .attr("stroke", sectionColor)
        .attr("stroke-width", confidenceScale(rec.confidence))
        .attr("stroke-opacity", 0.4);

      // Node
      const nodeG = g.append("g")
        .attr("transform", `translate(${x},${y})`)
        .style("cursor", "pointer");

      const radius = rec.strength === "strong" ? 20 : rec.strength === "medium" ? 16 : 12;

      nodeG.append("circle")
        .attr("r", radius)
        .attr("fill", sectionColor)
        .attr("fill-opacity", 0.85)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

      nodeG.append("text")
        .attr("y", radius + 14)
        .attr("text-anchor", "middle")
        .attr("fill", "#9CA3AF")
        .attr("font-size", "9px")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .text(rec.product.length > 16 ? rec.product.slice(0, 14) + "..." : rec.product);

      // Lift label inside node
      nodeG.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "white")
        .attr("font-size", "8px")
        .attr("font-weight", "bold")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .text(`${rec.lift.toFixed(1)}x`);

      // Interactions
      nodeG.on("mouseenter", (event) => {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltip({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          product: rec.product,
          lift: rec.lift,
          confidence: rec.confidence,
          support: rec.support,
          strength: rec.strength,
          section: SECTION_CATEGORIES[rec.section]?.label || rec.section,
        });
      });

      nodeG.on("mouseleave", () => setTooltip(null));
      nodeG.on("click", () => onNodeClick?.(rec.product));
    });
  }, [product, recommendations, dimensions, onNodeClick]);

  const strengthLabel = { strong: "Fuerte", medium: "Moderada", weak: "Debil" };
  const strengthColor = { strong: "text-emerald-400", medium: "text-blue-400", weak: "text-slate-400" };

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-fade-in-up relative">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Asociaciones de {product}
        <span className="ml-2 text-xs font-normal text-gray-400">Click en un nodo para explorarlo</span>
      </h3>
      <div className="rounded-lg overflow-hidden bg-gray-50/50 border border-gray-100">
        <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="block" />
      </div>

      {tooltip && (
        <div
          className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 text-xs pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10, maxWidth: 240 }}
        >
          <p className="font-semibold text-gray-900">{tooltip.product}</p>
          <p className="text-gray-500">{tooltip.section}</p>
          <div className="mt-1 space-y-0.5">
            <p className="text-gray-500">Lift: <span className="font-semibold text-gray-700">{tooltip.lift.toFixed(2)}x</span></p>
            <p className="text-gray-500">Confianza: {(tooltip.confidence * 100).toFixed(1)}%</p>
            <p className="text-gray-500">Soporte: {(tooltip.support * 100).toFixed(2)}%</p>
            <p className={`font-semibold ${strengthColor[tooltip.strength]}`}>
              {strengthLabel[tooltip.strength]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
