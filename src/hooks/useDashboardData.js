import { useMemo } from "react";
import { salesData } from "../data/salesData";
import { SECTION_CATEGORIES } from "../data/categories";
import { groupByDate } from "../utils/aggregations";

export function useDashboardData(dateRange, timeGranularity) {
  const filteredData = useMemo(() => {
    return salesData.filter((row) => {
      if (dateRange.start && row.fecha < dateRange.start) return false;
      if (dateRange.end && row.fecha > dateRange.end) return false;
      return true;
    });
  }, [dateRange]);

  const dashboard = useMemo(() => {
    const totalSales = filteredData.reduce((s, r) => s + r.precio_total, 0);

    const customerSet = new Set();
    const orderSet = new Set();
    const orderProducts = new Map();
    const productSales = {};
    const productQty = {};
    let totalQuantity = 0;

    filteredData.forEach((row) => {
      customerSet.add(row.id_cliente);
      orderSet.add(row.id_pedido);

      if (!orderProducts.has(row.id_pedido)) {
        orderProducts.set(row.id_pedido, new Set());
      }
      orderProducts.get(row.id_pedido).add(row.id_producto);

      const name = row.nombre_producto;
      productSales[name] = (productSales[name] || 0) + row.precio_total;
      productQty[name] = (productQty[name] || 0) + row.cantidad;
      totalQuantity += row.cantidad;
    });

    const totalCustomers = customerSet.size;
    const totalOrders = orderSet.size;

    const kpis = {
      totalSales: parseFloat(totalSales.toFixed(2)),
      totalCustomers,
      avgTicketOrder: totalOrders > 0 ? totalSales / totalOrders : 0,
      avgTicketCustomer: totalCustomers > 0 ? totalSales / totalCustomers : 0,
    };

    const salesEvolution = groupByDate(filteredData, timeGranularity);

    const treemapData = Object.entries(productQty)
      .map(([name, qty]) => {
        const section = filteredData.find(
          (r) => r.nombre_producto === name
        )?.id_seccion;
        return {
          name,
          size: qty,
          color: SECTION_CATEGORIES[section]?.color || "#6B7280",
        };
      })
      .sort((a, b) => b.size - a.size);

    let distinctProductsPerOrder = 0;
    if (orderProducts.size > 0) {
      const totalDistinct = [...orderProducts.values()].reduce(
        (s, set) => s + set.size,
        0
      );
      distinctProductsPerOrder = totalDistinct / orderProducts.size;
    }

    const gaugeValues = {
      distinctProductsPerOrder: parseFloat(
        distinctProductsPerOrder.toFixed(2)
      ),
      avgQuantityPerItem:
        filteredData.length > 0
          ? parseFloat((totalQuantity / filteredData.length).toFixed(2))
          : 0,
    };

    const productList = Object.entries(productSales)
      .map(([name, total]) => {
        const section = filteredData.find(
          (r) => r.nombre_producto === name
        )?.id_seccion;
        return {
          name,
          totalSales: parseFloat(total.toFixed(2)),
          totalQuantity: productQty[name],
          category: SECTION_CATEGORIES[section]?.label || "",
          color: SECTION_CATEGORIES[section]?.color || "#6B7280",
        };
      })
      .sort((a, b) => b.totalSales - a.totalSales);

    return { kpis, salesEvolution, treemapData, gaugeValues, productList };
  }, [filteredData, timeGranularity]);

  return dashboard;
}
