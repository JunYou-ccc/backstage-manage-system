<template>
    <div class="tags">
        <el-tag
            v-for="(item, index) in tags"
            :key="item.path"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item, index)">
            {{ item.label }}
        </el-tag>
    </div>
</template>
 <script>
 import { mapState } from 'vuex'
 export default {
    name: 'CommonTag',
    data() {
        return {
            
        }
    },
    methods: {
        changeMenu(item) {
            this.$router.push(item)
        },
        handleClose(item, index) {
            const length = this.tags.length - 1
            this.$store.commit('closeTag', item)
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    },
 }
 </script>
 <style lang="less" scoped>
    .tags {
        height: 46px;
        padding-top: 15px;
        display: flex;
        align-items: center;
        .el-tag {
            margin-left: 20px;
            cursor: pointer;
        }
    }
 </style>