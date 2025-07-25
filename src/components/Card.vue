<script setup>
import IconSuccess from './icons/IconSuccess.vue';
import IconFail from './icons/IconFail.vue';
const { cardWord = 'example', cardNumber = 1 } = defineProps({
    cardWord: String,
    cardNumber: Number
});

const emits = defineEmits({
    flipCard: (payload) => {
        console.log('Card flipped validation:', payload);
        return payload;
    },
    changeStatus: (payload) => {
        console.log('Status changed validation:', payload);
        return payload;
    }
});

const cardFlip = (state) => {
    emits('flipCard', { state, cardWord, cardNumber });
};

const changeStatus = (status) => {
    emits('changeStatus', { status, cardWord, cardNumber });
};
</script>

<template>
    <div class="card">
        <div class="card__state">
            <span class="card__number">{{ cardNumber }}</span>
            <IconSuccess :icon-width="36" :icon-height="36" />
            <IconFail :icon-width="48" :icon-height="48" />
        </div>
        <p class="card__word">{{ cardWord }}</p>
        <div class="card__actions">
            <p class="card__actions-name" @click="cardFlip('open')">Перевернуть</p>

            <p class="card__actions-name" @click="cardFlip('close')">Завершить</p>

            <div class=" card__actions-icons">
                <IconSuccess @click="changeStatus('success')" />
                <IconFail @click="changeStatus('fail')" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    position: relative;

    width: 250px;
    height: 375px;

    display: grid;
    grid-template-rows: 65px 1fr 65px;
    place-items: center;

    border-radius: 16px;
    background-color: var(--color-secondary);
    box-shadow: 0 0 16px var(--color-shadow);
}

.card::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 1px solid var(--color-accent-light);
    transform: scale(0.85);
    content: '';
}

.card__state {
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.card__number {
    position: absolute;
    top: 19px;
    left: 36px;

    font-size: 14px;
    line-height: 18px;
    color: var(--color-primary);
    background-color: var(--color-secondary);
}

.card__word {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    color: var(--color-primary);
}

.card__actions {
    position: relative;
    z-index: 1;

    min-width: 100px;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--color-secondary);
}

.card__actions-name {
    margin: 13px 0 0 0;
    font-size: 12px;
    line-height: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-primary);
    cursor: pointer;
    transition: all 0.3s ease;
}

.card__actions-name:hover {
    color: var(--color-accent);
}

.card__actions-icons {
    position: relative;
    top: 6px;

    width: 100%;
    padding: 0 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>