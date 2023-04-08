<template>
    <button
        :style="{
			width:compState.propStyle.width,
			height:compState.propStyle.height,
			zIndex:compState.propStyle.zIndex,
			backgroundColor:compState.propStyle.backgroundColor,
			borderWidth:compState.propStyle.borderWidth,
			borderColor: compState.propStyle.borderColor,
			opacity: compState.propStyle.opacity,
			borderRadius: compState.propStyle.borderRadius,
			color: compState.propStyle.color,
			fontSize: compState.propStyle.fontSize,
		}"
    >{{props.propValue}}</button>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propValue", "propStyle"]);
const compState = reactive({
    propValue: props.propValue,
    propStyle: props.propStyle,
});
</script>

<style>
button {
    width: 80px;
    height: 40px;
	border:0;
	outline:none;
	background-color: transparent;
}
</style>