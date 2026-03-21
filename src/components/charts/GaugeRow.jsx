import GaugeChart from "./GaugeChart";

export default function GaugeRow({ gaugeValues }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <div className="grid grid-cols-2 gap-4">
        <GaugeChart
          value={gaugeValues.distinctProductsPerOrder}
          maxValue={10}
          title="Productos distintos por pedido"
          color="#6366F1"
        />
        <GaugeChart
          value={gaugeValues.avgQuantityPerItem}
          maxValue={10}
          title="Cantidad media por articulo"
          color="#F59E0B"
        />
      </div>
    </div>
  );
}
