<script setup lang="ts">
import type { CreateTaskDto } from "~/types/TaskTypes";

const newTask = ref<CreateTaskDto>({
  title: "",
  desc: "",
  priority: 1,
  status: "Todo",
});

const emit = defineEmits(["create-task"]);

const submitTask = () => {
  emit("create-task", newTask.value);
  newTask.value = { title: "", desc: "", priority: 1, status: "Todo" };
};
</script>

<template>
  <v-card
    color="transparent"
    class="glass-card pa-6 mt-6"
    elevation="12"
    max-width="600"
  >
    <v-card-title class="text-h6 font-weight-bold text-light mb-2">
      Create Task
    </v-card-title>

    <v-divider class="mb-6" color="rgba(255,255,255,0.1)" />

    <v-card-text>
      <v-form @submit.prevent="submitTask" class="d-flex flex-column gap-5">
        <v-text-field
          v-model="newTask.title"
          label="Task Title"
          class="glass-input mb-3"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-format-title"
          hide-details="auto"
          required
        />

        <v-textarea
          v-model="newTask.desc"
          label="Task Description"
          class="glass-input"
          variant="outlined"
          density="comfortable"
          auto-grow
          prepend-inner-icon="mdi-text"
        />

        <v-select
          v-model="newTask.priority"
          label="Priority"
          class="glass-input"
          variant="outlined"
          density="comfortable"
          :items="[
            { text: 'Low', value: 0 },
            { text: 'Medium', value: 1 },
            { text: 'High', value: 2 },
          ]"
          item-title="text"
          item-value="value"
          prepend-inner-icon="mdi-flag-outline"
          center-affix
          hide-details="auto"
        />

        <v-btn color="transparent" type="submit" class="glass-btn mt-4" block>
          <v-icon start>mdi-plus</v-icon>
          Create Task
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
