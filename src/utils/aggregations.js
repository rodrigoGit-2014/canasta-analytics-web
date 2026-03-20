export function groupByDate(data, granularity) {
  const groups = {};

  data.forEach((row) => {
    const key = getDateKey(row.fecha, granularity);
    groups[key] = (groups[key] || 0) + row.precio_total;
  });

  return Object.entries(groups)
    .map(([period, total]) => ({ period, total: parseFloat(total.toFixed(2)) }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

function getDateKey(dateStr, granularity) {
  switch (granularity) {
    case "daily":
      return dateStr;
    case "weekly":
      return getWeekKey(dateStr);
    case "monthly":
      return dateStr.slice(0, 7);
    default:
      return dateStr;
  }
}

function getWeekKey(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const diff = d - yearStart;
  const weekNum = Math.ceil((diff / 86400000 + yearStart.getDay() + 1) / 7);
  return `${d.getFullYear()}-S${String(weekNum).padStart(2, "0")}`;
}

export function formatDateLabel(period, granularity) {
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];

  switch (granularity) {
    case "daily": {
      const d = new Date(period + "T00:00:00");
      return `${d.getDate()} ${months[d.getMonth()]}`;
    }
    case "weekly":
      return period;
    case "monthly": {
      const [year, month] = period.split("-");
      return `${months[parseInt(month) - 1]} ${year}`;
    }
    default:
      return period;
  }
}
