<template>
    <div
        class="icon-wrap"
        v-html="svgArr[props.propIndex].svgValue"
        :style="{
			width:comState.comStyle.width,
			height:comState.comStyle.height,
		}"
    ></div>
</template>

<script setup>
import { reactive } from "vue";
import svgArr from "../iconData";
const props = defineProps(["propStyle", "propIndex"]);
const comState = reactive({
    comStyle: props.propStyle,
});
</script>

<style scoped>
.icon-wrap {
    width: 80px;
    height: 40px;
}
</style>