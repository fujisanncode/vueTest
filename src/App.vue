<template>
  <v-app id="vueapp">
    <!-- 左侧抽屉 -->
    <v-navigation-drawer v-model="dispDrawer" app :clipped="$vuetify.breakpoint.lgAndUp">
      <v-skeleton-loader type="card-heading" :loading="loadingMenu" min-width="500" height="300">
        <v-list dense>
          <template v-for="item in items">
            <!-- 如果item.heading 存在，则按照heading菜单的方式显示-->
            <!-- <v-list-item v-if="item.heading" :key="item.heading">
              <v-flex xs6>
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-flex>
            </v-list-item> -->
            <!-- 如果item.childen存在，则按照存在子菜单的方式显示 -->
            <v-list-group v-if="item.children" v-model="item.model" :key="item.text"
                          :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
              <v-list-item slot="activator">
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-for="(child, i) in item.children" :key="i" @click="hrefTo(child)">
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ child.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <!-- 其他的按照普通菜单的方式显示 -->
            <v-list-item v-else @click="$router.push(item.to)" :key="item.text">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-skeleton-loader>
    </v-navigation-drawer>
    <!-- toolbar，顶部标题栏 -->
    <v-app-bar elevation=1 app :clipped-left="$vuetify.breakpoint.lgAndUp" v-if="true">
      <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.lgAndUp" @click="drawer=true">
      </v-app-bar-nav-icon>
      <span class="hidden-sm-and-down">富士山の小さな宇宙</span>
      <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search"
                    class="hidden-sm-and-down" v-if="false"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon to="/" v-if="false">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon @click.stop="loginDia()">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn icon @click="logOut()">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px">
          <!-- ./只能找到当前目录的文件，当前目录文件夹只能用../向下找 -->
          <img src="./assets/avatar/fujisann.jpg" alt="Vuetify"/>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <!-- 页脚ICP备案-->
    <v-footer padless app>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 black--text text-center">
          <span>@{{ new Date().getFullYear() }} fujisann</span>
          <span class="px-2"></span>
          <span> 皖ICP备20005176号</span>
          <span class="px-2"></span>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011502011263">
            苏公网安备 32011502011263号
          </a>
        </v-card-text>
      </v-card>
    </v-footer>

    <!-- 加载路由 getUserName用于传值给userName，userName传递到子组件的props中-->
    <!--    <v-skeleton-loader type="card" :loading="loadingMenu">-->
    <router-view :userName="getUserName" v-show="!loadingMenu"></router-view>
    <!--    </v-skeleton-loader>-->

    <!-- 浮动按钮-->
    <v-btn v-if="false" fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <!-- 浮动按钮的弹窗 -->
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">Create contact</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt=""/>
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Job title"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000"
                            mask="phone"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--登入弹窗-->
    <v-dialog v-model="loginDialog" width="400px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">登入</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field prepend-icon="mdi-account" placeholder="账号" v-model="user.name"/>
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="mdi-form-textbox-password" placeholder="密码" v-model="user.password"/>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-checkbox v-model="rememberUser" label="记住密码"></v-checkbox>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="loginDialog = false">取消</v-btn>
          <v-btn text @click="logIn()">登入</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 测试snakebar使用 -->
    <!-- <div id="snake0">
      <v-snackbar v-model="snackbar0">xxx</v-snackbar>
    </div> -->
    <div id="snake">
    </div>
  </v-app>
</template>

<script>
import instance from '@/common/api.js'
import {getCookie, setCookie} from '@/common/cookie.js'
import {Base64} from 'js-base64'

