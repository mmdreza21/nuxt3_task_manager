<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const unityCanvas = ref<HTMLCanvasElement | null>(null);
const onPage = ref<boolean>(true);

let unityInstance: any = null;

onMounted(() => {
  const loader = document.createElement("script");
  loader.src = "/Build1/Web.loader.js";

  loader.onload = () => {
    // @ts-ignore
    createUnityInstance(unityCanvas.value, {
      arguments: [],
      dataUrl: "/Build1/Web.data",
      frameworkUrl: "/Build1/Web.framework.js",
      codeUrl: "/Build1/Web.wasm",
      streamingAssetsUrl: "/StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Star Blaster",
      productVersion: "1.0",
    })
      .then((instance: any) => {
        unityInstance = instance;
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  document.body.appendChild(loader);
});

onUnmounted(async () => {
  onPage.value = false;

  if (unityInstance) {
    try {
      await unityInstance.Quit();
      unityInstance = null;
    } catch (e) {
      console.warn("Unity cleanup error:", e);
    }
  }

  const canvas = unityCanvas.value;
  if (canvas) {
    canvas.remove();
  }
});
</script>

<template>
  <div class="d-flex justify-center my-16 pt-5 align-center">
    <canvas
      v-if="onPage"
      ref="unityCanvas"
      id="unity-canvas"
      width="540"
      height="10vh"
      tabindex="-1"
      style="width: 450px; height: 80vh; background: #231f20"
    ></canvas>
  </div>
</template>
