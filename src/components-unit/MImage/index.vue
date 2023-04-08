<template>
    <img
        class="image-wrap"
        :src="props.propUrl?props.propUrl:require('@/assets/testImage.jpg')"
        :style="{
			width:compState.propStyle.width,
			height:compState.propStyle.height,
		}"
    />
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propStyle", "propUrl"]);
const compState = reactive({
    propStyle: props.propStyle,
});
</script>

<style scoped>
.image-wrap {
    width: 80px;
    height: 40px;
}
</style>