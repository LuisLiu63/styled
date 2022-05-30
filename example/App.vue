<script setup>
import RootLayout from './layout/index.vue'
import Colors from './components/colors.vue'
const WH = window.innerHeight
</script>

<template>
<RootLayout>
  <Colors />
</RootLayout>
</template>

<style>
*, body {
  padding: 0;
  margin: 0;
}
</style>
