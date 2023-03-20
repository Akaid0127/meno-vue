<template>
	<input type="text" :value="state.propValue">
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propValue"]);
const state = reactive({
    propValue: props.propValue,
});
</script>

<style>

</style>