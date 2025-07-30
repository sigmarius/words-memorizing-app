<script setup>
import { computed, ref } from 'vue';

import Header from './components/Header.vue';
import Button from './components/Button.vue';
import Card from './components/Card.vue';

let isGameStarted = ref(false);

let counter = ref(100);

let state = ref('closed'); // opened / closed
let status = ref(''); // success / fail / pending

let selectedCardIdx = ref();

let rawData = ref([
  {
    word: 'apple',
    traslation: 'яблоко'
  },
  {
    word: 'banana',
    traslation: 'банан'
  },
  {
    word: 'orange',
    traslation: 'апельсин'
  },
  {
    word: 'lemon',
    traslation: 'лимон'
  },
  {
    word: 'strawberry',
    traslation: 'клубника'
  },
  {
    word: 'tangerine',
    traslation: 'мандарин'
  },
  {
    word: 'cherry',
    traslation: 'вишня'
  }
]);

let cardData = computed(() => {
  return rawData.value.map((item, index) => {
    let isCardActive = selectedCardIdx.value === index + 1;

    return {
      word: isCardActive ? item.traslation : item.word,
      index: index + 1,
      state: isCardActive ? state.value : 'closed',
      status: isCardActive ? status.value : '',
    }
  });
});

const handlePlayGame = (condition) => {
  isGameStarted.value = condition;

  if (condition === false) {
    counter.value = 100;
    state.value = 'closed';
    status.value = '';
    selectedCardIdx.value = null;
  }
};

const handleFlipCard = (payload) => {
  selectedCardIdx.value = payload.index;

  state.value = payload.state;
  status.value = state.value === 'opened' ? 'pending' : '';
};

const handleChangeStatus = (payload) => {
  status.value = payload.status;

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
    <template v-if="isGameStarted">
      <div class="cards">
        <Card v-for="(card, index) in cardData" v-bind="card" :key="index" :index="index + 1"
          @flip-card="handleFlipCard" @change-status="handleChangeStatus" />
      </div>

      <Button @click="handlePlayGame(false)">Начать заново</Button>
    </template>

    <Button v-else @click="handlePlayGame(true)">Начать игру</Button>
  </main>
</template>

<style scoped>
.main {
  height: 100%;
  display: grid;
  place-items: center;
}

.cards {
  margin-bottom: 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
</style>
