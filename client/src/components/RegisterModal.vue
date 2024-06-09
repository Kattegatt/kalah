<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md">
      <h2 class="text-xl mb-4">Register</h2>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="Username" required class="input mb-2" />
        <input v-model="email" type="email" placeholder="Email" required class="input mb-2" />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="input mb-2"
        />
        <input
          v-model="repeatPassword"
          type="password"
          placeholder="Repeat Password"
          required
          class="input mb-4"
        />
        <button type="submit" class="btn">Register</button>
        <button type="button" @click="$emit('close')" class="btn ml-2">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  },
  methods: {
    async register() {
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
          console.log('register ~  data:', data)
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
    // handleError(error) {}
  }
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
