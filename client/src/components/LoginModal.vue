<template>
  <div class="fixed inset-0 flex items-center justify-center yorha-background z-10 background">
    <form @submit.prevent="login">
      <fieldset class="p-5">
        <legend><h1>Login</h1></legend>
        <input v-model="email" type="email" placeholder="Email" required class="input" />
        <input v-model="password" type="password" placeholder="Password" required class="input" />
        <button type="submit" class="btn" @click="login">Login</button>
        <button type="button" @click="close" class="btn ml-2">Cancel</button>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close'])

const missClickEventListener = (element) => {
  element.addEventListener('click', (event) => {
    if (event.target === element) {
      element.removeEventListener('click', null)
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
  @apply w-full mb-3;
}
.btn {
  @apply py-2 px-4;
}
</style>
