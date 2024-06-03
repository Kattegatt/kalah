<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
      <!-- Add more links if needed -->
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

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
