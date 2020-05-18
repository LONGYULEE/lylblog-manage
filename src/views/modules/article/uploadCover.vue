<template>
    <div>
        <el-upload ref="coverRef" :action="upload_url" list-type="picture-card" :before-upload="beforeCoverUpload"
            :data="qiniuData" :class="{disabled:uploadDisabled}" :on-success="handleCoverSuccess"
            :on-progress="handleProgress">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="image_url" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img width="100%" :src="image_url" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { getUpToken, deleteFile } from "@/api/article";
export default {
    data() {
        return {
            dialogVisible: false,
            disabled: false,
            qiniuData: {
                key: "",
                token: ""
            },
            upload_url: "http://upload-z2.qiniup.com",
            // 七牛云返回储存图片的子域名
            upload_qiniu_addr: "http://qa0ekk731.bkt.clouddn.com",
            image_url: ""
        };
    },
    methods: {
        handlePictureCardPreview(file) {
            this.dialogVisible = true;
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
        beforeCoverUpload(file) {
            this.qiniuData.key = file.name;
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
        handleRemove(file) {
            this.$http
                .get("/admin/article/deleteFile?key=" + file.response.key)
                .then(({ data }) => {
                    if (data.data) {
                        this.$myNotify.success("删除成功");
                        this.image_url = "";
                        //删除原来的图片预览图框
                        this.$refs.coverRef.clearFiles();
                    } else {
                        this.$myNotify.error(data.data.message);
                    }
                });
        },
        handleError(res) {
            this.$myNotify.error("上传失败");
        },
        handleProgress() {},
        handleCoverSuccess(res, file) {
            this.image_url = this.upload_qiniu_addr + "/" + res.key;
            console.log(this.image_url);
            // document.getElementsByClassName(
            //     "el-upload--picture-card"
            // )[0].style.display = "none";
        }
    },
    created() {
        this.getQiNiuToken();
    },
    computed: {
        uploadDisabled() {
            return this.image_url != "";
        }
    },
    watch: {
        image_url(n, o) {
            this.$emit("coverurl", n);
        }
    }
};
</script>

<style lang="" scoped>
.disabled >>> .el-upload--picture-card {
    display: none;
}
</style>