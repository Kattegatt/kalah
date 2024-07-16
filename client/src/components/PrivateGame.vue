<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="text-2xl mb-4 text-center">Private Lobby</h1>
    <div class="absolute top-1/3">
      <h2 class="text-xl mb-4 text-center" v-show="inviteLink">Send this link to your friend</h2>
      <GeneratedLink @link="handleLink" v-show="inviteLink" />
      <CircleLoader v-show="!inviteLink" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import GeneratedLink from '../components/GeneratedLink.vue'
import CircleLoader from '../components/CircleLoader.vue'

const handleLink = (link) => {
  inviteLink.value = link
}

let inviteLink = ref('')
</script>

<style scoped></style>
