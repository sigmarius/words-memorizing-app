<script setup>
const { iconWidth = 24, iconHeight = 24 } = defineProps({
    iconWidth: Number,
    iconHeight: Number
});
</script>

<template>
    <svg :width="iconWidth" :height="iconHeight" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="icon-success-path" fill-rule="evenodd" clip-rule="evenodd"
            d="M19.8129 24.1071L19.416 24.8105H17.8652L17.3982 24.1902C17.3705 24.1477 14.6252 20.0455 11.0769 17.8006L9.90462 17.0622L11.3852 14.7212L12.5538 15.4597C15.1108 17.0751 17.2338 19.4345 18.4855 21.0092C20.4517 18.0462 25.056 11.8745 32.1175 6.86954C28.8185 2.69354 23.7212 0 18 0C8.07508 0 0 8.07508 0 18C0 27.9249 8.07508 36 18 36C27.9249 36 36 27.9249 36 18C36 14.7932 35.1471 11.7877 33.672 9.17723C24.7495 15.5391 19.8665 24.0129 19.8129 24.1071Z" />
    </svg>
</template>

<style scoped>
svg {
    padding: 2px;
    flex-shrink: 0;
    cursor: pointer;
}

.icon-success-path {
    fill: #09BB00;
    transition: fill 0.3s;
}

svg:hover .icon-success-path {
    fill: green;
}
</style>