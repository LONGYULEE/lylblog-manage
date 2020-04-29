<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.name" placeholder="分类名" style="width: 200px;" class="filter-item" clearable />
            <el-select v-model="listQuery.importance" placeholder="类型" clearable style="width: 100px"
                @change="getChange" class="filter-item">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('operation:category:save')" class="filter-item" style="margin-left: 10px;"
                type="primary" icon="el-icon-plus" @click="handleCreate">
                添加
            </el-button>
            <el-button v-if="isAuth('operation:category:update')" class="filter-item" style="margin-left: 10px;"
                type="primary" icon="el-icon-edit" @click="handleEdit">
                修改
            </el-button>
            <el-button v-if="isAuth('operation:category:delete')" class="filter-item" style="margin-left: 10px;"
                type="danger" icon="el-icon-delete" @click="handleDelete">
                删除
            </el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" border fit highlight-current-row
            style="width: 100%;">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="分类名">
            </el-table-column>
            <el-table-column prop="parentName" label="父菜单名称">
            </el-table-column>
            <el-table-column prop="rank" label="级别">
            </el-table-column>
            <el-table-column label="分类类型">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.type | changeType}}</el-tag>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import { timeformat } from "@/utils/util";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
    name: "operation-category",
    data() {
        return {
            dataList: [],
            listLoading: false,
            tableKey: 0,
            listQuery: {
                type: 0,
                name: ""
            },
            options: [
                { value: "0", label: "文章" },
                { value: "1", label: "阅读" }
            ]
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.listLoading = true;
            this.$http({
                url: "/admin/operation/category/list",
                method: "get",
                params: this.$http.adornParams(this.listQuery)
            }).then(({ data }) => {
                if (data.code === 2000) {
                    this.dataList = data.data;
                } else {
                    this.$myNotify.error(data.message);
                }
                this.listLoading = false;
            });
        },
        handleCreate() {},
        handleEdit() {},
        handleDelete() {},
        getChange(val) {
            this.listQuery.type = val;
        }
    },
    filters: {
        changeType(data) {
            return data == 0 ? "文章" : "阅读";
        }
    }
};
</script>
