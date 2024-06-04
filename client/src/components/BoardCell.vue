<template>
  <div :class="calcStyle" class="rounded-xl flex items-center justify-center">
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
      console.log(this.cellData)
      return Object.values(this.cellData)[0]
    }
  }
}
</script>

<style scoped>
.small {
  @apply w-16 h-16;
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
