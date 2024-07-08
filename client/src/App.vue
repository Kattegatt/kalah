<template>
  <div class="static top-6 w-full z-20">
    <div class="pattern">
      <div class="container">
        <div class="pattern-inner"></div>
      </div>
    </div>
  </div>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
      <RouterLink to="/lobby">Lobby</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
    <div class="absolute bottom-0 w-full z-50">
      <div class="pattern">
        <div class="container">
          <div class="pattern-inner"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<style scoped>
header {
  @apply text-white;
}

nav {
  @apply bg-gray-800 flex justify-center space-x-4;
}

nav a {
  @apply text-white no-underline hover:underline;
}

main {
  @apply p-4;
}
</style>
