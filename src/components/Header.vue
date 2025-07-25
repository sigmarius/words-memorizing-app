<script setup>
import Score from './Score.vue';
</script>

<template>
    <header class="header">
        <h1>Запомни слово</h1>
        <Score :counter="200" />
    </header>
</template>

<style scoped>
.header {
    min-height: 120px;
    margin: 0 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header h1 {
    margin: 0;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: 1px;
    color: var(--color-header);
    text-transform: uppercase;
}
</style>