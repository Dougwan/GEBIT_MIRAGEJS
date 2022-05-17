<template>
  <div id="app">
    <Tasks />
  </div>
</template>

<script>
import Tasks from "./components/Tasks.vue";

export default {
  name: "App",
  components: {
    Tasks,
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;

  background-color: #f5f9f9;
}
</style>
