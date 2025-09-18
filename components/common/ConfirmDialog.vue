<script setup lang="ts">
const model = defineModel<boolean>();

const { title, desc } = defineProps<{
  title: string;
  desc: string;
}>();

const emits = defineEmits(["confirm", "update:modelValue"]);
function confirm() {
  emits("confirm");
  emits("update:modelValue", false);
}
function cancel() {
  emits("update:modelValue", false);
}
</script>

<template>
  <CommonBaseDialog width="360px" :title="title" v-model="model">
    <div class="d-flex flex-column align-start mt-5">
      <p>{{ desc }}</p>
      <div class="d-flex w-100 justify-end mt-5">
        <v-btn @click="confirm" color="green" height="40px" variant="text">
          <span class="text-green"> تایید </span>
        </v-btn>
        <v-btn
          @click="cancel"
          class="text-red"
          color="red"
          height="40px"
          variant="text"
        >
          <span class="text-red"> لغو </span>
        </v-btn>
      </div>
    </div>
  </CommonBaseDialog>
</template>
