import { useState, useRef, useEffect } from "react";
import { Brain, Send, Trash2 } from "lucide-react";
import { useInteligencia } from "../../contexts/InteligenciaContext";
import useAIChat from "../../hooks/useAIChat";
import AIRequiresAnalysis from "./AIRequiresAnalysis";

const SUGGESTIONS = [
  "Cuales son los 3 patrones de compra mas fuertes?",
  "Que productos deberia colocar juntos en gondola?",
  "Resume las oportunidades de cross-selling",
  "Que departamento tiene mayor potencial de venta cruzada?",
  "Que estrategia de bundles recomiendas?",
];

export default function ChatPanel() {
  const { hasResults, filters } = useInteligencia();
  const { messages, isStreaming, sendMessage, clearChat } = useAIChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  if (!hasResults) return <AIRequiresAnalysis />;

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim() || isStreaming) return;
    setInput("");
    sendMessage(msg, filters.startDate, filters.endDate);
  };

  return (
    <div className="bg-[#151721] rounded-xl border border-[#1e2433] flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2433]">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-purple-400" />
          <span className="text-sm font-medium text-white">Consulta AI</span>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} className="text-slate-500 hover:text-slate-300 transition">
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Brain size={32} className="text-purple-400/30 mx-auto mb-4" />
            <p className="text-sm text-slate-500 mb-4">Pregunta sobre tus datos de ventas y patrones de compra</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 bg-[#1a1f2e] border border-[#2a3347] rounded-full text-xs text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-purple-600/20 border border-purple-500/20 rounded-2xl rounded-br-md text-white"
                : "bg-[#1a1f2e] border border-[#2a3347] rounded-2xl rounded-bl-md text-slate-300"
            }`}>
              <div className="whitespace-pre-wrap">{msg.content || (isStreaming && i === messages.length - 1 ? "..." : "")}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#1e2433]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isStreaming}
            placeholder="Pregunta sobre tus datos..."
            className="flex-1 px-4 py-2.5 bg-[#1a1f2e] border border-[#2a3347] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isStreaming}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition disabled:opacity-30"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
