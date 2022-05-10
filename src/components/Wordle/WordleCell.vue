<script setup lang="ts">
defineProps<{
  char: string;
}>();
</script>

<template>
  <div>{{ char }}</div>
</template>

<style scoped>
div {
  color: aqua;
  background: yellow;
  display: inline-flex;
  justify-content: center;
  text-transform: uppercase;
  align-items: center;
  width: 40px;
  height: 40px;
}
</style>
