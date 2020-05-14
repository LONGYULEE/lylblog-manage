<template>
    <div>
        <mavon-editor v-model="context" ref="md" :toolbars="toolbars" @imgAdd="imgAdd" :style="contentStyleObj"
            class="editor" />
        <div class="box">
            <el-button type="primary" class="createBtn" @click="createArticle">创建文章</el-button>
        </div>
        <!-- <el-dialog title="创建文章" :visible.sync="showCreateArticle" :close-on-click-modal="false" class="mydialog">
            <CreateArticle :context="context" style="height:50vh;overflow-y:auto"></CreateArticle>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showCreateArticle = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog> -->

        <el-drawer title="我是标题" :visible.sync="drawer" size="45%" :before-close="handleClose">
            <div slot="title" class="title">创建文章</div>
            <CreateArticle :context="context" style="overflow-y:auto"></CreateArticle>
        </el-drawer>
    </div>
</template>

<script>
import { getUpToken } from "@/api/article";
import CreateArticle from "./createArticle";
export default {
    name: "article-articleAddOrUpdate",
    components: { CreateArticle },
    data() {
        return {
            drawer: false,
            uploadUrl: "http://up-z2.qiniup.com/putb64/-1", //七牛云base64上传地址
            domain: "http://qa0ekk731.bkt.clouddn.com", //七牛云的外链地址 TODO:此处地址通过引入方式方便后期更换
            img_file: {},
            upToken: "",
            contentStyleObj: {
                height: ""
            },
            showCreateArticle: false,
            context: "", //输入的数据
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true // 预览
            }
        };
    },
    methods: {
        handleClose() {},
        getHeight() {
            this.contentStyleObj.height = window.innerHeight - 185 + "px";
        },
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
            xhr.setRequestHeader("Authorization", "UpToken " + this.upToken);

            xhr.send($file.miniurl.substring($file.miniurl.indexOf(",") + 1));
            //监听状态
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var result = xhr.responseText;
                    console.log("上传请求结果数据:" + result);
                    result = JSON.parse(result);
                    that.$refs.md.$img2Url(pos, that.domain + "/" + result.key);
                }
            };
        },
        createArticle() {
            this.showCreateArticle = true;
            this.drawer = true;
        },
        handleSave() {}
    },
    created() {
        window.addEventListener("resize", this.getHeight);
        this.getHeight();
    },
    destroyed() {
        window.removeEventListener("resize", this.getHeight);
    },
    mounted() {
        getUpToken().then(({ data }) => {
            if (data.code === 2000) {
                this.upToken = data.data;
            }
        });
    },
    watch: {
        flag(n) {
            if (n) {
                this.contentStyleObj.height = window.innerHeight - 185 + "px";
            } else {
                this.contentStyleObj.height = window.innerHeight - 151 + "px";
            }
        }
    },
    computed: {
        flag() {
            return this.$store.state.settings.tagsView;
        }
    }
};
</script>

<style lang="" scoped>
.editor {
    margin: 20px;
    z-index: inherit;
}
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.title {
    font-size: 20px;
}
</style>