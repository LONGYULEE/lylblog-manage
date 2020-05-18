<template>
    <div>
        <mark-down @markdownContext="markdownContext"></mark-down>
        <div class="box">
            <el-button type="primary" class="createBtn" @click="createArticle">创建文章</el-button>
        </div>

        <el-drawer title="我是标题" :visible.sync="drawer" size="45%" :wrapperClosable="false" :before-close="handleClose">
            <div slot="title" class="title">创建文章</div>
            <CreateArticle :context="context" @closeDrawer="closeDrawer" style="overflow-y:auto"></CreateArticle>
        </el-drawer>
    </div>
</template>

<script>
import CreateArticle from "./createArticle";
import MarkDown from "./markdown";
export default {
    name: "article-articleAddOrUpdate",
    components: { CreateArticle, MarkDown },
    data() {
        return {
            drawer: false,
            context: ""
        };
    },
    methods: {
        handleClose() {
            this.$confirm("还有内容未保存，是否离开?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.drawer = false;
                })
                .catch(() => {
                    console.log("没想到吧，爷啥也没做");
                });
        },
        createArticle() {
            if (this.context == "") {
                this.$myNotify.warning("请先填写文章内容");
                return false;
            } else {
                this.drawer = true;
            }
        },
        closeDrawer(data) {
            this.drawer = data;
        },
        markdownContext(data) {
            this.context = data;
        }
    },
    watch: {
        context(n) {
            console.log(n);
        }
    }
};
</script>

<style lang="" scoped>
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.title {
    font-size: 20px;
}
</style>