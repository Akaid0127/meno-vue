<template>
    <input class="input-wrap" type="text" :value="state.propValue" />
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["propValue"]);
const state = reactive({
    propValue: props.propValue,
});
</script>

<style>
.input-wrap {
    width: 80px;
    height: 40px;
}
</style>