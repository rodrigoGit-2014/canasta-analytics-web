import ConfigUploadPage from "../components/config/ConfigUploadPage";
import { uploadDepartamentos, fetchDepartamentos } from "../services/api";

export default function DepartamentosPage() {
  return (
    <ConfigUploadPage
      title="Configuración de Departamentos"
      expectedHeaders={["id_departamento", "nombre"]}
      uploadFn={uploadDepartamentos}
      fetchFn={fetchDepartamentos}
      idField="id_departamento"
    />
  );
}
