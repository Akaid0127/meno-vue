<template>
    <component
        class="block"
        :style="blockStyle"
        :is="props.block.component"
        :propValue="props.block.propValue"
    >组件</component>
</template>

<script setup>
// get props
const props = defineProps(["block"]);

// block style
const blockStyle = {
    top: props.block.style.top + "px",
    left: props.block.style.left + "px",
    zIndex: props.block.style.zIndex,
};
</script>

<style lang="scss" scoped>
.block {
    position: absolute;
}
</style>