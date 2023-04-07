<template>
    <div
        class="rectangle-wrap"
        :style="{
			width:compState.propStyle.width,
			height:compState.propStyle.height,
		}"
    ></div>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propStyle"]);
const compState = reactive({
    propStyle: props.propStyle,
});
</script>

<style scoped>
.rectangle-wrap {
    width: 80px;
    height: 40px;
}
</style>