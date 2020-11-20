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
                                    <div class="grid-num">1234</div>
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
                                    <div class="grid-num">321</div>
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
                                    <div class="grid-num">5000</div>
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
            data: [
                {
                    name: "2018/09/04",
                    value: 1083
                },
                {
                    name: "2018/09/05",
                    value: 941
                },
                {
                    name: "2018/09/06",
                    value: 1139
                },
                {
                    name: "2018/09/07",
                    value: 816
                },
                {
                    name: "2018/09/08",
                    value: 327
                },
                {
                    name: "2018/09/09",
                    value: 228
                },
                {
                    name: "2018/09/10",
                    value: 1065
                }
            ],
        };
    },
    components: {
    },
    computed: {
        role() {
            return this.$store.getters.username === "admin"
                ? "超级管理员"
                : "普通用户";
        },
        url: function () {
            return this.$store.getters.avatar;
        }
    },
    created() {
        // this.handleListener();
        // this.changeDate();
    },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener("resize", this.renderChart);
    //     bus.$off("collapse", this.handleBus);
    // },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() +
                    1}/${date.getDate()}`;
            });
        }

        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
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
    color: rgb(45, 140, 240)

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
    flex: 1
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
</style>
