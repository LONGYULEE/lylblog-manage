<template>
    <div>
        <mavon-editor v-model="context" :toolbars="toolbars" @imgAdd="imgAdd" :style="contentStyleObj" class="editor" />
        <div class="box">
            <el-button type="primary" class="createBtn" @click="createArticle" round>创建文章</el-button>
        </div>
        <el-dialog title="创建文章" :visible.sync="showCreateArticle" :close-on-click-modal="false" class="mydialog">
            <CreateArticle style="height:50vh;overflow-y:auto"></CreateArticle>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showCreateArticle = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>
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
        getHeight() {
            if (this.$store.state.settings.tagsView) {
                this.contentStyleObj.height = window.innerHeight - 215 + "px";
            } else {
                this.contentStyleObj.height = window.innerHeight - 181 + "px";
            }
        },
        imgAdd(pos, $file) {
            // 缓存图片信息
            this.img_file[pos] = $file;
        },
        createArticle() {
            this.showCreateArticle = true;
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
</style>