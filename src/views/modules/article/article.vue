<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item"
                clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('sys:user:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="handleCreate">
                添加
            </el-button>
            <el-button v-if="isAuth('sys:user:update')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-edit" @click="handleEdit">
                修改
            </el-button>
            <el-button v-if="isAuth('sys:user:delete')" class="filter-item" style="margin-left: 10px;" type="danger"
                icon="el-icon-delete" @click="handleDelete">
                删除
            </el-button>
        </div>

        <el-table :data="dataList" border v-loading="listLoading" @selection-change="selectionChangeHandle"
            style="width: 100%;">
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="id" header-align="center" align="center" width="50" label="编号">
            </el-table-column>
            <el-table-column prop="title" header-align="center" align="center" label="博文标题" width="300">
            </el-table-column>
            <el-table-column prop="categoryListStr" header-align="center" align="center" label="分类" width="250">
            </el-table-column>
            <el-table-column prop="tagList" header-align="center" align="center" label="标签" width="300">
                <template slot-scope="scope">
                    <el-row>
                        <el-button v-for="tag in scope.row.tagList" :key="tag.id" size="mini">{{tag.name}}</el-button>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="readNum" header-align="center" align="center" width="80" label="浏览">
            </el-table-column>
            <el-table-column prop="likeNum" header-align="center" align="center" width="80" label="喜欢">
            </el-table-column>
            <el-table-column prop="recommend" header-align="center" align="center" label="推荐">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.recommend" active-color="#13ce66"
                        @change="updateRecommend(scope.row.id,scope.row.recommend)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="recommend" header-align="center" align="center" label="置顶">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.top" active-color="#13ce66"
                        @change="updateTop(scope.row.id,scope.row.top)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="recommend" header-align="center" align="center" label="状态">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="点击发布" v-if="!scope.row.publish" placement="top">
                        <el-button type="info" size="mini" @click="updatePublish(scope.row.id, true)">未发布</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="点击下架" v-if="scope.row.publish" placement="top">
                        <el-button type="success" size="mini" @click="updatePublish(scope.row.id, false)"
                            v-if="scope.row.publish === true">已发布</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page"
            :limit.sync="listQuery.size" @pagination="getDataList" />
    </div>
</template>

<script>
import { timeformat } from "@/utils/util";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
    name: "sys-user",
    components: { Pagination },
    data() {
        return {
            dataList: [],
            listQuery: {
                page: 1,
                size: 10,
                total: 0,
                username: ""
            },
            listLoading: false,
            tableKey: 0
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.listLoading = true;
            this.$http({
                url: "/admin/article/list",
                method: "get",
                params: this.$http.adornParams(this.listQuery)
            }).then(({ data }) => {
                console.log(data);
                if (data.code === 2000) {
                    this.dataList = data.data.list;
                    this.listQuery.total = data.data.totalCount;
                } else {
                    this.$myNotify.error(data.message);
                }
                this.listLoading = false;
            });
        },
        updatePublish() {},
        handleCreate() {},
        handleEdit() {},
        handleDelete() {},
        updateRecommend() {},
        selectionChangeHandle() {},
        dateformat(row) {
            return timeformat(row.createTime);
        },
        changeStatus(data) {
            return data === 1 ? true : false;
        }
    }
};
</script>
<style scoped>
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>