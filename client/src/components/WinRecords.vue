<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="text-2xl">Win Records</h1>
    <div class="yorha-border flex flex-col p-2 gap-4">
      <div
        v-for="record in sortedRecords"
        :key="record.date"
        class="flex flex-row items-center justify-between yorha-border mx-1 mb-1 p-2"
      >
        <div class="flex flex-row items-center gap-6">
          <h3 class="text-2xl" :style="{ color: record.result === 'W' ? '#008000' : '#800000' }">
            {{ record.result }}
          </h3>
          <h3 class="text-lg">{{ record.date }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const getRecords = () => {
  return [
    { date: '2022-01-01', result: 'W' },
    { date: '2022-01-02', result: 'W' },
    { date: '2022-01-03', result: 'W' },
    { date: '2022-01-04', result: 'L' },
    { date: '2022-01-05', result: 'W' },
    { date: '2022-01-06', result: 'L' },
    { date: '2022-01-07', result: 'L' }
  ]
}

const sortedRecords = computed(() => {
  return getRecords().sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<style scoped>
.green-text {
  color: #008000;
}

.red-text {
  color: #800000;
}
</style>
