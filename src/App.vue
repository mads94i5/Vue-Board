<template>
  <HeaderItem />
</template>

<script lang="ts">
import HeaderItem from './components/Header/HeaderItem.vue'

export default {
  name: 'App',
  components: {
    HeaderItem,
  }
}
</script>

<style>
#app {
  font-family: 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsla(var(--safeDarkAccent-hsl), 1);
}

body {
  background-color: hsla(var(--safeLightAccent-hsl), 1);
}

html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; 
}
</style>
