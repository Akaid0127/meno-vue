<template>
    <div
        class="text-wrap"
        :style="{width:state.propStyle.width,height:state.propStyle.height}"
    >{{state.propValue}}</div>
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
.text-wrap {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
}
</style>