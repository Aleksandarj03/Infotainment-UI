<script>
import {usePresetStore} from '@/store/presetStore';
import {computed, onMounted} from 'vue';

export default {
  setup() {
    const presetStore = usePresetStore();

    const presets = [
      {name: "Comfort"},
      {name: "GT"},
      {name: "Sport"},
      {name: "Track"}
    ];

    const parameters = ["Engine", "Suspension", "Gear shifting", "Braking", "Drivetrain", "ASR", "ESP"];

    const customizationOptions = {
      Engine: ["Comfort", "Sport", "Race"],
      Suspension: ["Comfort", "Sport", "Track"],
      "Gear shifting": ["Smooth", "Mild", "Aggressive"],
      Braking: ["Comfort", "Sport", "Race"],
      Drivetrain: ["RWD", "AWD", "AWD TRACK"],
      ASR: ["On", "ASR Track", "Off"],
      ESP: ["On", "ESP Sport", "Off"]
    };

    const parameterIcons = {
      Engine: "/icons/engine.png",
      Suspension: "/icons/suspension.png",
      "Gear shifting": "/icons/gearbox.png",
      Braking: "/icons/brakes.png",
      Drivetrain: "/icons/drivetrain.png",
    }

    const presetSettings = {
      Comfort: {
        Engine: "Comfort",
        Suspension: "Comfort",
        "Gear shifting": "Smooth",
        Braking: "Comfort",
        Drivetrain: "AWD",
        ASR: "On",
        ESP: "On"
      },
      GT: {
        Engine: "Sport",
        Suspension: "Comfort",
        "Gear shifting": "Mild",
        Braking: "Sport",
        Drivetrain: "RWD",
        ASR: "On",
        ESP: "ESP Sport"
      },
      Sport: {
        Engine: "Race",
        Suspension: "Sport",
        "Gear shifting": "Aggressive",
        Braking: "Sport",
        Drivetrain: "RWD",
        ASR: "Off",
        ESP: "Off"
      },
      Track: {
        Engine: "Race",
        Suspension: "Track",
        "Gear shifting": "Mild",
        Braking: "Race",
        Drivetrain: "AWD TRACK",
        ASR: "ASR Track",
        ESP: "ESP Sport"
      }
    };

    onMounted(() => {
      if (!presetStore.selectedPreset) {
        presetStore.setPreset("Comfort", presetSettings["Comfort"]);
      }
    });

    const dynamicStyles = computed(() => {
      const preset = presetStore.selectedPreset || "Comfort";
      const styles = presetStore.presetStyles[preset] || {};

      return {
        backgroundImage: styles.backgroundImage || "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: styles.textColor || "#fff"
      };
    });

    const selectedStyles = (param, option) => {
      const preset = presetStore.selectedPreset || "Comfort";
      const primaryColor = presetStore.presetStyles[preset]?.primaryColor || "blue";

      return presetStore.selectedOptions[param] === option
          ? {background: primaryColor, color: "#fff"}
          : {};
    };

    const selectPreset = (preset) => {
      presetStore.setPreset(preset, presetSettings[preset]);
    };

    const selectOption = (param, option) => {
      presetStore.selectOption(param, option);
    };

    return {
      presetStore,
      presets,
      parameters,
      customizationOptions,
      selectPreset,
      selectOption,
      dynamicStyles,
      selectedStyles,
      parameterIcons
    };
  }
};
</script>

<template>
  <div class="customization-screen">
    <div class="column presets">
      <div v-for="preset in presets" :key="preset.name"
           :class="['preset-item', { active: presetStore.selectedPreset === preset.name }]"
           @click="selectPreset(preset.name)">
        {{ preset.name }}
      </div>
    </div>

    <div class="column parameters">
      <div v-for="param in parameters" :key="param" class="parameter-item">
        <div class="parameter-nameIcon">
          <span>{{ param }}</span>
          <img v-if="parameterIcons[param]" :src="parameterIcons[param]" alt="Icon" class="param-icon"/>
        </div>
        <div class="options-group">
          <div
              v-for="option in customizationOptions[param]"
              :key="option"
              :class="['option-item', { selected: presetStore.selectedOptions[param] === option }]"
              @click="selectOption(param, option)"
              :style="selectedStyles(param, option)">
            {{ option }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parameter-nameIcon {
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.parameter-nameIcon img {
  padding-right: 5%;
}


.customization-screen {
  display: flex;
  width: 90%;
  height: 350px;
  margin: 130px auto 0 auto;
  color: white;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
}

.column {
  display: flex;
  flex-direction: column;
}

.column.presets {
  flex: 2.5;
  text-align: center;
  font-size: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.column.parameters {
  flex: 7.5;
  height: 100%;
  overflow-y: auto;
}

.param-icon {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}


.preset-item {
  padding: 10px;
  background: rgba(3, 3, 3, 0.2);
  cursor: pointer;
  transition: 0.3s;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.preset-item.active {
  background: white;
  color: black;
}

.parameter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  padding: 15px;
  background: rgba(3, 3, 3, 0.2);
  border: 1px solid rgba(2, 2, 2, 0.2);
}

.options-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  border-left: 1px solid rgba(3, 3, 3, 0.2);
}

.option-item {
  font-size: 2rem;
  padding: 10px;
  background: rgba(34, 34, 34, 0.7);
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  width: 200px;
}

.option-item.selected {
  color: white;
}

.column.parameters::-webkit-scrollbar {
  width: 8px;
}

.column.parameters::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}

.column.parameters::-webkit-scrollbar-track {
  background: transparent;
}
</style>
