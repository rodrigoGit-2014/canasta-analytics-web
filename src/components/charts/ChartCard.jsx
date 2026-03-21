export default function ChartCard({ title, actions, children }) {
  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}
