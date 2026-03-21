export default function CsvPreviewTable({ headers, rows }) {
  if (!headers || headers.length === 0) return null;

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] p-6 animate-fade-in-up">
      <h3 className="text-sm font-semibold text-white mb-4">
        Vista previa del archivo ({rows.length} filas)
      </h3>
      <div className="overflow-x-auto max-h-64 overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0">
            <tr className="bg-[#1a1f2e]">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-[#1e2433] hover:bg-[#1a1f2e] transition-colors"
              >
                {headers.map((h, j) => (
                  <td key={j} className="px-4 py-2.5 text-slate-300">
                    {row[j] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
