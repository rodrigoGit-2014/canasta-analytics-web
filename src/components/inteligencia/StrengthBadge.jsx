import { getStrengthLabel } from "../../utils/ruleTranslator";

export default function StrengthBadge({ value }) {
  const { label, bg, text } = getStrengthLabel(value);
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {label}
    </span>
  );
}
