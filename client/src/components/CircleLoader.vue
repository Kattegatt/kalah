<template>
  <div class="circle-loader" :style="loaderStyle"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '50px'
  },
  color: {
    type: String,
    default: '#454138'
  },
  speed: {
    type: String,
    default: '1s'
  }
})

const loaderStyle = computed(() => ({
  width: props.size,
  height: props.size,
  border: `5px solid ${props.color}`,
  borderTop: `5px solid transparent`
}))
</script>

<style scoped>
.circle-loader {
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
