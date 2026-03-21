import ConfigUploadPage from "../components/config/ConfigUploadPage";
import { uploadSecciones, fetchSecciones } from "../services/api";

export default function SeccionesPage() {
  return (
    <ConfigUploadPage
      title="Configuración de Secciones"
      expectedHeaders={["id_seccion", "nombre"]}
      uploadFn={uploadSecciones}
      fetchFn={fetchSecciones}
      idField="id_seccion"
    />
  );
}
