<template>
  <div
    :class="[calcStyle, { disabled: cellZero || !clickable, redBorder: landSignal }]"
    class="rounded-xl flex items-center justify-center"
    @click="emitClick"
  >
    {{ cellValue }}
  </div>
</template>

<script>
import { defineComponent, toRefs, computed, watch, ref } from 'vue'

export default defineComponent({
  props: {
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
    }
  },
  setup(props, { emit }) {
    const { cell, size, type, userSide } = toRefs(props)
    let landSignal = ref(false)
    const calcStyle = computed(() => `${size.value} ${type.value}`)
    const cellValue = computed(() => Object.values(cell.value)[0])
    const cellZero = computed(() => cellValue.value === 0)

    let clickable = computed(() => {
      return userSide.value === type.value
    })

    watch(cellValue, () => {
      landSignal.value = true
      setTimeout(() => {
        landSignal.value = false
      }, 500)
    })
    const emitClick = () => {
      emit('move', cell.value)
    }

    return {
      landSignal,
      calcStyle,
      cellValue,
      cellZero,
      emitClick,
      clickable
    }
  }
})
</script>

<style scoped>
.small {
  @apply w-16 h-16;
}

.small:hover {
  border: 2px solid white;
}

.big {
  @apply w-16 h-36;
}

.x {
  @apply bg-blue-300;
}

.y {
  @apply bg-green-300;
}
.redBorder {
  border: 2px solid red;
}
.disabled {
  pointer-events: none;
  border: none;
}
</style>
