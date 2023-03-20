<template>
    <div class="designedit-wrap">
        <div class="designedit-content" :style="containerStyle">
			<div  v-for="item in unitsData" :key="item.key">
				<edit-block :block="item"></edit-block>
			</div>
		</div>
    </div>
</template>

<script setup>
// import { storeToRefs } from "pinia";
import useEditing from "@/stores/editing";
import EditBlock from './EditBlock.vue';

// pinia editingStore
const editingStore = useEditing();
const pageData = editingStore.pageData.container;
const unitsData = editingStore.pageData.blocks;

// container style
const containerStyle = {
    width: pageData.width + "px",
    height: pageData.height + "px",
};

</script>

<style lang="scss" scoped>
.designedit-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.designedit-content {
    width: 200px;
    height: 200px;
    background-color: antiquewhite;
	position: relative;
}
</style>