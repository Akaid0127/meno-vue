<template>
    <div class="text-wrap">{{state.propValue}}</div>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propValue"]);
const state = reactive({
    propValue: props.propValue,
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