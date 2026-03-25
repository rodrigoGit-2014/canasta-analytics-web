import KPICard from "./KPICard";

export default function GenericKPIRow({ items, hero = false }) {
  if (!items?.length) return null;

  const heroItem = hero ? items[0] : null;
  const gridItems = hero ? items.slice(1) : items;
  const cols = gridItems.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <div className="space-y-3">
      {heroItem && (
        <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 flex items-center justify-between animate-fade-in-up">
          <div>
            <p className="text-xs text-slate-500 mb-1">{heroItem.title}</p>
            <p className="text-2xl font-bold text-white">{heroItem.value}</p>
          </div>
          {heroItem.icon && (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${heroItem.color}15` }}>
              <heroItem.icon size={22} style={{ color: heroItem.color }} />
            </div>
          )}
        </div>
      )}
      <div className={`grid grid-cols-2 ${cols} gap-3`}>
        {gridItems.map((item, i) => (
          <KPICard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
