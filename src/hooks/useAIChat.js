import { useState, useCallback, useRef } from "react";

const INSIGHTS_API_URL = import.meta.env.VITE_INSIGHTS_API_URL || "/api/v1";

export default function useAIChat() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (text, startDate, endDate) => {
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages([...updatedMessages, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const token = localStorage.getItem("auth_access_token");

    try {
      const response = await fetch(`${INSIGHTS_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          start_date: startDate,
          end_date: endDate,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: aiText };
          return copy;
        });
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: "Error: " + err.message };
          return copy;
        });
      }
    } finally {
      setIsStreaming(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isStreaming, sendMessage, clearChat };
}
