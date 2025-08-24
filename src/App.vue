<script setup>
import { computed, provide, ref } from 'vue';

import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';

import { useRandomWords } from '@/composables/get-randow-words';
import { INITIAL_COUNTER_VALUE, PROVIDE_COUNTER_VALUE } from '@/constants';

let isGameStarted = ref(false);

let counter = ref(INITIAL_COUNTER_VALUE);

// Передаем значение счетчика в дочерний компонент Score
provide(PROVIDE_COUNTER_VALUE, counter);

let state = ref('closed'); // opened / closed
let status = ref(''); // success / fail / pending

let selectedCardIdx = ref();

// Fetching data from the API and storing it in rawData
let rawData = ref();

let cardData = computed(() => {
  if (!rawData.value) {
    return [];
  }

  return rawData.value.map((item, index) => {
    let isCardActive = selectedCardIdx.value === index + 1;

    return {
      word: isCardActive ? item.translations : item.source,
      index: index + 1,
      state: isCardActive ? state.value : 'closed',
      status: isCardActive ? status.value : '',
    }
  });
});

const handlePlayGame = async (condition) => {
  isGameStarted.value = true;
  rawData.value = await useRandomWords();

  if (condition === false) {
    counter.value = INITIAL_COUNTER_VALUE;
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

  //При успешном ответе начисляем 10 баллов, при ошибке снимаем 4
  switch (payload.status) {
    case 'success':
      counter.value = counter.value + 10;
      break;
    case 'fail':
      counter.value = counter.value - 4;
      break;
    default:
      break;
  }
};
</script>

<template>
  <Header />

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
