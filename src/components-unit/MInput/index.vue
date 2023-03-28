<template>
    <input
        class="input-wrap"
        type="text"
        :value="state.propValue"
        :style="{width:state.propStyle.width,height:state.propStyle.height}"
    />
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propValue", "propStyle"]);
const state = reactive({
    propValue: props.propValue,
    propStyle: props.propStyle,
});
</script>

<style>
.input-wrap {
    width: 80px;
    height: 40px;
}
</style>