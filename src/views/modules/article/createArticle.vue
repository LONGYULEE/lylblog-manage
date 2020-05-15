<template>
    <div>
        <!-- <MyScrollBar style="width:100%;height:100%"> -->
        <div class="myForm" ref="info">
            <el-col :xs="1" :sm="1" :md="1" :lg="2" :xl="2"></el-col>
            <el-col :xs="22" :sm="22" :md="22" :lg="20" :xl="20">
                <el-form ref="form" :model="uploadFile" label-width="80px">
                    <el-form-item label="文章名称">
                        <el-input v-model="uploadFile.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文章作者">
                        <el-input v-model="uploadFile.author"></el-input>
                    </el-form-item>
                    <el-form-item label="文章描述">
                        <el-input v-model="context" type="textarea" :autosize="{ minRows: 2, maxRows: 3}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="文章分类">
                        <el-select v-model="uploadFile.categoryId" multiple placeholder="请选择" style="width:100%">
                            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                                :clearable="true" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章标签">
                        <el-select v-model="uploadFile.tagId" multiple placeholder="请选择" style="width:100%">
                            <el-option v-for="item in tagOptions" :key="item.value" :label="item.label"
                                :clearable="true" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章封面">
                        <upload-cover @coverurl="getcoverurl"></upload-cover>
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
            <el-col :xs="1" :sm="1" :md="1" :lg="2" :xl="2"></el-col>
        </div>
        <div class="btnDiv">
            <el-button type="info" plain>取消</el-button>
            <el-button type="primary">确认</el-button>
        </div>
        <!-- </MyScrollBar> -->
    </div>
</template>

<script>
import MyScrollBar from "../../common/myscrollbar";
import UploadCover from "./uploadCover";
export default {
    props: { context: "" },
    components: { MyScrollBar, UploadCover },
    data() {
        return {
            uploadFile: {
                title: "",
                author: "",
                description: "",
                categoryId: [],
                tagId: [],
                recommend: false,
                top: false,
                context: "",
                cover: ""
            },
            categoryOptions: [],
            tagOptions: []
        };
    },
    methods: {
        getcoverurl(data) {
            this.uploadFile.cover = data;
        }
    },
    created() {}
};
</script>

<style lang="" scoped>
.myForm {
    display: flex;
    justify-content: center;
    align-items: center;
}
.btnDiv {
    position: absolute;
    bottom: 0px;
    border-top: 1px solid #e8e8e8;
    text-align: right;
    width: 100%;
    padding: 16px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>