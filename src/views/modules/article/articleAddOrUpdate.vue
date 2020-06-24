  <template>
    <div class="article-wrapper">
        <el-form :model="article" label-width="80px" :rules="rules" ref="articleForm">
            <el-form-item label="博文标题" prop="title">
                <el-col :span="12">
                    <el-input placeholder="博文标题" v-model="article.title" clearable></el-input>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="博文分类">
                        <el-cascader style="width: 100%;" clearable change-on-select :options="categoryOptions"
                            v-model="categoryOptionsSelect" :props="categoryListTreeProps">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="博文标签">
                        <el-select style="width: 100%" v-model="tagListSelect" multiple allow-create filterable
                            default-first-option placeholder="请选择文章标签" @change="filterTagList">
                            <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="博文作者">
                <el-row>
                    <el-col :span="4">
                        <el-input placeholder="博文作者" v-model="article.author" clearable></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="是否推荐">
                <el-radio-group v-model="article.recommend">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="展示类型">
                <el-radio-group v-model="article.coverType">
                    <el-radio v-for="type in coverTypeList" :key="type.parKey" :label="type.parKey">{{type.parValue}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="上传封面">
                <el-col :span="12">
                    <el-upload drag :action="upload_url" list-type="picture" :multiple="false"
                        :before-upload="beforeUploadHandle" :file-list="fileList" :on-remove="handleRemove"
                        :on-success="successHandle" :data="qiniuData">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只支持jpg、png、gif格式的图片！</div>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="博文描述">
                <el-col :span="12">
                    <el-input type="textarea" v-model="article.description" placeholder="博文描述" clearable></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="博文内容">
                <mavon-editor style="height:700px" ref=md v-model="article.content" @imgAdd="imgAdd"
                    @change="mavonChangeHandle">
                </mavon-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveArticle()">保存</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { treeDataTranslate } from '@/utils/util'
import { getUpToken, deleteFile } from "@/api/article";
export default {
    components: {
        'mavon-editor': MavonEditor.mavonEditor
    },
    data() {
        return {
            article: {
                recommend: false,
                tagList: [],
                type: 0,
                coverType: 2 // 默认无图片
            },
            coverTypeList: this.getSysParamArr('ARTICLE_COVER_TYPE'),
            url: '',
            fileList: [],
            rules: {
                title: { required: true, message: '请输入博文标题', trigger: 'change' }
            },
            tagList: [],
            tagListSelect: [],
            tagListNew: [],
            categoryOptions: [],
            categoryOptionsSelect: [],
            categoryListTreeProps: {
                label: 'name',
                children: 'children',
                value: 'id'
            },
            qiniuData: {
                key: "",
                token: ""
            },
            upload_url: "http://upload-z2.qiniup.com",
            domain: "http://img.lylblog.xyz",
            //base64
            uploadUrl: "http://up-z2.qiniup.com/putb64/-1",
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            // 获取博文分类
            this.$http({
                url: '/admin/operation/category/list',
                method: 'get',
                params: this.$http.adornParams({ type: 0 })
            }).then(({ data }) => {
                if (data && data.code === 2000) {
                    this.categoryOptions = treeDataTranslate(data.data)
                }
            }).then(() => {
                this.$http({
                    url: '/admin/operation/tag/select',
                    method: 'get',
                    params: this.$http.adornParams({ type: 0 })
                }).then(({ data }) => {
                    if (data && data.code === 2000) {
                        this.tagList = data.data
                    }
                })
            }).then(() => {
                let id = this.$route.params.id
                if (id) {
                    this.$http({
                        url: '/admin/article/info/' + id,
                        method: 'get',
                        params: this.$http.adornParams()
                    }).then(({ data }) => {
                        if (data && data.code === 2000) {
                            this.article = data.data
                            this.file = [{ url: data.data.cover }]
                            // 转换tagList
                            this.tagListSelect = this.article.tagList.map(tag => {
                                return tag.id
                            })
                            // 转换categoryId
                            this.categoryOptionsSelect = this.article.categoryId.split(',').map((data) => { return +data })
                        }
                    })
                }
            }).then(() => {
                this.$http({
                    url: '/admin/article/getUpToken',
                    method: 'get'
                }).then(({ data }) => {
                    if (data.code === 2000) {
                        this.qiniuData.token = data.data;
                    } else {
                        this.$myNotify.error(data.message);
                    }
                });
            })
        },
        // 过滤标签
        filterTagList(selectValueList) {
            let tagList = []
            selectValueList.forEach(value => {
                let isInput = true
                for (let i = 0; i < this.tagList.length; i++) {
                    let tag = this.tagList[i]
                    if (tag.id === value || value.id) {
                        isInput = false
                        tagList.push({ id: tag.id, name: tag.name, type: 0 })
                    }
                }
                if (isInput) {
                    tagList.push({ name: value, type: 0 })
                }
            })
            this.article.tagList = tagList
        },
        // 上传之前
        beforeUploadHandle(file) {
            if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                this.$message.error('只支持jpg、png、gif格式的图片！')
                return false;
            } else {
                this.qiniuData.key = file.name;
            }
        },
        // 上传成功
        successHandle(response) {
            if (response && response.code === 200) {
                this.article.cover = response.resource.url
                this.file = [response.resource]
                this.$message.success('上传成功！')
            }
        },
        // 移除上传文件
        handleRemove(file) {
            //删除七牛云文件
            this.$http
                .get("/admin/article/deleteFile?key=" + file.response.key)
                .then(({ data }) => {
                    if (data.data) {
                        this.$myNotify.success("删除成功");
                        this.fileList = [];
                        this.article.cover = '';
                    } else {
                        this.$myNotify.error(data.data.message);
                    }
                });
        },
        // 保存文章
        saveArticle() {
            this.$refs['articleForm'].validate((valid) => {
                if (valid) {
                    // 转化categoryId
                    this.article.categoryId = this.categoryOptionsSelect.join(',')
                    this.$http({
                        url: `/admin/article/${!this.article.id ? 'save' : 'update'}`,
                        method: !this.article.id ? 'post' : 'put',
                        data: this.$http.adornData(this.article)
                    }).then(({ data }) => {
                        if (data && data.code === 2000) {
                            this.$message.success('保存博文成功')
                            // 关闭当前标签
                            this.$store
                                .dispatch("tagsView/delView", this.$route)
                                .then(e => {
                                    console.log(e);
                                });
                            // 跳转到 articleList
                            this.$router.push("/article-article");
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                } else {
                    return false
                }
            })
        },
        // 文章内容图片上传
        imgAdd(pos, $file) {
            let that = this;
            // 缓存图片信息
            var formdata = new FormData();
            formdata.append("image", $file);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.uploadUrl, true);
            //文本类型
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            //七牛认证信息 注意空格
            xhr.setRequestHeader("Authorization", "UpToken " + this.qiniuData.token);

            xhr.send($file.miniurl.substring($file.miniurl.indexOf(",") + 1));
            //监听状态
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var result = xhr.responseText;
                    // console.log("上传请求结果数据:" + result);
                    result = JSON.parse(result);
                    that.$refs.md.$img2Url(pos, that.domain + "/" + result.key);
                }
            };
        },
        mavonChangeHandle(context, render) {
            this.article.contentFormat = render
        }
    }
}
</script>

<style scoped>
.article-wrapper {
    margin: 10px;
}
</style>
