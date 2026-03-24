import ConfigUploadPage from "../components/config/ConfigUploadPage";
import { uploadSecciones, fetchSecciones, deleteSecciones } from "../services/api";

export default function SeccionesPage() {
  return (
    <ConfigUploadPage
      title="Configuracion de Secciones"
      expectedHeaders={["id_seccion", "nombre"]}
      uploadFn={uploadSecciones}
      fetchFn={fetchSecciones}
      deleteFn={deleteSecciones}
      idField="id_seccion"
    />
  );
}
