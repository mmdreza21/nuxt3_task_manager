<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const { menuItems }: any = useUtilities();

const close = () => emit("update:modelValue", false);
</script>

<template>
  <v-navigation-drawer
    :model-value="modelValue"
    location="left"
    temporary
    width="280"
    class="glass-sidebar"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- Header -->
    <div class="pa-4 d-flex align-center justify-space-between">
      <span class="text-white font-weight-bold">Menu</span>
      <v-btn icon size="32" variant="text" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-divider />

    <!-- Menu -->
    <v-list density="comfortable" nav>
      <template v-for="item in menuItems" :key="item.title">
        <!-- With children -->
        <v-list-group v-if="item.child">
          <template #activator="{ props }">
            <v-list-item v-bind="props" class="glass-menu-item">
              {{ item.title }}
            </v-list-item>
          </template>

          <v-list-item
            v-for="child in item.child"
            :key="child.title"
            :to="child.to"
            class="glass-menu-sub"
            @click="close"
          >
            {{ child.title }}
          </v-list-item>
        </v-list-group>

        <!-- Single -->
        <v-list-item
          v-else
          :to="item.to"
          class="glass-menu-item"
          @click="close"
        >
          {{ item.title }}
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.glass-sidebar {
  background: rgba(15, 32, 39, 0.92);
  backdrop-filter: blur(26px);
  border-right: 1px solid rgba(0, 255, 255, 0.15);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
}

.glass-menu-item {
  color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  margin: 4px 8px;
  transition: all 0.25s ease;
}

.glass-menu-item:hover {
  background: rgba(0, 255, 255, 0.08);
}

.glass-menu-sub {
  margin-left: 12px;
  opacity: 0.85;
}
</style>
