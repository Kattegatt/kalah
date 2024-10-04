<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="text-2xl mb-4 text-center">Private Lobby</h1>

    <div v-if="createGame" class="justify-center">
      <h2 class="text-xl mb-4 text-center" v-show="inviteLink">Send this link to your friend</h2>
      <n-spin size="large" v-show="!inviteLink" />
      <GeneratedLink
        :grains="grainsValue"
        :firstPlayer="firstPlayer"
        @link="handleLink"
        @back="emit('back')"
      />
    </div>
  </div>
  <n-card v-if="!createGame">
    <n-form @submit="createGame = true" class="flex flex-col items-center justify-center gap-2 p-4">
      <h1 class="text-2xl mb-3">Choose Your Move</h1>
      <n-radio-group v-model:value="whichMove" class="flex flex-row gap-4">
        <n-radio value="1" label="First Move" />
        <n-radio value="2" label="Second Move" />
      </n-radio-group>

      <label for="grains">Number of grains on each pot: {{ grainsValue }}</label>
      <n-space vertical class="w-1/2">
        <n-slider
          id="grains"
          v-model:value="grainsValue"
          :min="2"
          :max="5"
          size="big"
          @update:value="grainsValue = $event"
      /></n-space>

      <n-button type="primary" attr-type="submit">Start</n-button>
    </n-form>
  </n-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NSpin } from 'naive-ui'
import { NCard, NForm, NButton, NRadio, NRadioGroup, NSlider, NSpace } from 'naive-ui'
import GeneratedLink from '../components/GeneratedLink.vue'

const createGame = ref(false)

const grainsValue = ref(3)
const whichMove = ref(1)

const emit = defineEmits(['back'])

let inviteLink = ref('')
const handleLink = (link) => {
  inviteLink.value = link
}

const firstPlayer = computed(() => {
  return parseInt(whichMove.value) === 1
})
</script>

<style scoped></style>
