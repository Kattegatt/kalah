<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
      <RouterLink to="/lobby">Lobby</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<style scoped>
header {
  @apply bg-gray-800 text-white py-4;
}

nav {
  @apply flex justify-center space-x-4;
}

nav a {
  @apply text-white no-underline hover:underline;
}

main {
  @apply p-4;
}
</style>
