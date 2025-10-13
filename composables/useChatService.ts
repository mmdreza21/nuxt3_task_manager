import { io, Socket } from "socket.io-client";
import { ref, onUnmounted } from "vue";
import { useNotification } from "./useNotification";

interface ChatMessage {
  from: string;
  message: string;
}

export const useChatService = (token: string) => {
  const socket = ref<Socket | null>(null);
  const messages = ref<ChatMessage[]>([]);
  const isConnected = ref(false);
  const { fireNotification } = useNotification();

  // ✅ Connect to WebSocket server
  const connect = () => {
    if (!token) {
      console.warn("⚠️ No token provided for chat connection");
      return;
    }

    socket.value = io("http://localhost:8080", {
      query: { token: token.replace(/^bearer\s+/i, "") },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.value.on("connect", () => {
      isConnected.value = true;
      console.log("✅ Connected to chat server");
      fireNotification("success", "Connected to chat server");
    });

    socket.value.on("disconnect", () => {
      isConnected.value = false;
      console.warn("❌ Disconnected from chat server");
      fireNotification("error", "Disconnected from chat");
    });

    socket.value.on("connect_error", (err) => {
      console.error("🚨 Chat connection error:", err.message);
      fireNotification("error", "Chat connection failed");
    });

    // 📩 Handle incoming messages
    socket.value.on("message", (data: ChatMessage) => {
      messages.value.push(data);
      fireNotification("info", `New message from ${data.from}`);
    });
  };

  // ✉️ Send message to another user
  const sendMessage = (to: string, message: string) => {
    if (!socket.value || !isConnected.value) {
      fireNotification("error", "Not connected to chat");
      return;
    }

    socket.value.emit("message", { to, message });
    messages.value.push({ from: "me", message });
  };

  // 🧹 Clean up when component unmounts
  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  });

  // 🔌 Initialize connection immediately
  connect();

  return {
    socket,
    isConnected,
    messages,
    sendMessage,
  };
};
