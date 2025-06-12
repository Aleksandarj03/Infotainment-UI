<script>
export default {
  name: "ClimateControl",
  data() {
    return {
      leftSeatLevel: 0,
      rightSeatLevel: 0,
      leftTemperature: 22.0,
      rightTemperature: 22.0,
      rightTempAdjust: false,
      leftTempAdjust: false,
      dual: false,
      AC: false,
      auto: false,
      defrostLevel: 0,
      faceLevelLeft: 0,
      faceLevelRight: 0,
      legsLevelLeft: 0,
      legsLevelRight: 0,
      blowingSpeedLeft: 0,
      blowingSpeedRight: 0,
      blowAdjust: false,
      off: false,
      airFlowIcons: {
        defrost: "/icons/air-flow-windshield.png",
        face: "/icons/air-flow-face.png",
        legs: "/icons/air-flow-down.png",
        fan: "/icons/fan-icon2.png",
        seatLeft: "/icons/seat-heating-left.png",
        seatRight: "/icons/seat-heating-right.png",
      },
    };
  },
  methods: {
    toggleLeftSeatHeating() {
      this.leftSeatLevel = (this.leftSeatLevel + 1) % 4;
    },
    toggleRightSeatHeating() {
      this.rightSeatLevel = (this.rightSeatLevel + 1) % 4;
    },
    showTemperatureAdjustRight() {
      this.rightTempAdjust = !this.rightTempAdjust;
    },
    showTemperatureAdjustLeft() {
      this.leftTempAdjust = !this.leftTempAdjust;
    },
    adjustTemperature(side, value) {
      if (side === "left") {
        this.leftTemperature = Math.max(16, Math.min(30, this.leftTemperature + value));
        if (!this.dual) {
          this.rightTemperature = this.leftTemperature;
        }
      } else if (side === "right") {
        this.rightTemperature = Math.max(16, Math.min(30, this.rightTemperature + value));
        if (!this.dual) {
          this.leftTemperature = this.rightTemperature;
        }
      }
    },
    toggleDual() {
      this.dual = !this.dual;
      if (!this.dual) {
        this.rightTemperature = this.leftTemperature;
      }
    },
    toggleAC() {
      this.AC = !this.AC;
    },
    toggleAuto() {
      this.auto = !this.auto;
      if (this.auto) {
        this.defrostLevel = 2;
        this.faceLevelLeft = 3;
        this.faceLevelRight = 3;
        this.legsLevelLeft = 3;
        this.legsLevelRight = 3;
        this.blowingSpeedLeft = 3;
        this.blowingSpeedRight = 3;
      }
    },
    toggleBlowAdjust() {
      this.blowAdjust = !this.blowAdjust;
    },
    toggleOnOff() {
      this.off = !this.off;

      if (this.off) {
        this.rightTempAdjust = false;
        this.leftTempAdjust = false;
        this.blowAdjust = false;
      }
    },
    handleOutsideClick(event) {
      const container = this.$refs.container;
      const tempAdjustLeft = this.$refs.tempAdjustLeft;
      const tempAdjustRight = this.$refs.tempAdjustRight;
      const blowingAdjust = this.$refs.blowingAdjust;

      if (
          (container && container.contains(event.target)) ||
          (tempAdjustLeft && tempAdjustLeft.contains(event.target)) ||
          (tempAdjustRight && tempAdjustRight.contains(event.target)) ||
          (blowingAdjust && blowingAdjust.contains(event.target))
      ) {
        return;
      }


      this.rightTempAdjust = false;
      this.leftTempAdjust = false;
      this.blowAdjust = false;
    },
  },
  mounted() {
    window.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>


<template>
  <div
      class="container"
      :class="{ disabled: off }"
      ref="container"
  >
    <div class="temperature-left" @click="showTemperatureAdjustLeft">
      <p>{{ leftTemperature }}°C |</p>
    </div>

    <div class="fan-speed">
      <img :src="airFlowIcons.fan" alt="Fan" @click="toggleBlowAdjust" />
    </div>

    <div :class="{ auto: true, on: auto }" @click="toggleAuto">
      <p>AUTO</p>
    </div>

    <div class="seat-heating">
      <div class="image" @click="toggleLeftSeatHeating">
        <img :src="airFlowIcons.seatLeft" alt="Left Seat Heating" />
      </div>
      <div class="levels">
        <div v-for="n in 3" :key="n" :class="{ level: true, active: n <= leftSeatLevel }"></div>
      </div>
    </div>

    <div :class="{ off: true, on: off }" @click.stop="toggleOnOff">
      <p>OFF</p>
    </div>

    <div class="seat-heating">
      <div class="levels">
        <div v-for="n in 3" :key="n" :class="{ level: true, active: n <= rightSeatLevel }"></div>
      </div>
      <div class="image" @click="toggleRightSeatHeating">
        <img :src="airFlowIcons.seatRight" alt="Right Seat Heating" />
      </div>
    </div>

    <div :class="{ 'A/C': true, on: AC }" @click="toggleAC">
      <p>A/C</p>
    </div>

    <div :class="{ dual: true, on: dual }" @click="toggleDual">
      <p>DUAL</p>
    </div>

    <div class="temperature-right" @click="showTemperatureAdjustRight" >
      <p>| {{ rightTemperature }}°C</p>
    </div>
  </div>

  <div class="temperature-adjust-right" v-if="rightTempAdjust" ref="tempAdjustRight">
    <div class="minus" @click="adjustTemperature('right', -1)">-</div>
    <p>{{ rightTemperature }}</p>
    <div class="plus" @click="adjustTemperature('right', 1)">+</div>
  </div>

  <div class="temperature-adjust-left" v-if="leftTempAdjust" ref="tempAdjustLeft">
    <div class="minus" @click="adjustTemperature('left', -1)">-</div>
    <p>{{ leftTemperature }}</p>
    <div class="plus" @click="adjustTemperature('left', 1)">+</div>
  </div>

  <div class="blowing-adjust" v-if="blowAdjust" ref="blowingAdjust">
    <div class="defrost">
      <img :src="airFlowIcons.defrost" alt="Defrost" />
      <input type="range" min="0" max="6" v-model="defrostLevel" class="vertical-slider" />
      <span>{{ defrostLevel }}</span>
    </div>

    <div class="face">
      <span>{{ faceLevelLeft }}</span>
      <input type="range" min="0" max="6" v-model="faceLevelLeft" class="horizontal-slider" />
      <img :src="airFlowIcons.face" alt="Face" />
      <input type="range" min="0" max="6" v-model="faceLevelRight" class="horizontal-slider" />
      <span>{{ faceLevelRight }}</span>
    </div>

    <div class="legs">
      <span>{{ legsLevelLeft }}</span>
      <input type="range" min="0" max="6" v-model="legsLevelLeft" class="horizontal-slider" />
      <img :src="airFlowIcons.legs" alt="Legs" />
      <input type="range" min="0" max="6" v-model="legsLevelRight" class="horizontal-slider" />
      <span>{{ legsLevelRight }}</span>
    </div>

    <div class="blowing-strength">
      <span>{{ blowingSpeedLeft }}</span>
      <input type="range" min="0" max="6" v-model="blowingSpeedLeft" class="horizontal-slider" />
      <img :src="airFlowIcons.fan" alt="Fan" />
      <input type="range" min="0" max="6" v-model="blowingSpeedRight" class="horizontal-slider" />
      <span>{{ blowingSpeedRight }}</span>
    </div>
  </div>
</template>


<style scoped>
.temperature-adjust-right {
  width: 15%;
  background: linear-gradient(90deg, rgba(0, 0, 255, 0.7) 20%, rgba(255, 0, 0, 0.7) 80%);
  box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.76);
  height: 50px;
  color: white;
  font-size: 1.5rem;
  position: fixed;
  bottom: 120px;
  right: 5%;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.disabled {
  opacity: 0.9;
  pointer-events: none;
}

.disabled .off {
  pointer-events: auto;
}


.blowing-adjust img {
  background: transparent;
  width: 35px;
  padding: 0 20px;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 20%, rgba(255, 255, 255, 0.7) 80%);
  border-radius: 5px;
  outline: none;
  opacity: 0.9;
  transition: opacity 0.15s ease-in-out;
  margin: 0 10px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
}

.temperature-adjust-left {
  width: 15%;
  background: linear-gradient(90deg, rgba(0, 0, 255, 0.7) 20%, rgba(255, 0, 0, 0.7) 80%);
  box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.76);
  height: 50px;
  color: white;
  font-size: 1.5rem;
  position: fixed;
  bottom: 120px;
  left: 5%;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.container {
  position: fixed;
  width: 90%;
  bottom: 8px;
  left: 3%;
  background-color: rgba(34, 34, 34, 0.9);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px 30px;
  border-radius: 35px;
  font-size: 1.3rem;
  box-shadow: 0 0 14px 3px rgba(0, 0, 0, 0.76);
}

.container img {
  width: 35px;
  cursor: pointer;
}

.container p {
  cursor: pointer;
}

.seat-heating {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.levels {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  gap: 5px;
}

.level {
  width: 20px;
  height: 8px;
  background-color: #555;
  border-radius: 3px;
}

.level.active {
  background-color: #ff4500;
}

.blowing-adjust {
  width: 35%;
  height: 30%;
  position: fixed;
  bottom: 120px;
  left: 32%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgb(34, 34, 34);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 9px 3px rgba(0, 0, 0, 0.76);
  font-size: 1.3rem;
}

.blowing-adjust div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.horizontal-slider {
  width: 100px;
}

.on {
  text-decoration: underline;
  color: orange;
}

</style>
