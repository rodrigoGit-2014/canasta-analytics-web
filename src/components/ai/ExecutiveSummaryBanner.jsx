export default function ExecutiveSummaryBanner({ title, summary }) {
  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
      <h2 className="text-base font-semibold text-white mb-3">{title}</h2>
      <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{summary}</div>
    </div>
  );
}
