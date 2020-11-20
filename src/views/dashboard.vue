<template>
    <div style="margin:20px">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <!-- <img src="../../assets/img/img.jpg" class="user-avator" alt /> -->
                        <el-image :src="url">
                        </el-image>
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>VUE
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JAVA
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-document  grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{nums.articles}}</div>
                                    <div>文章</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-s-grid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{nums.categories}}</div>
                                    <div>分类</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-collection-tag grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{nums.tags}}</div>
                                    <div>标签</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="years" v-for="(item,index) in years" :key="index">
                        <el-badge :value="item.count" type="primary">
                            <div class="years-num">
                                <div>{{item.year}}</div>
                            </div>
                        </el-badge>
                        <el-badge :value="item01.count" v-for="(item01,index01) in item.months" :key="index01">
                            <div class="month-num">
                                <div>{{item01.month}}</div>
                            </div>
                        </el-badge>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "dashboard",
    data() {
        return {
            name: localStorage.getItem("ms_username"),
            todoList: [
                {
                    title: "今天要修复100个bug",
                    status: false
                },
                {
                    title: "今天要修复100个bug",
                    status: false
                },
                {
                    title: "今天要写100行代码加几个bug吧",
                    status: false
                },
                {
                    title: "今天要修复100个bug",
                    status: false
                },
                {
                    title: "今天要修复100个bug",
                    status: true
                },
                {
                    title: "今天要写100行代码加几个bug吧",
                    status: true
                }
            ],
            nums: {
                articles: 0,
                categories: 0,
                tags: 0
            },
            years: []
        };
    },
    components: {
    },
    computed: {
        role() {
            return this.$store.getters.name === "admin"
                ? "超级管理员"
                : "普通用户";
        },
        url: function () {
            return this.$store.getters.avatar;
        }
    },
    created() {
        this.getNums();
        this.getYears();
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() +
                    1}/${date.getDate()}`;
            });
        },
        getNums() {
            this.$http
                .get("/admin/operation/category/getNums", this.param)
                .then(res => {
                    let { data } = res;
                    if (data.code === 2000) {
                        this.nums = {
                            articles: data.data.articleNum,
                            categories: data.data.categoryNum,
                            tags: data.data.tagNum
                        }
                    }
                });
        },
        getYears() {
            this.$http
                .get("/timeline", this.param)
                .then(res => {
                    let { data } = res;
                    if (data.code === 2000) {
                        this.years = data.data;
                    }
                });
        }
    }
};
</script>


<style lang="sass" scoped>
.el-row
    margin-bottom: 20px

.grid-content
    display: flex
    align-items: center
    height: 100px

.grid-cont-right
    flex: 1
    text-align: center
    font-size: 14px
    color: #999

.grid-num
    font-size: 30px
    font-weight: bold

.grid-con-icon
    font-size: 50px
    width: 100px
    height: 100px
    text-align: center
    line-height: 100px
    color: #fff

    .grid-con-1 &
        background: rgb(45, 140, 240)

.grid-con-1 .grid-num
    color: rgb(45, 140, 240)

.grid-con-2 .grid-con-icon
    background: rgb(100, 213, 114)

.grid-con-2 .grid-num
    color: #64d572

.grid-con-3 .grid-con-icon
    background: rgb(242, 94, 67)

.grid-con-3 .grid-num
    color: rgb(242, 94, 67)

.user-info
    display: flex
    align-items: center
    justify-content: center
    height: 100%

/deep/ .el-card__body
    height: 100%

.el-image
    width: 120px
    height: 120px
    border-radius: 50%

.user-info-cont
    padding-left: 50px
    font-size: 14px
    color: #999

    & div:first-child
        font-size: 30px
        color: #222

.user-info-list
    font-size: 14px
    color: #999
    line-height: 25px

    & span
        margin-left: 70px

.mgb20
    margin-bottom: 20px

.todo-item
    font-size: 14px

    &-del
        text-decoration: line-through
        color: #999

.years
    width: 100%
    height: 75px
    margin-bottom: 20px
    .years-num
        height: 75px
        width: 75px
        border-radius: 5px
        background: darkseagreen
        color: #fff
        display: inline-block
        margin-right: 25px
        position: relative
        div
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            font-size: 21px
    .month-num
        height: 75px
        width: 75px
        border-radius: 5px
        background: cadetblue
        color: #fff
        display: inline-block
        margin-right: 25px
        position: relative
        div
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            font-size: 21px
</style>
