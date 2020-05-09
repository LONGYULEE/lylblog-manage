<template>
    <div id="app">
        <MyScrollBar style="width:100%;height:100%">
            <router-view />
        </MyScrollBar>
    </div>
</template>

<script>
import MyScrollBar from "@/views/common/myscrollbar";
export default {
    name: "App",
    components: { MyScrollBar }
};
</script>

<style>
</style>
