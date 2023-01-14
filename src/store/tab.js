import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,  // 控制菜单的展开或收起
        tabList: [          // 面包屑数据
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],
        menu: []            // 菜单栏数据
    },
    mutations: {
        // 控制菜单展开收起的方法
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        SelectMenu(state, val) {
            // 判断要添加的面包屑数据是否为首页
            if (val.name !== 'name') {
                const index = state.tabList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabList.push(val)
                }
            }
        },
        closeTag(state, val) {
            const index = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        // 动态添加路由
        addMenu(state, router) {
            // 判断缓存中是否存有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 添加动态路由
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}