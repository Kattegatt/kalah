<template>
  <n-button
    tertiary
    round
    :disabled="cellZero || !clickable"
    :class="[calcStyle, { disabled: cellZero || !clickable, landIndicator: landSignal }]"
    @click="emitClick"
  >
    <span class="cell-value">{{ cellValue }}</span>

    <div
      v-for="(dot, index) in dots"
      :key="index"
      class="dot"
      :style="{ top: dot.top, left: dot.left, backgroundColor: dot.color }"
    ></div>
  </n-button>
</template>

<script setup>
import { ref, computed, toRefs, watch, defineEmits } from 'vue'
import { NButton } from 'naive-ui'
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

// Generate random positions for dots
const generateDots = (count) => {
  const dots = []
  for (let i = 0; i < count; i++) {
    const red = Math.floor(139 + Math.random() * (205 - 139)) // Random value between 139 and 205
    const green = Math.floor(69 + Math.random() * (133 - 69)) // Random value between 69 and 133
    const blue = Math.floor(19 + Math.random() * (69 - 19)) // Random value between 19 and 69
    dots.push({
      top: `${20 + Math.random() * 60}%`, // Range from 20% to 80%
      left: `${20 + Math.random() * 60}%`, // Range from 20% to 80%
      color: `rgb(${red}, ${green}, ${blue})` // Random brown color
    })
  }
  return dots
}

// Computed property to generate dots based on cellValue
const dots = computed(() => generateDots(cellValue.value))
</script>

<style scoped>
.small {
  position: relative;
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.big {
  position: relative;
  width: 100px; /* Adjust size as needed */
  height: 216px; /* Adjust size as needed */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell-value {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 16px;
  color: black;
  background-color: white;
  padding: 8px;
  border-radius: 50%;
}

.dot {
  position: absolute;
  width: 5px;
  height: 15px;
  border-radius: 50%;
}
.disabled {
  cursor: default;
  opacity: 0.5;
}
.landIndicator {
  background-color: #78ea7c;
}
</style>
