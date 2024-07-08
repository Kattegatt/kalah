<template>
  <button
    :class="[calcStyle, { disabled: cellZero || !clickable, landIndicator: landSignal }]"
    class="flex items-center justify-center"
    @click="emitClick"
  >
    {{ cellValue }}
  </button>
</template>

<script setup>
import { ref, computed, watch, toRefs } from 'vue'

const props = defineProps({
  cell: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  userSide: {
    type: String
  },
  turn: {
    type: Boolean
  }
})

const { cell, size, type, userSide, turn } = toRefs(props)
let landSignal = ref(false)

const calcStyle = computed(() => `${size.value} ${type.value}`)
const cellValue = computed(() => Object.values(cell.value)[0])
const cellZero = computed(() => cellValue.value === 0)

let clickable = computed(() => turn.value && userSide.value === type.value)

watch(cellValue, () => {
  landSignal.value = true
  setTimeout(() => {
    landSignal.value = false
  }, 500)
})

const emit = defineEmits(['move'])
const emitClick = () => {
  emit('move', cell.value)
}
</script>

<style scoped>
.small {
  @apply w-16 h-16;
}

.big {
  @apply w-16 h-36;
}

.land-indicator {
  border: 2px solid #f39614;
}

.disabled {
  pointer-events: none;
  border: none;
}
</style>
