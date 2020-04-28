<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.roleName" placeholder="角色名" style="width: 200px;" class="filter-item"
                clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('sys:role:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="handleCreate">
                添加
            </el-button>
            <el-button v-if="isAuth('sys:role:update')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-edit" @click="handleEdit">
                修改
            </el-button>
            <el-button v-if="isAuth('sys:role:delete')" class="filter-item" style="margin-left: 10px;" type="danger"
                icon="el-icon-delete" @click="handleDelete">
                删除
            </el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" border fit highlight-current-row
            style="width: 100%;">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="menuUrl" label="参数url">
            </el-table-column>
            <el-table-column prop="parKey" label="参数键" width="180">
            </el-table-column>
            <el-table-column prop="parValue" label="参数值" width="180">
            </el-table-column>
            <el-table-column prop="type" label="参数类型">
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
    name: "sys-param",
    components: { Pagination },
    data() {
        return {
            dataList: [],
            listQuery: {
                page: 1,
                size: 10,
                total: 0,
                roleName: ""
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
                url: "/admin/sys/param/list",
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
        handleDelete() {},
        dateformat(row) {
            return timeformat(row.createTime);
        }
    }
};
</script>
