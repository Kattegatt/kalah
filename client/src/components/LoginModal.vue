<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center background">
    <div class="bg-white p-8 rounded shadow-md loginModal">
      <h2 class="text-xl mb-4">Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required class="input mb-2" />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="input mb-4"
        />
        <button type="submit" class="btn">Login</button>
        <button type="button" @click="close" class="btn ml-2">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close'])

const missClickEventListener = (element) => {
  document.addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target === element) {
      emit('close')
    }
  })
}
onMounted(() => {
  const background = document.getElementsByClassName('background')[0]
  setTimeout(() => missClickEventListener(background), 100)
})

let email = ref('')
let password = ref('')

const close = () => emit('close')

const login = () => {
  // login logic
  emit('close')
}
</script>

<style scoped>
.input {
  @apply border rounded w-full py-2 px-3;
}
.btn {
  @apply bg-blue-500 text-white py-2 px-4 rounded;
}
</style>
