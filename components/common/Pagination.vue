<script setup lang="ts">
const route = useRoute();
const { length, size } = defineProps({
  length: {
    type: [Number, String],
    required: true,
  },
  size: {
    type: String,
    default: () => "32px",
  },
});

const arrLen: Ref<any[]> = ref([]);

const page = computed(() => {
  return route.query.page || 1;
});

watch(
  () => length,
  (newVal) => {
    for (let index = 1; index <= +newVal; index++) {
      arrLen.value.push(index);
    }
  },
  { immediate: true }
);
</script>

<template>
  <v-card
    dir="ltr"
    flat
    color="transparent"
    class="d-flex align-center justify-center mt-3"
  >
    <v-card
      v-if="+length <= 7"
      class="d-flex"
      flat
      color="transparent"
      max-width="360px"
      height="max-content"
    >
      <v-card
        v-for="i in arrLen"
        :key="i"
        :color="+page === i ? 'gray500' : 'blueGray'"
        :min-width="size"
        :min-height="size"
        :to="{
          params: $route.params,
          query: { ...$route.query, page: i },
        }"
        class="d-flex align-center justify-center mx-1"
      >
        <span> {{ i }} </span>
      </v-card>
    </v-card>

    <v-card
      v-else
      class="d-flex"
      color="transparent"
      flat
      max-width="360px"
      height="max-content"
    >
      <v-card
        v-if="+page > 2"
        :color="'blueGray'"
        :min-width="size"
        :min-height="size"
        :to="{
          params: $route.params,
          query: { ...$route.query, page: 1 },
        }"
        class="d-flex align-center justify-center mx-1"
      >
        <span> 1 </span>
      </v-card>
      <v-card
        v-for="i in arrLen.slice(
          +page > +length - 3 ? 0 : Math.max(0, +page - 2),
          +page > +length - 3 ? 2 : +page + 1
        )"
        :key="i"
        flat
        :color="+page === i ? 'gray500' : 'blueGray'"
        :min-width="size"
        :min-height="size"
        :to="{
          params: $route.params,
          query: { ...$route.query, page: i },
        }"
        class="d-flex align-center justify-center mx-1"
      >
        <span> {{ i }} </span>
      </v-card>

      <v-card
        v-if="+length > 4"
        color="blueGray"
        flat
        min-width="60px"
        min-height="35px"
        class="d-flex align-center justify-center mx-2"
      >
        <span> ... </span>
      </v-card>

      <v-card
        v-for="i of arrLen.slice(
          +page > +length - 3 ? +length - 4 : +length - 2,
          +page > +length - 3 ? +length : +length
        )"
        :key="i"
        flat
        :color="+page === i ? 'gray500' : 'blueGray'"
        :min-width="size"
        :min-height="size"
        :to="{
          params: $route.params,
          query: { ...$route.query, page: i },
        }"
        class="d-flex align-center justify-center mx-1"
      >
        <span> {{ i }} </span>
      </v-card>
    </v-card>
  </v-card>
</template>


