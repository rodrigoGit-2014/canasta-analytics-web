import ConfigUploadPage from "../components/config/ConfigUploadPage";
import CsvFormatGuide from "../components/help/CsvFormatGuide";
import { uploadSecciones, fetchSecciones, deleteSecciones } from "../services/api";

const HELP_GUIDE = (
  <CsvFormatGuide
    title="Como configurar secciones"
    description="Las secciones son subdivisiones dentro de cada departamento"
    columns={[
      { name: "id_seccion", description: "Codigo unico de la seccion", example: "GAS", type: "texto", required: true },
      { name: "nombre", description: "Nombre legible de la seccion", example: "Gaseosas", type: "texto", required: true },
    ]}
    tableExample={{
      headers: ["id_seccion", "nombre"],
      rows: [
        ["GAS", "Gaseosas"],
        ["JUG", "Jugos"],
        ["PNB", "Pan"],
        ["PST", "Pasteles"],
        ["LEC", "Leche"],
      ],
    }}
    csvExample={`id_seccion,nombre\nGAS,Gaseosas\nJUG,Jugos\nPNB,Pan\nPST,Pasteles\nLEC,Leche`}
    checklist={[
      "El archivo es formato CSV (.csv)",
      "Contiene las columnas id_seccion y nombre",
      "Cada seccion tiene un ID unico",
    ]}
    warnings={[
      "No repetir IDs de seccion",
      "Los IDs deben coincidir con los usados en transacciones",
    ]}
    tips={[
      "Las secciones permiten analisis mas granular dentro de cada departamento",
      "Ejemplo: Departamento 'Bebidas' puede tener secciones 'Gaseosas', 'Jugos', 'Aguas'",
      "La relacion departamento-seccion se establece automaticamente desde las transacciones",
    ]}
  />
);

export default function SeccionesPage() {
  return (
    <ConfigUploadPage
      title="Configuracion de Secciones"
      expectedHeaders={["id_seccion", "nombre"]}
      uploadFn={uploadSecciones}
      fetchFn={fetchSecciones}
      deleteFn={deleteSecciones}
      idField="id_seccion"
      helpGuide={HELP_GUIDE}
    />
  );
}
