<template>
    <div>
        <el-tabs type="border-card" class="tab-container">
            <el-tab-pane label="上传文件" :style="contentStyleObj">上传文件</el-tab-pane>
            <el-tab-pane label="编辑文件" :style="contentStyleObj">
                <mavon-editor v-model="context" :toolbars="toolbars" @imgAdd="imgAdd" @keydown=""
                    style="height: 500px" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Markdown from "@/components/Markdown/index";
export default {
    name: "article-articleAddOrUpdate",
    components: { Markdown },
    data() {
        return {
            contentStyleObj: {
                height: ""
            },
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
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append("link", $file);
            this.img_file[pos] = $file;
            this.$http({
                url: "/admin/sys/article/imageUpload",
                method: "post",
                data: formdata
            }).then(({ data }) => {});
        }
    },
    created() {
        window.addEventListener("resize", this.getHeight);
        this.getHeight();
    },
    destroyed() {
        window.removeEventListener("resize", this.getHeight);
    }
};
</script>

<style lang="" scoped>
.tab-container {
    margin: 30px;
}
</style>