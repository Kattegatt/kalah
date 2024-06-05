<template>
  <div :class="calcStyle" class="rounded-xl flex items-center justify-center" @click="emitClick">
    {{ cellValue }}
  </div>
</template>

<script>
export default {
  props: ['cell', 'size', 'type'],
  data() {
    return {
      cellData: this.cell,
      calcStyle: `${this.size} ${this.type}`
    }
  },
  computed: {
    cellValue() {
      return Object.values(this.cellData)[0]
    }
  },
  methods: {
    emitClick() {
      this.$emit('move', this.cell)
    }
  }
}
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
