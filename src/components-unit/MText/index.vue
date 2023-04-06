<template>
    <div
        class="text-wrap"
        :style="{
			width:compState.propStyle.width,
			height:compState.propStyle.height,
		}"
    >{{compState.propValue}}</div>
</template>

<script setup>
import { reactive,onMounted} from "vue";
const props = defineProps(["propValue", "propStyle"]);
const compState = reactive({
    propValue: props.propValue,
    propStyle: props.propStyle,
});
onMounted(() => {
	// console.log(compState.propValue)
})
</script>

<style>
.text-wrap {
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
}
</style>