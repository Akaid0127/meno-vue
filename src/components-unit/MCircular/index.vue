<template>
    <div
        class="circular-wrap"
        :style="{
			width:compState.propStyle.width,
			height:compState.propStyle.height,
			borderRadius:'50%'
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
.circular-wrap {
    width: 80px;
    height: 40px;
}
</style>