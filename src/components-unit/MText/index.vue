<template>
    <div
        class="text-wrap"
        :style="{
			width:compState.curStyle.width,
			height:compState.curStyle.height,
		}"
    >{{props.propValue}}</div>
	
	<!-- 必须直接传入props.propValue才能确保数据响应 -->
</template>

<script setup>
import { reactive,onMounted} from "vue";
const props = defineProps(["propValue", "propStyle"]);
const compState = reactive({
    curValue: props.propValue,
    curStyle: props.propStyle,
});

</script>

<style>
.text-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
}
</style>