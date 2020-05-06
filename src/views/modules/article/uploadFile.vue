<template>
    <div>
        <div class="myForm" ref="info">
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="8"></el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="8">
                <el-form ref="form" :model="uploadFile" label-width="80px">
                    <el-form-item label="文章名称">
                        <el-input v-model="uploadFile.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文章描述">
                        <el-input v-model="uploadFile.description"></el-input>
                    </el-form-item>
                    <el-form-item label="文章作者">
                        <el-input v-model="uploadFile.author"></el-input>
                    </el-form-item>
                    <el-form-item label="文章链接">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                            :on-change="handleChange" :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
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
                                        @click="handleDownload(file)">
                                        <i class="el-icon-download"></i>
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
                        <el-switch style="display: block" v-model="uploadFile.recommend" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="推荐" inactive-text="不推荐">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="是否置顶">
                        <el-switch style="display: block" v-model="uploadFile.top" active-color="#13ce66"
                            inactive-color="#ff4949" active-text="置顶" inactive-text="不置顶">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="createArticle">创建文章</el-button>
                        <el-button @click="tempCreate">暂存文章</el-button>
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
            uploadFile: {
                title: "",
                description: "",
                author: "",
                top: false,
                recommend: false
            }
        };
    },
    methods: {
        createArticle() {},
        tempCreate() {}
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