export default {
  data() {
    return {
      loginDialog: false,
      // source: 'https://codepen.io/johnjleider/pen/EQOYVV',
      dialog: false,
      // 左侧菜单显示内容，在create中通过顺序和router绑定，拟在此处指定路由名称进行绑定
      // {}
      items: [],
      // 显示左侧栏
      dispDrawer: this.$vuetify.breakpoint.lgAndUp,
      // 定时器
      timer: '',
      user: {},
      snackbar0: true,
      rememberUser: false,
      getUserName: '游客',
      loadingMenu: true,
      // 左侧栏是否显示
      drawer: false
    }
  },
  watch:{
    drawer(value){
      console.log('drawer==========>'+value)
      this.dispDrawer = this.$vuetify.breakpoint.lgAndUp || value
      console.log('disDrawer==========>'+ this.dispDrawer)
    },
    dispDrawer(value){
      if(!value) {
        this.drawer = value
      }
    }
  },
  created() {
    // 如果未加载过菜单，则将后台路由转化为菜单
    let savedMenu = window.sessionStorage.getItem('routerList')
    if (savedMenu === null) {
      console.log('当前未保存路由，重新请求重新渲染')
      let start = Date.now()
      // 50ms执行一次定时任务，路由表不为空或超时：则清楚定时任务，并完成路由跳转
      let that = this
      that.timer = setInterval(() => {
        if (this.$store.getters.getRouter.length !== 0) {
          this.buildMenu()
          clearInterval(that.timer) // 加载完毕菜单，清除定时任务
        } else if (Date.now() - start > 1000) {
          // this.$router.push('/404')
          clearInterval(that.timer) // 超时，清除定时任务
        }
        // 其他情况，等待定时任务再次执行
        // clearInterval(this.timer) // 超时，清除定时任务
      }, 50)
    } else {
      console.log('当前已经保存路由，仅重新渲染')
      // 如果本地存储了路由信息则
      this.addRouter(JSON.parse(savedMenu))
      this.buildMenu()
    }

    // 页面初始化的时候从cookie读取用户名和密码
    if (this.user.name !== undefined) {
      this.user.name = getCookie('name')
      this.user.password = Base64.decode(getCookie('password'))
    }
    console.log("当前加载完成的菜单为 =======> " + JSON.stringify(this.items))
  },
  methods: {
    // dispDrawer(){
    //   return this.$vuetify.breakpoint.lgAndUp || this.drawer
    // },
    // router-view接受子组件值得方法
    receivedValue(value) {
      console.log('获取到子组件的值 ======> ' + value)
    },
    // 构建左侧菜单
    buildMenu() {
      // 将store中路由列表（从后台请求的路由列表）中菜单相关数据提取出来
      let routerList = this.$store.getters.getRouter
      // 清空当前菜单
      this.items = []
      // 将保存的路由列表中菜单信息提取出来
      this.items.push(...this.buildChild(routerList))
      // 菜单构建后取消骨架加载
      this.loadingMenu = false
      // console.log("当前路由值 ====> " + JSON.stringify(this.$store.getters.getRouter))
      // console.log("当前菜单值 ====> " + JSON.stringify(this.items))
    },
    buildChild(children) {
      let result = []
      if (children === undefined) {
        return result
      }
      for (let i = 0; i < children.length; i++) {
        let e = children[i], meta = e.meta
        // 去除隐藏的菜单
        if (e.meta.hidden === 'true') {
          continue
        }

        let tmp = {
          to: e.path,
          text: meta.text,
          icon: meta.icon,
          'icon-alt': meta['icon-alt'],
          model: meta.model === 'true',
        }
        if (e.children !== undefined) {
          tmp.children = this.buildChild(e.children)
        }
        result.push(tmp)
      }
      return result;
    },
    // 菜单的点击事件
    hrefTo(item) {
      this.$router.push(item.to)
    },
    logOut() {
      // api.logout().then((res) => {
      //   this.$router.push('/login')
      // })
    },
    logIn() {
      // 如果勾选了记住密码，则使用localstorage保存密码，页面初始化的时候重新设置密码
      if (this.rememberUser === true) {
        setCookie('name', this.user.name)
        setCookie('password', Base64.encode(this.user.password))
      } else {
        setCookie('name', undefined)
        setCookie('password', undefined)
      }
      this.snackbar = true
      this.loginDialog = false
      let that = this
      instance({
        url: '/learning/shiro-manage/login',
        method: 'post',
        data: {
          name: this.user.name,
          password: this.user.password
        }
      }).then(resp => {
        // 登录成功，用户名保存到sessionStorage中
        this.getUserName = resp.user.name
        sessionStorage.setItem('userName', this.getUserName)

        // 登录后保存路由数据
        let routerList = resp.menu
        sessionStorage.setItem('routerList', JSON.stringify(routerList))
        // 保存后台请求的路由
        that.addRouter(routerList)
        // 读取保存的路由中的菜单信息，然后构建菜单
        that.buildMenu()
      })
    },
    // 将routerList解析并添加到路由中
    addRouter(routerList) {
      let that = this
      that.$store.dispatch('generatorRouter', routerList).then(() => {
        that.$store.getters.getRouter.forEach(e => {
          let componentName = e.component
          e.component = resolve => {
            require(['@/' + componentName + '.vue'], resolve)
          }
          if (e.children !== undefined) {
            e.children = this.buildChildRouter(e.children)
          }

          // 如果当前路由未添加过，则添加
          if (that.$router.getMatchedComponents(e.path).length === 0) {
            // 动态路由:https://router.vuejs.org/zh/api/#router-addroutes
            let routersTmp = []
            routersTmp.push(e)
            that.$router.addRoutes(routersTmp)
          }
        })
      })
    },
    buildChildRouter(children) {
      children.forEach(e => {
        let componentName = e.component
        e.component = resolve => {
          require(['@/' + componentName + '.vue'], resolve)
        }
        if (e.children !== undefined) {
          e.children = this.buildChildRouter(e.children)
        }
      })
      return children
    },
    loginDia() {
      this.loginDialog = !this.loginDialog

      // 如果当前cookie中保存了用户名，则记住密码默认勾选
      if (getCookie('name') !== undefined) {
        this.rememberUser = true
      }
    }
  }
}
</script>

