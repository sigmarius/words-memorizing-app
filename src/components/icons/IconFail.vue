<script setup>
const { iconWidth = 24, iconHeight = 24 } = defineProps({
    iconWidth: Number,
    iconHeight: Number
});
</script>

<template>
    <svg :width="iconWidth" :height="iconHeight" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="icon-fail-path" fill-rule="evenodd" clip-rule="evenodd"
            d="M30.922 28.778L28.8 30.9L23.998 26.102L19.198 30.894L17.078 28.772L21.876 23.982L17.078 19.186L19.2 17.064L24 21.862L28.802 17.068L30.922 19.192L26.122 23.982L30.922 28.778ZM24 4.5C13.248 4.5 4.5 13.248 4.5 24C4.5 34.752 13.248 43.5 24 43.5C34.752 43.5 43.5 34.752 43.5 24C43.5 13.248 34.752 4.5 24 4.5Z" />
    </svg>
</template>

<style scoped>
svg {
    flex-shrink: 0;
    cursor: pointer;
}

.icon-fail-path {
    fill: #D00303;
    transition: fill 0.3s;
}

svg:hover .icon-fail-path {
    fill: red;
}
</style>