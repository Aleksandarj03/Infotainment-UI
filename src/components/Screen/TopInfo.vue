<script>
import {usePresetStore} from "@/store/presetStore";
import {onMounted, ref} from "vue";
import dayjs from "dayjs";

export default {
  setup() {
    const store = usePresetStore();
    const time = ref("");
    const temperature = ref("");
    const date = ref("");

    const updateTime = () => {
      const now = new Date();
      time.value = now.toLocaleTimeString(["mk-MK"], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      date.value = dayjs(now).format("dddd, D MMMM YYYY");
    };

    const fetchTemperature = async () => {
      try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=d6301f24e4674d30896180012252002&q=Skopje`
        );
        const data = await response.json();
        temperature.value = data.current.temp_c;
      } catch (error) {
        console.error("Error fetching temperature:", error);
      }
    };

    onMounted(() => {
      updateTime();
      setInterval(updateTime, 1000);
      fetchTemperature();
      setInterval(fetchTemperature, 1000 * 10 * 60);
    });

    return {
      store,
      time,
      temperature,
      date
    };
  }
};
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="time">
        <span class="clock">{{ time }}</span>
        <span class="date"> {{ date }}</span>
      </div>
      <div class="temperature">{{ temperature }}°C</div>
      <div class="icons">
        <img v-if="store.toggledIcons.includes('Wifi')" src="/icons/WiFi.png" alt="wifi"/>
        <img v-if="store.toggledIcons.includes('Bluetooth')" src="/icons/Bluetooth.png" alt="bluetooth"/>
        <img v-if="store.toggledIcons.includes('Location')" src="/icons/Location.png" alt="location"/>
        <img v-if="store.toggledIcons.includes('Mobile Data')" src="/icons/MobileData.png" alt="data"/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.clock {
  font-size: 1.2rem;
}

.date {
  font-size: 1rem;
  color: #aaa;
  margin-left: 24px;
}

.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #222;
  color: white;
}

.time {
  text-align: center;
  font-size: 1.2rem;
  width: 33%;
  display: flex;
  justify-content: left;
}

.temperature {
  font-size: 1.2rem;
  width: 33%;
  text-align: center;
}

.container {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.container img {
  padding: 0 5px;
  height: 24px;
}

.icons {
  width: 33%;
  padding-right: 1%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
}
</style>
