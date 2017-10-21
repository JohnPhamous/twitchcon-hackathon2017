<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    color: white !important;
  }
  body {
    background: linear-gradient(226deg, #4c377c, #298ddf);
    background-size: 400% 400%;
  }
</style>

