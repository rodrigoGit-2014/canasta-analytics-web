import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Sidebar from "./components/layout/Sidebar";
import SalesDashboard from "./pages/SalesDashboard";
import UploadTransactionsPage from "./pages/UploadTransactionsPage";
import AnalyticsOverview from "./pages/AnalyticsOverview";
import ProductInsights from "./pages/ProductInsights";
import CustomerInsights from "./pages/CustomerInsights";
import OrdersInsights from "./pages/OrdersInsights";
import DepartamentosPage from "./pages/DepartamentosPage";
import SeccionesPage from "./pages/SeccionesPage";
import PurchasePatternsPage from "./pages/PurchasePatternsPage";
import ProductRecommendationsPage from "./pages/ProductRecommendationsPage";
import ProductRelationshipsPage from "./pages/ProductRelationshipsPage";
import { InteligenciaProvider } from "./contexts/InteligenciaContext";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout sidebar={<Sidebar />}>
        <InteligenciaProvider>
          <Routes>
            <Route path="/sales-dashboard" element={<SalesDashboard />} />
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
            {/* Inteligencia Comercial */}
            <Route path="/inteligencia/patrones" element={<PurchasePatternsPage />} />
            <Route path="/inteligencia/recomendaciones" element={<ProductRecommendationsPage />} />
            <Route path="/inteligencia/relaciones" element={<ProductRelationshipsPage />} />
            {/* Redirect old route */}
            <Route path="/association-rules" element={<Navigate to="/inteligencia/patrones" replace />} />
            <Route path="*" element={<Navigate to="/sales-dashboard" replace />} />
          </Routes>
        </InteligenciaProvider>
      </DashboardLayout>
    </BrowserRouter>
  );
}
