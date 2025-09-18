<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Task } from "~/types/TaskTypes";

// API service to interact with the backend
const taskService = useTaskService();

// State variables
const loading = ref(false);
const error = ref("");

// Fetch tasks from the API
const { tasks } = defineProps({
  tasks: Array as PropType<Task[]>,
  loading: Boolean,
  error: String,
});

// Change task status through the API
const changeStatus = async (taskId: string, newStatus: any) => {
  try {
    const { task, error: updateError } = await taskService.updateTaskStatus(
      taskId,
      newStatus
    );
    if (updateError) throw updateError;

    // Update the task status in the local state
    const taskIndex = tasks!.findIndex((t: any) => t.id === taskId);
    if (taskIndex > -1) tasks![taskIndex].status = task.status;
  } catch (err) {
    error.value = "Failed to update task status.";
  }
};

// Load tasks on component mount
</script>

<template>
  <v-card class="task-list-card">
    <v-card-title>
      <h2 class="text-h5">Task List</h2>
    </v-card-title>
    <v-divider />
    <v-card-text v-if="loading" class="text-center py-6">
      <v-progress-circular indeterminate color="primary" />
      <p class="mt-3">Loading tasks...</p>
    </v-card-text>
    <v-card-text v-if="error" class="text-center text-danger py-6">
      <v-icon color="error" class="mb-2">mdi-alert-circle</v-icon>
      {{ error }}
    </v-card-text>
    <v-list v-if="tasks?.length" class="py-4">
      <v-list-item
        v-for="task in tasks"
        :key="task.id"
        class="task-item"
        density="compact"
        two-line
      >
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{
            task.title
          }}</v-list-item-title>
          <v-list-item-subtitle class="text-body-2 text-gray-600">{{
            task.desc || "No description"
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="mt-4">
          <v-select
            max-width="300px"
            v-model="task.status"
            :items="['Todo', 'Doing', 'ToReview', 'Done', 'Canceled']"
            label="Change Status"
            density="compact"
            variant="outlined"
            @change="changeStatus(task.id, task.status)"
          />
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-text v-else class="text-center py-6">
      <v-icon color="info" class="mb-2">mdi-information-outline</v-icon>
      No tasks available.
    </v-card-text>
  </v-card>
</template>

<style scoped>
.task-list-card {
  max-width: 600px;
  margin: auto;
}

.task-item {
  border-bottom: 1px solid var(--v-border-base);
  margin-bottom: 4px;
  padding-bottom: 8px;
}

.text-gray-600 {
  color: #6b7280;
}

.text-danger {
  color: #ef4444;
}
</style>
