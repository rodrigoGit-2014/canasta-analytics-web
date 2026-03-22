import { useState, useEffect } from "react";
import { Building2, LayoutList } from "lucide-react";
import { fetchDepartamentos, fetchSecciones } from "../../services/api";

export default function DepartmentSectionFilter({
  departmentId,
  sectionId,
  onDepartmentChange,
  onSectionChange,
}) {
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchDepartamentos().then(setDepartments).catch(() => {});
    fetchSecciones().then(setSections).catch(() => {});
  }, []);

  const filteredSections = departmentId
    ? sections.filter((s) => s.id_departamento === departmentId)
    : sections;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative">
        <Building2
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
        <select
          value={departmentId || ""}
          onChange={(e) => {
            onDepartmentChange(e.target.value || null);
            onSectionChange(null);
          }}
          className="pl-9 pr-4 py-2.5 text-sm border border-[#1e2433] rounded-lg bg-[#151721] text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer min-w-[180px]"
        >
          <option value="">Todos los departamentos</option>
          {departments.map((d) => (
            <option key={d.id_departamento} value={d.id_departamento}>
              {d.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <LayoutList
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
        <select
          value={sectionId || ""}
          onChange={(e) => onSectionChange(e.target.value || null)}
          className="pl-9 pr-4 py-2.5 text-sm border border-[#1e2433] rounded-lg bg-[#151721] text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer min-w-[160px]"
        >
          <option value="">Todas las secciones</option>
          {filteredSections.map((s) => (
            <option key={s.id_seccion} value={s.id_seccion}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
