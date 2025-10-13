<script setup lang="ts">
const link = ref("/");
const { menuItems }: any = useUtilities();
</script>

<template>
  <!-- Items with submenus -->
  <v-menu
    open-on-hover
    v-for="item in menuItems.filter((e: any) => e.child)"
    :key="item.title"
    location="bottom right"
    offset="12"
  >
    <template #activator="{ props }">
      <v-btn v-bind="props" class="glass-nav-btn" variant="text">
        {{ item.title }}
        <v-icon size="18" class="ml-1">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card class="glass-dropdown" width="180px">
      <v-list bg-color="transparent" density="compact">
        <v-list-item
          v-for="child in item.child"
          :key="child.title"
          :to="child.to"
          class="glass-menu-item"
        >
          <span>{{ child.title }}</span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>

  <!-- Direct navigation items -->
  <v-list
    class="d-flex align-center bg-transparent"
    density="comfortable"
    style="height: 60px"
  >
    <v-list-item
      v-for="(item, i) in menuItems.filter((e: any) => !e.child)"
      :key="i"
      :to="item.to"
      link
      class="glass-nav-btn no-ripple"
      @click="link = item.to"
    >
      <div class="d-flex align-center">
        <v-card
          v-if="$route.path === item.to"
          class="active-dot"
          width="6"
          height="6"
        />
        <span
          :class="
            $route.path === item.to ? 'text-primary-accent' : 'text-white'
          "
        >
          {{ item.title }}
        </span>
      </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.glass-nav {
  background: radial-gradient(circle at top left, #0f2027, #203a43, #2c5364);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
  transition: all 0.3s ease;
  padding: 6px 12px;
}

.glass-nav-btn {
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 15px;
  font-weight: 500;
  text-transform: none !important;
  transition: all 0.3s ease;
  padding: 6px 12px;
}

.glass-nav-btn:hover {
  color: #00ffff !important;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.6);
  transform: translateY(-1px);
}

.active-dot {
  background: #00ffff;
  border-radius: 50%;
  margin-right: 6px;
}

.glass-dropdown {
  background: rgba(15, 32, 39, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.glass-menu-item {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.glass-menu-item:hover {
  background: rgba(0, 255, 255, 0.08);
  color: #00ffff !important;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.4);
}
</style>
