<script setup>
</script>

<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    min-width: 335px;
    padding: 16px 10px;
    font-size: 24px;
    line-height: 36px;
    font-weight: 400;
    color: var(--color-secondary);
    background-color: var(--color-accent);
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover,
.button:focus {
    background-color: var(--color-accent-hover);
}
</style>