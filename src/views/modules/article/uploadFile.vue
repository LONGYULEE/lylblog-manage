<template>
    <div>
        <div class="myForm" ref="info">
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="8"></el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="8">
                <el-form ref="form" :model="sizeForm" label-width="80px">
                    <el-form-item label="活动名称">
                        <el-input v-model="sizeForm.name"></el-input>
                    </el-form-item>

                </el-form>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="8"></el-col>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sizeForm: {
                name: ""
            }
        };
    }
};
</script>

<style lang="" scoped>
.myForm {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>