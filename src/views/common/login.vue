<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="param.username" placeholder="username">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" placeholder="password" v-model="param.password"
                        @keyup.enter.native="submitForm()">
                    </el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-row :gutter="10">
                        <el-col :span="16" style="height:36px">
                            <el-input prefix-icon="el-icon-lx icon-securityCode-b" placeholder="captcha"
                                v-model="param.captcha">
                            </el-input>
                        </el-col>
                        <el-col :span="8" style="height:36px">
                            <el-image :src="captchaUrl" alt="看不清，换一张" style="height:36px;border-radius:3px"
                                @click="changeCaptCha">
                            </el-image>
                        </el-col>
                    </el-row>

                </el-form-item>
                <div class="login-btn">
                    <!-- .native禁用原生事件 -->
                    <el-button type="primary" @click.native="submitForm">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getUUID } from "@/utils/util";
import { setToken } from "@/utils/auth";
export default {
    data: function() {
        return {
            param: {
                username: "admin",
                password: "admin",
                captcha: "",
                uuid: ""
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                captcha: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ]
            },
            captchaUrl: ""
        };
    },
    created() {
        this.getCaptcha();
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$http
                        .post("/admin/sys/login", this.param)
                        .then(res => {
                            let { data } = res;
                            if (data.code === 2000) {
                                setToken(data.data);
                                this.$router.replace({ path: "/home" });
                            } else {
                                this.$myNotify.error(data.message);
                            }
                        });
                } else {
                    this.$message.error("请输入登录信息");
                    return false;
                }
            });
        },
        getCaptcha() {
            this.param.uuid = getUUID();
            this.$http
                .get("/admin/sys/getKaptcha?uuid=" + this.param.uuid)
                .then(res => {
                    this.captchaUrl = res.data;
                });
        },
        changeCaptCha() {
            this.getCaptcha();
        }
    }
};
</script>

<style lang="css" scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /* background-image: url(../../assets/img/login-bg.jpg); */
    /* background-clip: #282c34; */
    background-color: #324157;
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 10px;
    background: rgba(40, 44, 52, 0.3);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
.ms-login::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(20px);
    z-index: -1;
    margin: -30px;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.el-input {
    background-color: transparent;
}
</style>