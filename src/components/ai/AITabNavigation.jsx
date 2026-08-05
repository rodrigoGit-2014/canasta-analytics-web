export default function AITabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 bg-[#151721] rounded-xl p-1 border border-[#1e2433]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-purple-600/20 text-purple-400 border border-purple-500/20"
              : "text-slate-400 hover:text-slate-300 hover:bg-[#1a1f2e] border border-transparent"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
