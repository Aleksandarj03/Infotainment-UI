<script setup>
import {computed} from "vue";
import {usePresetStore} from "@/store/presetStore";

import TopInfo from "@/components/Screen/TopInfo.vue";
import AppDrawer from "@/components/Screen/AppDrawer.vue";
import ClimateControl from "@/components/Screen/ClimateControl.vue";
import NavBar from "@/components/Screen/NavBar.vue";

const selectedOptions = []

const presetStore = usePresetStore();

// Dynamically compute background styles
const appStyles = computed(() => {
  const preset = presetStore.selectedPreset || "Comfort";
  return {
    backgroundImage: presetStore.presetStyles[preset]?.backgroundImage || "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
});
</script>

<template>
  <div class="app-container" :style="appStyles">
    <TopInfo :selected-options="selectedOptions"/>
    <NavBar/>
    <router-view/>
    <ClimateControl/>
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  transition: background 0.3s ease-in-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
}
</style>
