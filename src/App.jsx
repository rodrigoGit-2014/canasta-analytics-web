import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Sidebar from "./components/layout/Sidebar";
import SalesDashboard from "./pages/SalesDashboard";
import AssociationDashboard from "./pages/AssociationDashboard";
import UploadTransactionsPage from "./pages/UploadTransactionsPage";
import AnalyticsOverview from "./pages/AnalyticsOverview";
import ProductInsights from "./pages/ProductInsights";
import CustomerInsights from "./pages/CustomerInsights";
import OrdersInsights from "./pages/OrdersInsights";
import DepartamentosPage from "./pages/DepartamentosPage";
import SeccionesPage from "./pages/SeccionesPage";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <BrowserRouter>
      <DashboardLayout
        sidebar={
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        }
      >
        <Routes>
          <Route
            path="/sales-dashboard"
            element={<SalesDashboard selectedCategory={selectedCategory} />}
          />
          <Route
            path="/association-rules"
            element={
              <AssociationDashboard selectedCategory={selectedCategory} />
            }
          />
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
