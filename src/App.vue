<script setup>
import { computed, ref } from 'vue';

import Header from './components/Header.vue';
import Button from './components/Button.vue';
import Card from './components/Card.vue';

let counter = ref(100);

let cardData = ref({
  number: 1,
  word: 'apple',
  traslation: 'яблоко'
});

const handleFlipCard = (payload) => {
  console.log('Card flipped:', payload);
};

const handleChangeStatus = (payload) => {
  console.log('Status changed:', payload);

  switch (payload.status) {
    case 'success':
      counter.value++;
      break;
    case 'fail':
      counter.value--;
      break;
    default:
      break;
  }
};
</script>

<template>
  <Header :counter />
  <main class="main">
    <Card v-bind="cardData" @flip-card="handleFlipCard" @change-status="handleChangeStatus" />

    <Button>Начать игру</Button>
  </main>
</template>

<style scoped>
.main {
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
