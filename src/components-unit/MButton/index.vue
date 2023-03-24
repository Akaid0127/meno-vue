<template>
    <button>{{state.propValue}}</button>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propValue"]);
const state = reactive({
    propValue: props.propValue,
});
</script>

<style>
button{
	width: 80px;
	height: 40px;
}
</style>