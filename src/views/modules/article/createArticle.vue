<template>
    <div>
        <!-- <MyScrollBar style="width:100%;height:100%"> -->
        <div class="myForm" ref="info">
            <el-col :xs="1" :sm="1" :md="1" :lg="2" :xl="2"></el-col>
            <el-col :xs="22" :sm="22" :md="22" :lg="20" :xl="20">
                <el-form :model="uploadFile" label-width="80px" :rules="rules" ref="articleForm" hide-required-asterisk>
                    <el-form-item label="文章名称" prop="title">
                        <el-input v-model="uploadFile.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文章作者">
                        <el-input v-model="uploadFile.author"></el-input>
                    </el-form-item>
                    <el-form-item label="文章描述">
                        <el-input v-model="uploadFile.description" type="textarea"
                            :autosize="{ minRows: 2, maxRows: 3}">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="文章标签">
                        <el-select v-model="uploadFile.tagId" multiple placeholder="请选择" style="width:100%">
                            <el-option v-for="item in tagOptions" :key="item.id" :label="item.name" :clearable="true"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章分类">
                        <el-cascader v-model="categoryOptionsSelect" :clearable="true" :options="categoryOptions"
                            :props="categoryListTreeProps" style="width:100%"></el-cascader>
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
            <el-button type="info" @click="cancel" plain>取消</el-button>
            <el-button type="primary" @click="submit">确认</el-button>
        </div>
        <!-- </MyScrollBar> -->
    </div>
</template>

<script>
import UploadCover from "./uploadCover";
import { treeDataTranslate } from "@/utils/util";
export default {
    props: { context: "", htmlContext: "" },
    components: { UploadCover },
    name: "CreateArticle",
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
                content: "",
                cover: "",
                coverType: 2, // 默认无图片
                type: 0
            },
            categoryOptions: [],
            tagOptions: [],
            categoryOptionsSelect: [],
            categoryListTreeProps: {
                label: "name",
                children: "children",
                value: "id",
                expandTrigger: "hover"
            },
            rules: {
                title: {
                    required: true,
                    message: "请输入博文标题",
                    trigger: "change"
                }
            }
        };
    },
    methods: {
        getcoverurl(data) {
            this.uploadFile.cover = data;
        },
        cancel() {
            this.getDataObj();
        },
        submit() {
            let that = this;
            that.$refs.articleForm.validate(valid => {
                if (valid) {
                    // 转化categoryId
                    that.uploadFile.categoryId = that.categoryOptionsSelect.join(
                        ","
                    );
                    that.$http({
                        url: `/admin/article/${
                            !that.uploadFile.id ? "save" : "update"
                            }`,
                        method: !that.uploadFile.id ? "post" : "put",
                        data: that.$http.adornData(that.uploadFile)
                    }).then(({ data }) => {
                        if (data && data.code === 2000) {
                            that.$message.success("保存博文成功");
                            // 关闭当前标签
                            that.$store
                                .dispatch("tagsView/delView", that.$route)
                                .then(e => {
                                    console.log(e);
                                });
                            // 跳转到 articleList
                            that.$router.push("/article-article");
                        } else {
                            that.$message.error(data.msg);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        getDataObj() {
            this.$confirm("还有内容未保存，是否离开?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$emit("closeDrawer", false);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //获取标签信息
        getTag() {
            this.$http
                .get("/admin/operation/tag/select?type=0")
                .then(({ data }) => {
                    if (data.code === 2000) {
                        this.tagOptions = data.data;
                    } else {
                        this.$myNotify.error(data.message);
                    }
                });
        },
        //获取分类信息
        getCategoy() {
            this.$http
                .get("/admin/operation/category/select?type=0")
                .then(({ data }) => {
                    if (data.code === 2000) {
                        this.categoryOptions = treeDataTranslate(data.data);
                    } else {
                        this.$myNotify.error(data.message);
                    }
                });
        }
    },
    created() {
        this.getTag();
        this.getCategoy();
    },
    mounted() {
        //获取父组件的值，有时候父组件还有一个父组件，需要多层的 $parent
        this.uploadFile.content = this.$parent.$parent.context;
        console.log(this.$parent)
        this.uploadFile.contentFormat = this.$parent.$parent.htmlContext;
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