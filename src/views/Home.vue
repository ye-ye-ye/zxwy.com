<template>
  <div id="home">
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="index.toString()"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item style="padding-left:10px;">
            <img src="@/assets/logo.png" />
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">基础信息</span>
            </template>
            <el-menu-item-group v-for="(item,index) in arr" :key="index" >
              <router-link :to="item.routerPath">
                <el-menu-item size="small" @click="addTab(editableTabsValue,item)" v-bind:index="(index.toString())">{{item.title}}</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">在线测试</span>
            </template>
            <el-menu-item-group  v-for="(item,index) in arr2" :key="index">
              <router-link :to="item.routerPath">
                <el-menu-item size="small" @click="addTab(editableTabsValue,item)" >{{item.title}}</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="padding:0px">
          <span @click="beginRecover">
            <i class="el-icon-s-fold"></i>
            <el-radio-group v-model="isCollapse"></el-radio-group>
          </span>
          <div class="tag">
            <el-tabs
              v-model="editableTabsValue"
              type="border-card"
              closable
              @tab-remove="removeTab"
              @tab-click="skip"
            >
              <el-tab-pane label="首页" name="0"></el-tab-pane>
              <el-tab-pane
                v-for=" item in editableTabs"
                :key="item.name"
                :label="item.title.title"
                :name="item.name"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <el-dropdown>
  <span class="el-dropdown-link">
    <el-avatar icon="el-icon-user-solid"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <router-link to="/"><el-dropdown-item >退出系统</el-dropdown-item></router-link>
  </el-dropdown-menu>
</el-dropdown>
          
        </el-header>
        <el-main>
          <router-view name="right"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false, //导航栏标题折叠
      editableTabsValue: 0,
      editableTabs: [],
      tabIndex: 0, 
      index:"",
      arr: [
        //基础信息
        { routerPath: "/sudentRouter", title: "学生管理" },
        { routerPath: "/classRouter", title: "班级管理" },
        { routerPath: "/teacherRouter", title: "教师管理" },
        { routerPath: "/teacherInfoRouter", title: "修改密码" }
      ],
      arr2: [
        //在线测试
        { routerPath: "/testRouter", title: "测试维护" },
        { routerPath: "/assignTaskRouter", title: "布置任务" },
        { routerPath: "/checkRouter", title: "查阅试卷" },
        { routerPath: "/resultsRouter", title: "查看学成绩" }
      ]
    };
  },
  created() {
  this.content()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

/**添加本地数据 */
  content(){
        let that=this
        console.log(this.$router.currentRoute.fullPath)
        if(sessionStorage.getItem('data')!=''){
             this.editableTabs=JSON.parse(sessionStorage.getItem('data'))
        for(let a of JSON.parse(sessionStorage.getItem('data'))){
          console.log(a)
           if(this.$router.currentRoute.fullPath==a.title.routerPath){
              that.editableTabsValue =a.name;//当前路由对应的页面
           }
        } 
        }
       
      },


    /**
     * 展开 收回
     */
    beginRecover() {
      this.isCollapse = !this.isCollapse;
    },
    /**
     * 添加右上导航栏标签
     */
    
    addTab(targetName, e) {
      console.log(e);
      var that = this;
      for (let i = 0; i < that.editableTabs.length; i++) {
        //查找是否有重复
        if (that.editableTabs[i].title.title == e.title) {
          that.editableTabsValue = that.editableTabs[i].name;
          return;
        }
      }
      let newTabName = ++that.tabIndex + "";
      that.editableTabs.push({
        title: e,
        name: newTabName
      });
      sessionStorage.setItem('data',JSON.stringify(that.editableTabs))
      that.editableTabsValue = newTabName;
    },
    /**点击跳转路由 */
    skip(data) {
      this.index=0;
      //  console.log(data.index)
      if (data.index == 0) {
        this.$router.push("/Home");
      } else {
        this.$router.push(this.editableTabs[data.index - 1].title.routerPath);
      }
       
    },
    /**
     * 删除标签
     */
    removeTab(targetName) {
      let that = this;
      console.log(targetName);
      let tabs = that.editableTabs;
      let activeName = that.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          console.log(tab);
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              if (index == tabs.length - 1) {
                that.$router.push(tabs[index - 1].title.routerPath);
                
              } else {
                that.$router.push(tabs[index + 1].title.routerPath);
              }
              console.log(tabs, index);
            } else {
            that.editableTabsValue =0;
              that.$router.push("/Home");
            }
          } 
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      sessionStorage.setItem('data',JSON.stringify(that.editableTabs))

    }
  }
};
</script>

<style scoped="scoped" lang="less">
#home {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
//布局样式开始
.el-header {
  background-color: white;
  color: #333;
  height: 40px !important;
  line-height: 40px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  height: 100%;
  background-color: antiquewhite;
}

.el-main {
 
  color: #333;
  height: 80%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
//布局样式结束

//左边导航栏样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background-color: antiquewhite;
}
.el-container {
  height: 100%;
}

.el-aside {
  overflow: hidden;
}
.el-menu-item {
  padding: 0px;
  background-color: antiquewhite;
}

.el-menu-item:hover {
  background-color: none !important;
}

.el-menu-item:first-child:focus,
.el-menu-item:first-child:hover {
  background-color: 0px;
}

// 标签
.el-tag,
.el-tag--light {
  cursor: pointer;
}
.tag {
  display: flex;
  display: inline;
  width: 80%;
  overflow: hidden;
}
 
  // .el-menu-item:focus, .el-menu-item:hover{
  //   background-color:aqua;
  // }
.el-menu-item.is-active{
  background-color:bisque;
}
</style>
