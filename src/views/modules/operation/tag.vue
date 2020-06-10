<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.name" placeholder="标签名" style="width: 200px;" class="filter-item" clearable />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getDataList">
                搜索
            </el-button>
            <el-button v-if="isAuth('operation:tag:save')" class="filter-item" style="margin-left: 10px;" type="primary"
                icon="el-icon-plus" @click="addOrUpdateHandle()">
                添加
            </el-button>
            <el-button v-if="isAuth('operation:tag:delete')" class="filter-item" style="margin-left: 10px;"
                :disabled="dataListSelections.length <= 0" type="danger" icon="el-icon-delete" @click="deleteHandle()">
                删除
            </el-button>
        </div>

        <el-table :key="tableKey" v-loading="listLoading" :data="dataList" @selection-change="selectionChangeHandle"
            border fit highlight-current-row style="width: 100%;">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column prop="name" label="标签名"></el-table-column>
            <el-table-column prop="type" label="标签类型">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.type | changeType}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page"
            :limit.sync="listQuery.size" @pagination="getDataList" />
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import AddOrUpdate from './tagAddOrUpdate'
export default {
    name: "operation-tag",
    components: { Pagination, AddOrUpdate },
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
            },
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
        // 多选
        selectionChangeHandle(val) {
            this.dataListSelections = val
        },
        // 新增 / 修改
        addOrUpdateHandle(id) {
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id)
            })
        },
        // 删除
        deleteHandle(id) {
            var ids = id ? [id] : this.dataListSelections.map(item => {
                return item.id
            })
            this.$confirm(`确定对这${ids.length}条数据进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    url: '/admin/operation/tag/delete',
                    method: 'delete',
                    data: this.$http.adornData(ids, false)
                }).then(({ data }) => {
                    if (data && data.code === 2000) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.getDataList()
                            }
                        })
                    } else {
                        this.$message.error(data.message)
                    }
                })
            })
        }
    },
    filters: {
        changeType(data) {
            return data == 0 ? "文章" : "阅读";
        }
    }
};
</script>
