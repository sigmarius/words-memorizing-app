<script setup>
import { computed, ref } from 'vue';

import Header from './components/Header.vue';
import Button from './components/Button.vue';
import Card from './components/Card.vue';

const API_ENDPOINT = 'http://localhost:8080/api/random-words';

let isGameStarted = ref(false);

let counter = ref(100);

let state = ref('closed'); // opened / closed
let status = ref(''); // success / fail / pending

let selectedCardIdx = ref();

// Fetching data from the API and storing it in rawData
let rawData = ref();

let getApiData = async () => {
  try {
    const response = await fetch(API_ENDPOINT);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    rawData.value = data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

let cardData = computed(() => {
  if (!rawData.value) {
    return [];
  }

  return rawData.value.map((item, index) => {
    let isCardActive = selectedCardIdx.value === index + 1;

    return {
      word: isCardActive ? item.translation : item.word,
      index: index + 1,
      state: isCardActive ? state.value : 'closed',
      status: isCardActive ? status.value : '',
    }
  });
});

const handlePlayGame = (condition) => {
  isGameStarted.value = true;
  getApiData();

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
  switch (state.value) {
    case 'opened':
      status.value = 'pending';
      break;
    case 'closed':
      selectedCardIdx.value = null;
      status.value = '';
      break;
    default:
      status.value = '';
      break;
  }
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
        <Card 
          v-for="(card, index) in cardData" 
          v-bind="card" 
          :key="index" 
          :index="index + 1"
          @flip-card="handleFlipCard" 
          @change-status="handleChangeStatus" 
        />
      </div>

      <Button 
        @click="handlePlayGame(false)">
          Начать заново
      </Button>
    </template>

    <Button v-else 
      @click="handlePlayGame(true)">
      Начать игру
    </Button>
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
