<template>
  <div :class="calcStyle" class="rounded-xl flex items-center justify-center" @click="emitClick">
    {{ cellValue }}
  </div>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue'

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
    }
  },
  setup(props, { emit }) {
    const { cell, size, type } = toRefs(props)
    const calcStyle = computed(() => `${size.value} ${type.value}`)
    const cellValue = computed(() => Object.values(cell.value)[0])

    const emitClick = () => {
      emit('move', cell.value)
    }

    return {
      calcStyle,
      cellValue,
      emitClick
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
</style>
