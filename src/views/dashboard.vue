<template>
    <div class="dashboardwrapper">
        <!-- <el-card shadow="hover" class="mgb20" style="height:252px;">
            <div class="user-info">
                <el-image :src="url">
                </el-image>
                <div class="user-info-cont">
                    <div class="user-info-name">{{name}}</div>
                    <div>{{role}}</div>
                </div>
            </div>
        </el-card> -->
        <div class="user-info">
            <el-image :src="url">
            </el-image>
            <div class="user-info-cont">
                <div class="user-info-name">{{name}}</div>
                <div class="user-role-name">{{role}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "dashboard",
    data() {
        return {
            name: "欢迎访问后台管理(oﾟ▽ﾟ)o",
        };
    },
    computed: {
        role() {
            return this.$store.getters.username === "admin"
                ? "超级管理员"
                : "普通用户";
        },
        url: function () {
            return this.$store.getters.avatar;
        }
    },
    created() {
        // this.handleListener();
        // this.changeDate();
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() +
                    1}/${date.getDate()}`;
            });
        }

    }
};
</script>


<style scoped>
.dashboardwrapper {
    background: url('../assets/image/AK-02.jpg');
    height: 100vh;
}
.user-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 2;
}

.el-image {
    width: 350px;
    height: 350px;
    border-radius: 50%;
}

.user-info-name {
    text-align: center;
    font-size: 30px;
    width: 350px;
    color: #42cece;
}

.user-role-name {
    text-align: center;
    font-size: 20px;
    color: darkgray;
}
</style>
