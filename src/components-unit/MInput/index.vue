<template>
    <input
        class="input-wrap"
        type="text"
        :placeholder="compState.propValue"
        :style="{
			width:compState.propStyle.width,
			height:compState.propStyle.height,
			zIndex:compState.propStyle.zIndex,
			backgroundColor:compState.propStyle.backgroundColor,
			opacity: compState.propStyle.opacity,
			borderRadius: compState.propStyle.borderRadius,
			fontSize: compState.propStyle.fontSize,
		}"
    />
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
.input-wrap {
    width: 80px;
    height: 40px;
    padding-left: 2px;
	border:0;
	outline:none;
	background-color: transparent;
}
</style>