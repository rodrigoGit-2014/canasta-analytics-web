import { icons } from "lucide-react";

export default function LucideIcon({ name, size = 18, className = "" }) {
  const pascalCase = name
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");

  const Icon = icons[pascalCase] || icons["CircleDot"];

  return <Icon size={size} className={className} />;
}
