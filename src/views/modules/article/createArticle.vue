<template>
    <div>
        <div class="myForm" ref="info">
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4"></el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                <el-form ref="form" :model="uploadFile" label-width="80px">
                    <el-form-item label="文章名称">
                        <el-input v-model="uploadFile.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文章作者">
                        <el-input v-model="uploadFile.author"></el-input>
                    </el-form-item>
                    <el-form-item label="文章描述">
                        <el-input v-model="uploadFile.description" type="textarea"
                            :autosize="{ minRows: 2, maxRows: 3}"></el-input>
                    </el-form-item>
                    <el-form-item label="文章分类">
                        <el-select v-model="value1" multiple placeholder="请选择" style="width:100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :clearable="true"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章标签">
                        <el-select v-model="value1" multiple placeholder="请选择" style="width:100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :clearable="true"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章封面">
                        <el-upload action="#" list-type="picture-card" :auto-upload="false">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleRemove(file)">
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="是否推荐">
                        <div>
                            <el-radio v-model="uploadFile.recommend" :label="true" border>不推荐</el-radio>
                            <el-radio v-model="uploadFile.recommend" :label="false" border>推荐</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否置顶">
                        <div>
                            <el-radio v-model="uploadFile.top" :label="true" border>不置顶</el-radio>
                            <el-radio v-model="uploadFile.top" :label="false" border>置顶</el-radio>
                        </div>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4"></el-col>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            uploadFile: {},
            options: []
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