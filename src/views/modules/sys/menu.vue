<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="角色名" style="width: 200px;" class="filter-item" clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('sys:menu:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="handleCreate">
                添加
            </el-button>
            <el-button v-if="isAuth('sys:menu:update')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-edit" @click="handleEdit">
                修改
            </el-button>
            <el-button v-if="isAuth('sys:menu:delete')" class="filter-item" style="margin-left: 10px;" type="danger"
                icon="el-icon-delete" @click="handleDelete">
                删除
            </el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" border fit highlight-current-row
            style="width: 100%;" :height="height">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="菜单" width="120">
            </el-table-column>
            <el-table-column prop="url" label="url">
            </el-table-column>
            <el-table-column prop="perms" label="权限">
            </el-table-column>
            <el-table-column label="类型" width="180">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.type | changeType}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="图标" align="center" width="80">
                <template slot-scope="scope">
                    <svg-icon :icon-class="scope.row.icon == null ? '' : scope.row.icon" />
                </template>
            </el-table-column>
            <el-table-column prop="parentName" label="父级" width="180">
            </el-table-column>
            <el-table-column prop="orderNum" label="排序" width="50">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { timeformat } from "@/utils/util";
export default {
    name: "sys-menu",
    data() {
        return {
            dataList: [],
            listLoading: false,
            tableKey: 0,
            height: ""
        };
    },
    created() {
        this.getDataList();
        window.addEventListener("resize", this.getHeight);
        this.getHeight();
    },
    methods: {
        getDataList() {
            this.listLoading = true;
            this.$http.get("/admin/sys/menu/list").then(({ data }) => {
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
        getHeight() {
            if (this.$store.state.settings.tagsView) {
                this.height = window.innerHeight - 215 + "px";
            } else {
                this.height = window.innerHeight - 181 + "px";
            }
        }
    },
    filters: {
        changeType(data) {
            if (data == 0) {
                return "目录";
            } else if (data == 1) {
                return "菜单";
            } else {
                return "按钮";
            }
        }
    },
    destroyed() {
        window.removeEventListener("resize", this.getHeight);
    }
};
</script>