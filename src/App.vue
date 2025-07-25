<script setup>
import Header from './components/Header.vue';
import Button from './components/Button.vue';
import Card from './components/Card.vue';

const handleFlipCard = (payload) => {
  console.log('Card flipped:', payload);
};

const handleChangeStatus = (payload) => {
  console.log('Status changed:', payload);
};
</script>

<template>
  <Header />
  <main class="main">
    <Card @flip-card="handleFlipCard" @change-status="handleChangeStatus" />
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
