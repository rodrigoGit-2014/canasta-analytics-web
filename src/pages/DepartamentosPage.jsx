import ConfigUploadPage from "../components/config/ConfigUploadPage";
import CsvFormatGuide from "../components/help/CsvFormatGuide";
import { uploadDepartamentos, fetchDepartamentos, deleteDepartamentos } from "../services/api";

const HELP_GUIDE = (
  <CsvFormatGuide
    title="Como configurar departamentos"
    description="Los departamentos son las categorias principales de tu negocio"
    columns={[
      { name: "id_departamento", description: "Codigo unico del departamento", example: "BEB", type: "texto", required: true },
      { name: "nombre", description: "Nombre legible del departamento", example: "Bebidas", type: "texto", required: true },
    ]}
    tableExample={{
      headers: ["id_departamento", "nombre"],
      rows: [
        ["BEB", "Bebidas"],
        ["PAN", "Panaderia"],
        ["LAC", "Lacteos"],
        ["ABA", "Abarrotes"],
      ],
    }}
    csvExample={`id_departamento,nombre\nBEB,Bebidas\nPAN,Panaderia\nLAC,Lacteos\nABA,Abarrotes`}
    checklist={[
      "El archivo es formato CSV (.csv)",
      "Contiene las columnas id_departamento y nombre",
      "Cada departamento tiene un ID unico",
    ]}
    warnings={[
      "No repetir IDs de departamento",
      "Los IDs deben coincidir con los usados en transacciones",
    ]}
    tips={[
      "Los departamentos agrupan secciones relacionadas",
      "Usa IDs cortos y descriptivos para facilitar la gestion",
      "Puedes agregar o reemplazar departamentos en cualquier momento",
    ]}
  />
);

export default function DepartamentosPage() {
  return (
    <ConfigUploadPage
      title="Configuracion de Departamentos"
      expectedHeaders={["id_departamento", "nombre"]}
      uploadFn={uploadDepartamentos}
      fetchFn={fetchDepartamentos}
      deleteFn={deleteDepartamentos}
      idField="id_departamento"
      helpGuide={HELP_GUIDE}
    />
  );
}
