<template>
  <n-card
    style="width: 600px"
    title="Sign In"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item label="Email" path="email">
        <n-input v-model:value="formValue.email" placeholder="Email" />
      </n-form-item>

      <n-form-item label="Password" path="password">
        <n-input v-model:value="formValue.password" type="password" placeholder="Password" />
      </n-form-item>

      <n-button @click="login" class="btn">Login</n-button>
      <n-button @click="close" class="btn ml-2">Cancel</n-button>
    </n-form>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { baseUrl, endpoints } from '../utils/api/endpoints'

//components
import { NButton, NInput, NFormItem, NCard, NForm } from 'naive-ui'

const emit = defineEmits(['close'])

const formRef = ref(null)
const formValue = ref({
  email: '',
  password: ''
})

const close = () => emit('close')

const login = () => {
  formRef.value?.validate((errors) => {
    if (errors) return
    loginRequest()
  })
}

// naive validation
const rules = {
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
  }
}

async function loginRequest() {
  const url = baseUrl + endpoints.login
  console.log(formValue.value)
  const body = JSON.stringify({
    email: formValue.value.email,
    password: formValue.value.password
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    if (response.ok) {
      const token = await response.json()
      emit('close')
    }
  } catch (error) {
    console.error('Error:', error)
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
