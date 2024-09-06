<template>
  <n-card
    style="width: 600px"
    title="Sign Up"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item label="Username" path="username">
        <n-input v-model:value="formValue.username" type="text" placeholder="Username" />
      </n-form-item>

      <n-form-item label="Email" path="email">
        <n-input v-model:value="formValue.email" placeholder="Email" />
      </n-form-item>

      <n-form-item label="Password" path="password">
        <n-input v-model:value="formValue.password" type="password" placeholder="Password" />
      </n-form-item>

      <n-form-item label="Repeat Password" path="repeatPassword">
        <n-input
          v-model:value="formValue.repeatPassword"
          type="password"
          placeholder="Repeat Password"
        />
      </n-form-item>

      <n-button @click="register" class="btn">Register</n-button>
      <n-button @click="$emit('close')" class="btn ml-2">Cancel</n-button>
    </n-form>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { baseUrl, endpoints } from '../utils/api/endpoints'

//components
import { NButton, NInput, NFormItem, NCard, NForm } from 'naive-ui'

const emit = defineEmits(['close', 'signedIn'])

const formRef = ref(null)
const formValue = ref({
  username: '',
  email: '',
  password: '',
  repeatPassword: ''
})

// naive validation
const rules = {
  username: {
    required: true,
    message: 'Please input your username',
    trigger: ['input']
  },
  email: [
    {
      required: true,
      message: 'Please input your email',
      trigger: ['input']
    },
    {
      validator: (rule, value) => {
        if (!value) return true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
      },
      message: 'Please input a valid email',
      trigger: ['blur', 'input']
    }
  ],

  password: {
    required: true,
    message: 'Please input your number',
    trigger: ['input']
  },
  repeatPassword: [
    {
      required: true,
      message: 'Please repeat your password',
      trigger: ['input']
    },
    {
      validator: validatePasswordSame,
      message: 'Password is not same as re-entered password!',
      trigger: ['blur', 'password-input']
    }
  ]
}

function validatePasswordSame(rule, value) {
  return value === formValue.value.password
}

const register = async () => {
  console.log(formValue.value.password)
  formRef.value?.validate((errors) => {
    if (errors) {
      console.log('errors', errors)
      return
    } else {
      registerRequest()
    }
  })
}

async function registerRequest() {
  const url = baseUrl + endpoints.createUser

  const body = JSON.stringify({
    username: formValue.username,
    email: formValue.email,
    password: formValue.password
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
      const token = await response.json()
      console.log('register ~ token:', token)
      localStorage.setItem('dk_kalah_access_token', token)
      emit('signedIn')
      emit('close')
    }
  } catch (error) {
    console.log('Error:', error)
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
