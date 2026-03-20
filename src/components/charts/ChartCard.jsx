export default function ChartCard({ title, actions, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}
