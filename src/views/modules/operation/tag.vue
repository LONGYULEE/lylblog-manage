<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.name" placeholder="标签名" style="width: 200px;" class="filter-item" clearable />
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
            <el-table-column prop="name" label="标签名"></el-table-column>
            <el-table-column prop="type" label="标签类型">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.type | changeType}}</el-tag>
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
    name: "operation-tag",
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
                name: ""
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
                url: "/admin/operation/tag/list",
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
    },
    filters: {
        changeType(data) {
            return data == 0 ? "文章" : "阅读";
        }
    }
};
</script>
