<script setup>
import IconHearth from './icons/IconHearth.vue';

const { counter = 100 } = defineProps({
    counter: Number
})
</script>

<template>
    <div class="score">
        <span class="score_counter">{{ counter }}</span>
        <IconHearth />
    </div>
</template>

<style scoped>
.score {
    width: 110px;
    height: 48px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 36px;
    background-color: var(--color-accent-light);
}

.score_counter {
    font-size: 16px;
    line-height: 24px;
    color: var(--color-accent);
}
</style>