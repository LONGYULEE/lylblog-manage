<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('sys:user:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="addOrUpdateHandle()">
                添加
            </el-button>
            <el-button type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()" class="filter-item"
                style="display:inline-block" v-if="isAuth('sys:user:delete')">批量删除</el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" @selection-change="selectionChangeHandle" border fit
            highlight-current-row style="width: 100%;">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column label="头像(查看大图)" align="center">
                <template slot-scope="scope">
                    <el-image class="table-td-thumb" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]">
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
                    <el-tag v-else size="small">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="dateformat">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button v-if="isAuth('sys:user:update')" type="text" size="small"
                        @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
                    <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.userId)">
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
import AddOrUpdate from './userAddOrUpdate'
export default {
    name: "sys-user",
    components: { Pagination, AddOrUpdate },
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
            tableKey: 0,
            addOrUpdateVisible: false,
            dataListSelections: []
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        getDataList() {
            this.listLoading = true;
            this.$http({
                url: "/admin/sys/user/list",
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
        handleEdit() { },
        handleDelete() { },
        // 多选
        selectionChangeHandle(val) {
            this.dataListSelections = val;
        },
        deleteHandle(id) {
            var userIds = id
                ? [id]
                : this.dataListSelections.map(item => {
                    return item.userId;
                });
            this.$confirm(
                `确定对[id=${userIds.join(",")}]进行[${
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
                        url: "/admin/sys/user/deleteBatch",
                        method: "delete",
                        data: this.$http.adornData(userIds, false)
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
                            this.$message.error(data.msg);
                        }
                    });
                })
                .catch(() => { });
        },
        dateformat(row) {
            return timeformat(row.createTime);
        },
        changeStatus(data) {
            return data === 1 ? true : false;
        },
        // 新增 / 修改
        addOrUpdateHandle(id) {
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id)
            })
        },
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