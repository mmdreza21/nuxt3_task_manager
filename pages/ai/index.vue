<script setup lang="ts">
import { ref } from "vue";
import { useAgentService } from "~/composables/useAgentService";

definePageMeta({
  title: "AI Chat",
  description: "Chat with AI agent",
});

const agentService = useAgentService();

const messageText = ref("");
const loading = ref(false);
const error = ref("");

const messages = ref<{ from: "me" | "ai"; text: string }[]>([]);

const model = ref("groq"); // later selectable

const stream = useAgentStream();

const sendMessage = () => {
  if (!messageText.value.trim()) return;

  const userText = messageText.value;
  loading.value = true;

  messages.value.push({ from: "me", text: userText });
  messages.value.push({ from: "ai", text: "" });

  const aiIndex = messages.value.length - 1;

  stream.connect(
    userText,
    (token) => {
      messages.value[aiIndex].text += token;
    },
    () => {
      loading.value = false; // ✅ done
    },
    (err) => {
      loading.value = false;
      error.value = "Stream error";
      console.error(err);
    }
  );

  messageText.value = "";
};

watch(
  messages,
  () => {
    nextTick(() => {
      const el = document.querySelector(".chat-messages");
      el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  },
  { deep: true }
);
</script>

<template>
  <v-container class="h-90vh mt-16 d-flex align-center justify-center py-16">
    <v-card class="chat-card glass-card d-flex flex-column" elevation="12">
      <!-- Header -->
      <div class="chat-header pa-4">
        <h3 class="text-h6 mb-1 text-light">AI Agent</h3>
        <small class="text-cyan-400">Model: {{ model }}</small>
      </div>

      <v-divider />

      <!-- Messages -->
      <div class="chat-messages flex-grow-1 pa-4 overflow-y-auto">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="d-flex mb-3"
          :class="msg.from === 'me' ? 'justify-end' : 'justify-start'"
        >
          <v-card
            class="message pa-3"
            :class="msg.from === 'me' ? 'message-out' : 'message-in'"
          >
            <div class="text-body-2">
              {{ msg.text }}
            </div>
          </v-card>
        </div>

        <div v-if="loading" class="text-dim">AI is thinking…</div>
      </div>

      <v-divider />

      <!-- Input -->
      <div class="chat-input pa-3 d-flex align-center">
        <v-text-field
          v-model="messageText"
          placeholder="Ask anything..."
          variant="outlined"
          hide-details
          class="flex-grow-1 glass-input"
          @keyup.enter="sendMessage"
        />
        <v-btn
          icon="mdi-send"
          color="cyan"
          class="ms-3"
          :loading="loading"
          @click="sendMessage"
        />
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
/* reuse exact same style */
.chat-card {
  width: 80vw;
  max-width: 95%;
  height: 70vh;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: rgba(255, 255, 255, 0.05);
}

.message {
  max-width: 70%;
  white-space: pre-wrap;
}

.message-in {
  background: rgba(255, 255, 255, 0.1);
  color: #e0f2fe;
}

.message-out {
  background: #072022;
  color: #e0f2fe;
  align-self: flex-end;
}

.chat-input {
  background: rgba(255, 255, 255, 0.05);
}

.text-dim {
  opacity: 0.7;
}
</style>
