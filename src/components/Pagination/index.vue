<template>
    <div :class="{'hidden':hidden}" class="pagination-container">
        <el-pagination :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout"
            :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
    name: "Pagination",
    props: {
        total: {
            //总条目数
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 10
        },
        pageSizes: {
            //每页数量
            type: Array,
            default() {
                return [10, 25, 50, 100];
            }
        },
        layout: {
            //分页组件显示内容
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        background: {
            // 是否为分页按钮添加背景色
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page;
            },
            set(val) {
                this.$emit("update:page", val);
            }
        },
        pageSize: {
            get() {
                return this.limit;
            },
            set(val) {
                this.$emit("update:limit", val);
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit("pagination", { page: this.currentPage, limit: val });
            if (this.autoScroll) {
                scrollTo(0, 800);
            }
        },
        handleCurrentChange(val) {
            this.$emit("pagination", { page: val, limit: this.pageSize });
            if (this.autoScroll) {
                scrollTo(0, 800);
            }
        }
    }
};
</script>

<style scoped>
.pagination-container {
    background: #fff;
    padding: 32px 16px;
}
.pagination-container.hidden {
    display: none;
}
</style>
