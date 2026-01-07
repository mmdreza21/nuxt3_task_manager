<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const unityCanvas = ref<HTMLCanvasElement | null>(null);
let unityInstance: any = null;
let loaderScript: HTMLScriptElement | null = null;

onMounted(() => {
  const canvas = unityCanvas.value;
  if (!canvas) return;

  // mobile fix
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
    document.head.appendChild(meta);

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "fixed";
    document.body.style.textAlign = "left";
  }

  loaderScript = document.createElement("script");
  loaderScript.src = "/TVFiles/Web.loader.js";

  loaderScript.onload = () => {
    // @ts-ignore
    createUnityInstance(canvas, {
      dataUrl: "/TVFiles/Web.data",
      frameworkUrl: "/TVFiles/Web.framework.js",
      codeUrl: "/TVFiles/Web.wasm",
      streamingAssetsUrl: "/TVFiles/StreamingAssets",
      companyName: "DefaultCompany",
      productName: "myTilevania",
      productVersion: "1.0",
    })
      .then((instance: any) => {
        unityInstance = instance;
        console.log("Unity loaded");
      })
      .catch(console.error);
  };

  document.body.appendChild(loaderScript);
});

onUnmounted(async () => {
  // 💀 kill unity
  if (unityInstance) {
    try {
      await unityInstance.Quit();
    } catch (e) {
      console.warn("Unity quit failed:", e);
    }
    unityInstance = null;
  }

  // 🧹 cleanup DOM
  if (loaderScript) {
    loaderScript.remove();
    loaderScript = null;
  }

  if (unityCanvas.value) {
    unityCanvas.value.remove();
  }
});
</script>
<template>
  <div class="unity-wrapper mt-16 pt-5">
    <canvas
      ref="unityCanvas"
      id="unity-canvas"
      width="960"
      height="600"
      tabindex="-1"
      class="unity-canvas"
    ></canvas>
  </div>
</template>

<style scoped>
.unity-wrapper {
  text-align: center;
  padding: 0;
  margin: 0;
  border: 0;
}

.unity-canvas {
  width: 960px;
  height: 600px;
  background: #231f20;
}
</style>
