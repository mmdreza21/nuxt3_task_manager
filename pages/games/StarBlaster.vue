<template>
  <div class="d-flex justify-center my-16 pt-5 align-center">
    <canvas
      ref="unityCanvas"
      id="unity-canvas"
      width="540"
      height="10vh"
      tabindex="-1"
      style="width: 450px; height: 80vh; background: #231f20"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const unityCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
    document.getElementsByTagName("head")[0].appendChild(meta);

    const canvas = unityCanvas.value;
    if (canvas) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.position = "fixed";
    }

    document.body.style.textAlign = "left";
  }

  const script = document.createElement("script");
  script.src = "/Build1/Web.loader.js";

  script.onload = () => {
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
    }).catch((err: any) => {
      alert(err);
    });
  };

  document.body.appendChild(script);
});
</script>
