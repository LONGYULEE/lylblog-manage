<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="角色名" style="width: 200px;" class="filter-item" clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('sys:menu:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="addOrUpdateHandle()">
                添加
            </el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" border fit highlight-current-row style="width: 100%;"
            :height="height">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="菜单" width="120">
            </el-table-column>
            <el-table-column prop="parentName" label="父级" width="180">
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
            <el-table-column prop="orderNum" label="排序" width="50">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button v-if="isAuth('sys:menu:update')" type="text" size="small"
                        @click="addOrUpdateHandle(scope.row.menuId)">修改</el-button>
                    <el-button v-if="isAuth('sys:menu:delete')" type="text" size="small" @click="deleteHandle(scope.row.menuId)">
                        删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script>
import { timeformat } from "@/utils/util";
import AddOrUpdate from "./menuAddOrUpdate";
export default {
    name: "sys-menu",
    components: { AddOrUpdate },
    data() {
        return {
            dataList: [],
            listLoading: false,
            tableKey: 0,
            height: "",
            addOrUpdateVisible: false
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
        getHeight() {
            if (this.$store.state.settings.tagsView) {
                this.height = window.innerHeight - 215 + "px";
            } else {
                this.height = window.innerHeight - 181 + "px";
            }
        },
        // 新增 / 修改
        addOrUpdateHandle(id) {
            this.addOrUpdateVisible = true;
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id);
            });
        },
        // 删除
        deleteHandle(id) {
            this.$confirm(`确定对[id=${id}]进行[删除]操作?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$http({
                        url: `/admin/sys/menu/delete/${id}`,
                        method: "delete",
                        data: this.$http.adornData()
                    }).then(({ data }) => {
                        if (data && data.code === 2000) {
                            this.$message({
                                message: "操作成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList();
                                }
                            });
                        } else {
                            this.$message.error(data.message);
                        }
                    });
                })
                .catch(() => { });
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