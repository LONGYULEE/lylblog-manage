<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('sys:user:save')" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">
                添加
            </el-button>
            <el-button v-if="isAuth('sys:user:update')" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleEdit">
                修改
            </el-button>
            <el-button v-if="isAuth('sys:user:delete')" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDelete">
                删除
            </el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" border fit highlight-current-row style="width: 100%;">
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
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                    <el-switch :value="changeStatus(scope.row.status)" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="dateformat">
            </el-table-column>
        </el-table>

        <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getDataList" />

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
        handleCreate() { },
        handleEdit() { },
        handleDelete() { },
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