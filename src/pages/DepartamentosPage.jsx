import ConfigUploadPage from "../components/config/ConfigUploadPage";
import { uploadDepartamentos, fetchDepartamentos, deleteDepartamentos } from "../services/api";

export default function DepartamentosPage() {
  return (
    <ConfigUploadPage
      title="Configuracion de Departamentos"
      expectedHeaders={["id_departamento", "nombre"]}
      uploadFn={uploadDepartamentos}
      fetchFn={fetchDepartamentos}
      deleteFn={deleteDepartamentos}
      idField="id_departamento"
    />
  );
}
