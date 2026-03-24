import { Routes, Route, Navigate } from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { InteligenciaProvider } from "./contexts/InteligenciaContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout sidebar={<Sidebar />}>
              <InteligenciaProvider>
                <Routes>
                  <Route path="/sales-dashboard" element={<SalesDashboard />} />
                  <Route path="/upload-transactions" element={<UploadTransactionsPage />} />
                  <Route path="/analytics-overview" element={<AnalyticsOverview />} />
                  <Route path="/products-insights" element={<ProductInsights />} />
                  <Route path="/customers-insights" element={<CustomerInsights />} />
                  <Route path="/orders-insights" element={<OrdersInsights />} />
                  <Route path="/configuracion/departamentos" element={<DepartamentosPage key="departamentos" />} />
                  <Route path="/configuracion/secciones" element={<SeccionesPage key="secciones" />} />
                  <Route path="/inteligencia/patrones" element={<PurchasePatternsPage />} />
                  <Route path="/inteligencia/recomendaciones" element={<ProductRecommendationsPage />} />
                  <Route path="/inteligencia/relaciones" element={<ProductRelationshipsPage />} />
                  <Route path="/association-rules" element={<Navigate to="/inteligencia/patrones" replace />} />
                  <Route path="*" element={<Navigate to="/analytics-overview" replace />} />
                </Routes>
              </InteligenciaProvider>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
