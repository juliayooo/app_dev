<template>
  <Frame id="main">
    <Login />
  </Frame>
</template>

<script setup>
import { ref } from "nativescript-vue";
import Login from "./Login.vue";
import Home from "./Home.vue";
</script>

<style lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
