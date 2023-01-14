<template>
    <el-form ref="form" :inline="true" class="login-container" :model="form" :rules="rules" label-width="70px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
    data() {
        return {
            form : {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' },
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' },
                ]
            }
        }
    },
    methods: {
        submit() {
            // // 点击登录，后端返回token信息
            // const token = Mock.Random.guid()
            // // 将token保存到cookie，用于不同页面间通信
            // Cookie.set('token', token)
            // this.$router.push('/home')
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data)
                        if (data.code === 20000) {
                            // 把token存入cookie, 用于页面间的通信
                            Cookie.set('token', data.data.token)
                            // 获取菜单数据，存入store中
                            this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                            this.$message.success('登录成功');
                        } else {
                            this.$message.error('账号或密码不正确');
                        }
                    })
                }
            })
            
        }
    },
}
</script>
<style lang="less" scoped>
    .login-container{
        width: 350px;
        border: 1px solid #eaeaea;
        margin: 190px auto;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        .login_title {
            margin-bottom: 40px;
            color: #505458;
        }
        .el-input {
            width: 198px;
        }
    }
</style>