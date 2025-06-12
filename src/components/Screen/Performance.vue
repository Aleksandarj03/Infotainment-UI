<script>
import {computed} from "vue";
import {usePresetStore} from "@/store/presetStore.js";

export default {
  setup() {
    const presetStore = usePresetStore();

    const barStyle = computed(() => {
      const gradients = {
        Comfort: "linear-gradient(to right, #4CAF50, #2196F3)",
        GT: "linear-gradient(to right, #FFFFFF, #FFD700)",
        Sport: "linear-gradient(to right, #8B0000, #FF0000)",
        Track: "linear-gradient(to right, #444, #FFFFFF)",
      };

      return {
        background: gradients[presetStore.selectedPreset] || "linear-gradient(to right, red, yellow)",
      };
    });

    return {presetStore, barStyle};
  },
  data() {
    return {
      rpm: 1000,
      maxRPM: 7000,
      acceleration: 300,
      deceleration: 200,
      isAccelerating: false,
      metrics: [
        {
          name: "RPM",
          unit: " /min ",
          value: 1000,
          min: 0,
          max: 7000,
          ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000]
        },
        {name: "Horsepower", unit: " PS ", value: 0, min: 0, max: 450, ticks: [0, 50, 150, 250, 350, 450]},
        {name: "Torque", unit: " Nm ", value: 0, min: 0, max: 450, ticks: [0, 50, 150, 250, 350, 450]},
        {name: "Boost", unit: " Bar ", value: -0.5, min: -0.5, max: 2, ticks: [-0.5, 0.5, 0, 1, 2]},
        {
          name: "Oil Temp",
          unit: " °C ",
          value: 112,
          min: 60,
          max: 140,
          ticks: [60, 70, 80, 90, 100, 110, 120, 130, 140]
        }
      ]
    };
  },
  methods: {

    updateTelemetry() {
      if (!this.isAccelerating) return;

      this.metrics[0].value = this.rpm;

      let turbo = this.metrics[3];
      let rpmRatio = this.rpm / this.maxRPM;
      if (this.rpm > 1500) {
        turbo.value = Math.min(2, -0.5 + (rpmRatio * 2.5));
      } else {
        turbo.value = -0.5;
      }

      let turboMultiplier = turbo.value > 0 ? 1.5 : 1;

      this.metrics[1].value = Math.round(turboMultiplier * (rpmRatio ** 1.5) * 300);
      this.metrics[2].value = Math.round(turboMultiplier * 300);
    },
    increaseRPM() {
      if (this.rpm < this.maxRPM) {
        this.isAccelerating = true;
        this.rpm += this.acceleration;
        this.updateTelemetry();
      }
    },
    resetMetrics() {
      this.metrics[1].value = 0;
      this.metrics[2].value = 0;
      this.metrics[3].value = -0.5;
      this.isAccelerating = false;

      this.decelerationInterval = setInterval(() => {
        if (this.rpm > 1000) {
          this.rpm -= this.deceleration;
          this.metrics[0].value = this.rpm;
        } else {
          clearInterval(this.decelerationInterval);
        }
      }, 100);
    }
  },


  mounted() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        clearInterval(this.decelerationInterval);
        this.increaseRPM();
      }
    });
    window.addEventListener("keyup", (event) => {
      if (event.key === "ArrowUp") {
        this.resetMetrics();
      }
    });
  }
};
</script>

<template>
  <div class="telemetry">
    <div v-for="(metric, index) in metrics" :key="index" class="bar-container">
      <span class="label">{{ metric.name }}:
        <span>{{ metric.name === "Boost" ? metric.value.toFixed(1) : metric.value }}</span>
        <span>{{ metric.unit }}</span>
      </span>
      <div class="bar-border">
        <div
            class="bar"
            :style="[{ width: ((metric.value - metric.min) / (metric.max - metric.min)) * 100 + '%' },barStyle]">
        </div>
      </div>
      <div class="bar-labels">
        <span v-for="(tick, i) in metric.ticks"
              :key="i"
              class="tick"
              :class="{ 'tick-active': metric.value >= tick }">
          {{ tick }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.telemetry {
  width: 80%;
  margin: 120px auto auto auto;
}

.bar-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 30px;
}

.bar-border {
  width: 100%;
  height: 20px;
  background-color: #222;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.bar {
  height: 20px;
  background: linear-gradient(to right, red, yellow);
  border-radius: 10px;
  transition: width 0.2s ease-in-out;
}

.label {
  left: 10px;
  transform: translateY(-50%);
  color: white;
  font-size: 1.1rem;
}

.bar-labels {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: grey;
  margin-top: 5px;
}

.tick {

  transition: color 0.2s, transform 0.2s;
  font-size: 1.1rem;
}

.tick-active {
  color: white;
  transform: translateY(-1px);
}
</style>
