<template>
  <div class="fixed inset-0 flex items-center justify-center background">
    <form @submit.prevent="login">
      <fieldset class="p-5">
        <legend><h1>Sign Up</h1></legend>
        <input v-model="username" type="text" placeholder="Username" required class="input" />
        <input v-model="email" type="email" placeholder="Email" required class="input" />
        <input v-model="password" type="password" placeholder="Password" required class="input" />
        <input
          v-model="repeatPassword"
          type="password"
          placeholder="Repeat Password"
          required
          class="input"
        />
        <button type="submit" @click="register" class="btn">Register</button>
        <button type="button" @click="$emit('close')" class="btn ml-2">Cancel</button>
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

const username = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const register = async () => {
  // validation of required inputs nedded
  if (this.password !== this.repeatPassword) {
    alert('Passwords do not match')
    return
  }

  const url = 'http://localhost:5050/users'

  const body = JSON.stringify({
    username: this.username,
    email: this.email,
    password: this.password
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    if (response.ok) {
      const data = await response.json()
      const { token, refreshToken } = data
      localStorage.setItem('dk_kalah_access_token', JSON.stringify(token))
      localStorage.setItem('dk_kalah_refresh_token', JSON.stringify(refreshToken))
      this.$emit('close')
    }
  } catch (error) {
    console.log(error.message)
    // this.handleError
  }
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
