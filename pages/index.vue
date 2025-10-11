<script setup lang="ts">
import type { CreateTaskDto, Task } from "~/types/TaskTypes";
definePageMeta({
  title: "صفحه اصلی",
  description: "صفحه اصلی",
});
const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref("");

const taskService = useTaskService();

const filters = ref({
  priority: 1,
  createdAt: null,
  doneAt: null,
});

async function loadTasks() {
  loading.value = true;
  error.value = "";
  try {
    const { tasks: fetchedTasks, error: fetchError } =
      await taskService.getTasks(filters.value);

    if (fetchError) throw fetchError;
    tasks.value = fetchedTasks;
  } catch (err) {
    error.value = "Failed to load tasks.";
  } finally {
    loading.value = false;
  }
}

const createTask = async (newTask: CreateTaskDto) => {
  try {
    const { task, error: createError } = await taskService.createTask(newTask);
    if (createError) throw createError;
    tasks.value.push(task);
  } catch (err) {
    error.value = "Failed to create task.";
  }
};

const changeStatus = async (id: string, status: any) => {
  try {
    const { task, error: updateError } = await taskService.updateTaskStatus(
      id,
      status
    );
    if (updateError) throw updateError;

    const index = tasks.value.findIndex((t) => t.id === id);
    if (index > -1) tasks.value[index] = task;
  } catch (err) {
    error.value = "Failed to update task status.";
  }
};
const tab = ref(0);
const createModal = ref(false);

onMounted(loadTasks);
</script>

<template>
  <v-container class="py-4 mt-16 pt-16">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <TaskFilters
          :filters="filters"
          @apply-filters="loadTasks"
          :loading="loading"
        />

        <v-tabs
          color="grayDark"
          class="my-5"
          v-model="tab"
          grow
          density="compact"
        >
          <v-tab value="0">To-Do</v-tab>
          <v-tab value="1">Done</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item>
            <TaskList
              class="my-2"
              :tasks="tasks.filter((task:any) => task.status !== 'Done')"
              @change-status="changeStatus"
              :loading="loading"
              :error="error"
            />
          </v-tabs-window-item>

          <v-tabs-window-item>
            <TaskList
              class="my-2"
              :tasks="tasks.filter((task:any) => task.status === 'Done')"
              @change-status="changeStatus"
              :loading="loading"
              :error="error"
            />
          </v-tabs-window-item>
        </v-tabs-window>
        <v-fab
          @click="createModal = true"
          class="ms-4 text-gray900 mb-10 mr-10"
          base-color="primary"
          icon="mdi-plus"
          location="bottom end"
          size="large"
        ></v-fab>
        <v-dialog v-model="createModal">
          <v-card
            variant="flat"
            max-width="100%"
            class="d-flex elevation-0 align-center justify-center w-100 pa-10"
            color="transparent"
          >
            <CreateTaskForm @create-task="createTask" />
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
