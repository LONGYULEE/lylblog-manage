<template>
    <div>
        <!-- <MyScrollBar style="width:100%;height:100%"> -->
        <div class="myForm" ref="info">
            <el-col :span="1"></el-col>
            <el-col :span="22">
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
                        <el-upload class="avatar-uploader" :action="upload_url" :show-file-list="false"
                            :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload" :data="qiniuData"
                            :on-preview="handleCoverPreview" :on-remove="handleRemove">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

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
            <el-col :span="1"></el-col>
        </div>
        <div class="btnDiv">
            <el-button type="info" plain>取消</el-button>
            <el-button type="primary">确认</el-button>
        </div>
        <!-- </MyScrollBar> -->
    </div>
</template>

<script>
import { getUpToken, deleteFile } from "@/api/article";
import MyScrollBar from "../../common/myscrollbar";
export default {
    props: { context: "" },
    components: { MyScrollBar },
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
                context: ""
            },
            categoryOptions: [],
            tagOptions: [],
            upload_url: "http://upload-z2.qiniup.com",
            // 七牛云返回储存图片的子域名
            upload_qiniu_addr: "http://qa0ekk731.bkt.clouddn.com",
            qiniuData: {
                key: "",
                token: ""
            },
            imageUrl: "",
            disabled: false,
            dialogVisible: false
        };
    },
    methods: {
        beforeCoverUpload(file) {
            this.qiniuData.key = file.name;
            console.log(this.qiniuData.token);
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error("图片只能是 JPG/PNG 格式!");
                return false;
            }
            if (!isLt2M) {
                this.$message.error("图片大小不能超过 2MB!");
                return false;
            }
        },
        handleCoverSuccess(res, file) {
            this.imageUrl = this.upload_qiniu_addr + "/" + res.key;
            console.log(this.imageUrl);
        },
        handleError(res) {
            this.$myNotify.error("上传失败");
        },
        getQiNiuToken() {
            getUpToken().then(({ data }) => {
                if (data.code === 2000) {
                    this.qiniuData.token = data.data;
                } else {
                    this.$myNotify.error(data.data.message);
                }
            });
        },
        handleRemove(file) {
            this.$http
                .get("/admin/sys/article/deleteFile?key=" + file.response.key)
                .then(({ data }) => {
                    if (data.data) {
                        this.$myNotify.success("删除成功");
                    } else {
                        this.$myNotify.error(data.data.message);
                    }
                });
        },
        handleCoverPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    created() {
        this.getQiNiuToken();
    }
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