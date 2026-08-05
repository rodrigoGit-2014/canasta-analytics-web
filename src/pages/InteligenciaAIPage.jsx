import { useState } from "react";
import { Brain } from "lucide-react";
import AITabNavigation from "../components/ai/AITabNavigation";
import InsightsPanel from "../components/ai/InsightsPanel";
import ReportsPanel from "../components/ai/ReportsPanel";
import ChatPanel from "../components/ai/ChatPanel";

const TABS = [
  { id: "insights", label: "Insights Estrategicos" },
  { id: "reports", label: "Centro de Reportes" },
  { id: "chat", label: "Consulta AI" },
];

export default function InteligenciaAIPage() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-purple-600/20 flex items-center justify-center">
          <Brain size={18} className="text-purple-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Inteligencia AI</h1>
          <p className="text-xs text-slate-500">Insights estrategicos generados con inteligencia artificial</p>
        </div>
      </div>

      <AITabNavigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "insights" && <InsightsPanel />}
        {activeTab === "reports" && <ReportsPanel />}
        {activeTab === "chat" && <ChatPanel />}
      </div>
    </>
  );
}
