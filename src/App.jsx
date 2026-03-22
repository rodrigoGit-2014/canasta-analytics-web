import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Sidebar from "./components/layout/Sidebar";
import SalesDashboard from "./pages/SalesDashboard";
import AssociationDashboard from "./pages/AssociationDashboard";
import ProductExplorer from "./pages/ProductExplorer";
import UploadTransactionsPage from "./pages/UploadTransactionsPage";
import AnalyticsOverview from "./pages/AnalyticsOverview";
import ProductInsights from "./pages/ProductInsights";
import CustomerInsights from "./pages/CustomerInsights";
import OrdersInsights from "./pages/OrdersInsights";
import DepartamentosPage from "./pages/DepartamentosPage";
import SeccionesPage from "./pages/SeccionesPage";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout sidebar={<Sidebar />}>
        <Routes>
          <Route path="/sales-dashboard" element={<SalesDashboard />} />
          <Route path="/association-rules" element={<AssociationDashboard />} />
          <Route path="/product-explorer" element={<ProductExplorer />} />
          <Route
            path="/upload-transactions"
            element={<UploadTransactionsPage />}
          />
          <Route path="/analytics-overview" element={<AnalyticsOverview />} />
          <Route path="/products-insights" element={<ProductInsights />} />
          <Route path="/customers-insights" element={<CustomerInsights />} />
          <Route path="/orders-insights" element={<OrdersInsights />} />
          <Route path="/configuracion/departamentos" element={<DepartamentosPage key="departamentos" />} />
          <Route path="/configuracion/secciones" element={<SeccionesPage key="secciones" />} />
          <Route path="*" element={<Navigate to="/sales-dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
