import KPICard from "./KPICard";

export default function GenericKPIRow({ items }) {
  const colsClass = items.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 ${colsClass} gap-4`}>
      {items.map((item) => (
        <KPICard key={item.title} {...item} />
      ))}
    </div>
  );
}
