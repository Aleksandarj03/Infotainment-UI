<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-link">Apps</RouterLink>
    <RouterLink to="/driving_dynamics" class="nav-link">Driving dynamics</RouterLink>
    <RouterLink to="/performance" class="nav-link">Performance</RouterLink>
    <RouterLink to="/options" class="nav-link">Options</RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  position: absolute;
  top: 60px;
  left: 10%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(34, 34, 34, 0.9);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 9px 2px rgba(0, 0, 0, 0.76);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease-in-out;
  padding: 5px 10px;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: transform 0.3s ease-in-out;
}

.router-link-active::after,
.router-link-exact-active::after {
  transform: translateX(-50%) scaleX(1);
}


.nav-link:hover {
  opacity: 0.7;
}


</style>