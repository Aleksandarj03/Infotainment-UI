<script setup>
import {usePresetStore} from '@/store/presetStore';

const store = usePresetStore();

const Options = [
  {Name: "WiFi", image: "/icons/WiFi.png"},
  {Name: "Bluetooth", image: "/icons/Bluetooth.png"},
  {Name: "Location", image: "/icons/Location.png"},
  {Name: "Mobile Data", image: "/icons/MobileData.png"}
];

function toggleOption(optionName) {
  store.toggleIcon(optionName);
}
</script>

<template>
  <div class="container">
    <div class="options">
      <div
          class="option" v-for="option in Options" :key="option.Name" @click="toggleOption(option.Name)">
        <img :src="option.image" alt="">
        <p>{{ option.Name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.options {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px 50px;
}

.option {
  width: calc(25% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.option p {
  font-size: 1.3rem;
  color: white;

}

.option img {
  width: 50%;
}

.option img:hover {
  opacity: 0.7;
}

</style>