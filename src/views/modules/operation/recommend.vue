<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.title" placeholder="连接名" style="width: 200px;" class="filter-item" clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('operation:tag:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="handleCreate">
                添加
            </el-button>
            <el-button v-if="isAuth('operation:tag:update')" class="filter-item" style="margin-left: 10px;"
                type="primary" icon="el-icon-edit" @click="handleEdit">
                修改
            </el-button>
            <el-button v-if="isAuth('operation:tag:delete')" class="filter-item" style="margin-left: 10px;"
                type="danger" icon="el-icon-delete" @click="handleDelete">
                删除
            </el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" border fit highlight-current-row
            style="width: 100%;">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="type" label="推荐类型"></el-table-column>
            <el-table-column prop="orderNum" label="推荐排序"></el-table-column>
            <el-table-column prop="top" label="是否置顶">
                <template slot-scope="scope">
                    {{scope.row.top ? "是" : "否"}}
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page"
            :limit.sync="listQuery.size" @pagination="getDataList" />
    </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
    name: "operation-recommend",
    components: { Pagination },
    data() {
        return {
            dataList: [],
            listLoading: false,
            tableKey: 0,
            listQuery: {
                page: 1,
                size: 10,
                total: 0,
                title: ""
            }
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.listLoading = true;
            this.$http({
                url: "/admin/operation/recommend/list",
                method: "get",
                params: this.$http.adornParams(this.listQuery)
            }).then(({ data }) => {
                if (data.code === 2000) {
                    this.dataList = data.data.list;
                    this.listQuery.total = data.data.totalCount;
                } else {
                    this.$myNotify.error(data.message);
                }
                this.listLoading = false;
            });
        },
        handleCreate() {},
        handleEdit() {},
        handleDelete() {}
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