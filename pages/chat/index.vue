<script setup lang="ts">
import { ref } from "vue";
import { useChatService } from "~/composables/useChatService";
import { useCookie } from "#app";

const messageText = ref("");
const token = useCookie("Authorization");
const chat = useChatService(token.value || "");
const { messages, sendMessage } = chat;

// Override sendMessage to simplify
const sendMessageWrapper = () => {
  if (!messageText.value.trim()) return;
  sendMessage("global", messageText.value);
  messageText.value = "";
};
</script>

<template>
  <v-container
    class="pa-0 h-90vh mt-16 d-flex align-center justify-center py-12"
  >
    <v-card class="chat-card glass-card d-flex flex-column" elevation="12">
      <!-- Header -->
      <div class="chat-header pa-4 d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-avatar size="40" class="me-3">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" />
          </v-avatar>
          <div>
            <h3 class="text-h6 mb-0 text-light">Cyber Chat</h3>
            <small class="text-cyan-400">Online</small>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Messages -->
      <div class="chat-messages flex-grow-1 pa-4 overflow-y-auto">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="d-flex mb-3"
          :class="msg.from === 'me' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="message pa-3 rounded-xl"
            :class="msg.from === 'me' ? 'message-out' : 'message-in'"
          >
            <div class="text-body-2">
              {{ msg.message }}
            </div>
            <small class="text-caption d-block mt-1 text-right text-dim">
              {{ msg.from === "me" ? "You" : msg.from }}
            </small>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Message input -->
      <div class="chat-input pa-3 d-flex align-center">
        <v-text-field
          v-model="messageText"
          placeholder="Type a message..."
          variant="outlined"
          density="comfortable"
          hide-details
          class="flex-grow-1 glass-input"
          @keyup.enter="sendMessage"
        />
        <v-btn
          icon="mdi-send"
          color="cyan"
          elevation="4"
          class="ms-3"
          @click="sendMessage"
        />
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.chat-container {
  height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-card {
  width: 420px;
  max-width: 95%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(16px);
}

.chat-header {
  background: rgba(255, 255, 255, 0.05);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.chat-messages {
  background: transparent;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 255, 255, 0.2) transparent;
}

.message {
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.message-in {
  background: rgba(255, 255, 255, 0.1);
  color: #e0f2fe;
  border-top-left-radius: 0;
}

.message-out {
  background: #00eaff;
  color: #0f172a;
  border-top-right-radius: 0;
}

.chat-input {
  background: rgba(255, 255, 255, 0.05);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.text-dim {
  opacity: 0.7;
}
</style>
