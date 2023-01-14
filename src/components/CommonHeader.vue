<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="HandleMenu()" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script> 
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {}
    },
    methods: {
        HandleMenu() {
            this.$store.commit('CollapseMenu')
        },
        handleClick(command) {
            if (command === 'out') {
                // 清除token信息和menu
                Cookie.remove('token')
                Cookie.remove('menu')

                // 跳转登录页面
                this.$router.push('/login')
            }
        }
    },
    computed: {
        ...mapState ({
            tags: state => state.tab.tabList
        })
    },
}
</script>
<style lang="less" scoped>
    .header-container {
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .r-content {
            .user {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .l-content {
            display: flex;
            align-items: center;
            /deep/.el-breadcrumb {
                margin-left: 20px;
                .el-breadcrumb__inner {
                    font-weight: normal;
                &.is-link {
                    color: #fff;
                }
            }
            }
            
        }
    }
</style>