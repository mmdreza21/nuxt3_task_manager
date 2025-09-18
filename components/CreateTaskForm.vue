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
  <v-card elevation="2" class="mt-4">
    <v-card-title>Create Task</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitTask">
        <v-text-field
          density="compact"
          v-model="newTask.title"
          label="Task Title"
          outlined
          required
        />
        <v-textarea
          density="compact"
          v-model="newTask.desc"
          label="Task Description"
          outlined
        />
        <v-select
          density="compact"
          label="priority"
          v-model="newTask.priority"
          :items="[
            { text: 'low', value: 0 },
            { text: 'medium', value: 1 },
            { text: 'high', value: 2 },
          ]"
          item-title="text"
          item-value="value"
        ></v-select>
        <v-btn color="primary" type="submit">Create Task</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
