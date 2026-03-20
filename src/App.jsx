import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Sidebar from "./components/layout/Sidebar";
import SalesDashboard from "./pages/SalesDashboard";
import AssociationDashboard from "./pages/AssociationDashboard";
import UploadTransactionsPage from "./pages/UploadTransactionsPage";

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
          <Route path="*" element={<Navigate to="/sales-dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
