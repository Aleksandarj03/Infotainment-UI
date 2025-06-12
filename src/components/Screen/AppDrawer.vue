<script>
export default {
  data() {
    return {
      apps: [
        { name: "Android Auto", src: "/icons/android-auto-logo.png", alt: "Android auto" },
        { name: "Carplay", src: "/icons/Apple_CarPlay_Logo.png", alt: "Carplay" },
        { name: "Facebook", src: "/icons/facebook-logo.png", alt: "Facebook" },
        { name: "Maps", src: "/icons/google-maps-logo2.png", alt: "Maps" },
        { name: "Instagram", src: "/icons/Instagram-logo.png", alt: "Instagram" },
        { name: "Netflix", src: "/icons/netflix-logo.png", alt: "Netflix" },
        { name: "Spotify", src: "/icons/spotify-logo.png", alt: "Spotify" },
        { name: "YouTube", src: "/icons/youtube-logo.png", alt: "YouTube" },
      ],
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="icons">
      <div class="icon" v-for="(app, index) in apps" :key="index">
        <img :src="app.src" :alt="app.alt" />
        <p>{{ app.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  height: 60%;
}
.icons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px 50px;
}
.icon {
  width: calc(25% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.icon img:hover {
  opacity: 0.7;
}
.icon p {
  font-size: 1.3rem;
  color: white;
}
.icon img {
  width: 50%;
}
</style>
