<template>
    <button :style="{width:state.propStyle.width,height:state.propStyle.height}">{{state.propValue}}</button>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propValue", "propStyle"]);
const state = reactive({
    propValue: props.propValue,
    propStyle: props.propStyle,
});
</script>

<style>
button {
    width: 80px;
    height: 40px;
}
</style>