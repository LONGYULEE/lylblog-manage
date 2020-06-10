<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.roleName" placeholder="角色名" style="width: 200px;" class="filter-item" clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('sys:role:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="addOrUpdateHandle()">
                添加
            </el-button>
            <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" class="filter-item"
                :disabled="dataListSelections.length <= 0">批量删除</el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" @selection-change="selectionChangeHandle" border fit
            highlight-current-row style="width: 100%;">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="roleName" label="角色名" width="120">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="dateformat">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button v-if="isAuth('sys:role:update')" type="text" size="small"
                        @click="addOrUpdateHandle(scope.row.roleId)">修改</el-button>
                    <el-button v-if="isAuth('sys:role:delete')" type="text" size="small" @click="deleteHandle(scope.row.roleId)">
                        删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
            @pagination="getDataList" />
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script>
import { timeformat } from "@/utils/util";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import AddOrUpdate from "./roleAddOrUpdate";
export default {
    name: "sys-role",
    components: { Pagination, AddOrUpdate },
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
            tableKey: 0,
            dataListSelections: [],
            addOrUpdateVisible: false
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.listLoading = true;
            this.$http({
                url: "/admin/sys/role/list",
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
        dateformat(row) {
            return timeformat(row.createTime);
        },
        // 多选
        selectionChangeHandle(val) {
            this.dataListSelections = val;
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
            var ids = id
                ? [id]
                : this.dataListSelections.map(item => {
                    return item.roleId;
                });
            this.$confirm(
                `确定对[id=${ids.join(",")}]进行[${
                id ? "删除" : "批量删除"
                }]操作?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(() => {
                    this.$http({
                        url: "/admin/sys/role/delete",
                        method: "delete",
                        data: this.$http.adornData(ids, false)
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
    }
};
</script>
