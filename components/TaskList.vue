<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "~/types/TaskTypes";

const taskService = useTaskService();

const loading = ref(false);
const error = ref("");

const { tasks } = defineProps({
  tasks: Array as PropType<Task[]>,
  loading: Boolean,
  error: String,
});

const changeStatus = async (taskId: string, newStatus: any) => {
  try {
    const { task, error: updateError } = await taskService.updateTaskStatus(
      taskId,
      newStatus
    );
    if (updateError) throw updateError;

    const taskIndex = tasks!.findIndex((t: any) => t.id === taskId);
    if (taskIndex > -1) tasks![taskIndex].status = task.status;
  } catch (err) {
    error.value = "Failed to update task status.";
  }
};
</script>

<template>
  <v-card color="transparent" class="glass-card py-6 px-4 mb-6">
    <v-card-title class="text-h6 font-weight-bold text-light mb-4">
      Task List
    </v-card-title>
    <v-divider color="rgba(255,255,255,0.1)" />

    <!-- Loading -->
    <v-card-text v-if="loading" class="text-center py-6">
      <v-progress-circular indeterminate color="primary" />
      <p class="text-light mt-3">Loading tasks...</p>
    </v-card-text>

    <!-- Error -->
    <v-card-text v-if="error" class="text-center text-danger py-6">
      <v-icon color="error" class="mb-2">mdi-alert-circle</v-icon>
      {{ error }}
    </v-card-text>

    <!-- Task List -->
    <v-card color="transparent" v-if="tasks?.length" class="py-4">
      <v-list-item
        v-for="task in tasks"
        :key="task.id"
        class="task-item"
        density="compact"
        two-line
      >
        <v-list-item-content>
          <v-list-item-title class="text-h6 text-light">{{
            task.title
          }}</v-list-item-title>
          <v-list-item-subtitle class="text-dim">{{
            task.desc || "No description"
          }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="mt-4">
          <v-select
            v-model="task.status"
            :items="['Todo', 'Doing', 'ToReview', 'Done', 'Canceled']"
            label="Status"
            class="glass-input"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            @change="changeStatus(task.id, task.status)"
          />
        </v-list-item-action>
      </v-list-item>
    </v-card>

    <!-- Empty -->
    <v-card-text v-else class="text-center py-6">
      <v-icon color="info" class="mb-2">mdi-information-outline</v-icon>
      <p class="text-light">No tasks available.</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.task-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 4px;
  padding-bottom: 8px;
}

/* Optional: lighter text for descriptions */
.text-light {
  color: #fff;
}
.text-dim {
  color: rgba(255, 255, 255, 0.65);
}
.text-danger {
  color: #ef4444;
}
</style>
