<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md">
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
        <button type="button" @click="$emit('close')" class="btn ml-2">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Login logic
      this.$emit('close')
    }
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
