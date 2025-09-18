<script setup lang="ts">
defineProps({
  filters: Object,
  loading: Boolean,
});

const emit = defineEmits(["apply-filters"]);
</script>

<template>
  <v-card elevation="2" class="mb-4">
    <v-card-title>Filters</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="emit('apply-filters')">
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              label="priority"
              v-model="filters!.priority"
              :items="[
                { text: 'low', value: 0 },
                { text: 'medium', value: 1 },
                { text: 'high', value: 2 },
              ]"
              variant="outlined"
              density="compact"
              item-title="text"
              item-value="value"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filters!.createdAt"
              label="Created At"
              type="date"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filters!.doneAt"
              label="Done At"
              type="date"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
        <v-btn color="primary" type="submit" :loading="loading">
          Apply Filters
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
