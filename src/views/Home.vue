<template>
  <div id="home">
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="$router.currentRoute.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <!-- logo -->
          <el-menu-item style="padding-left:10px;">
            <img src="@/assets/logo.png" />
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu v-for="(item,index) in  opction" :key="index" :index="''+index">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group v-for="(items,num) in item.arr" :index="index+'-'+num">
              <el-menu-item size="small" @click="addTab(items,index)" :index="items.routerPath">
                {{items.title}}
                <span class="triangle"></span>
              </el-menu-item>
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
          <!-- 标签页 -->
          <div class="tag">
            <el-tabs
              v-model="editableTabsValue"
              type="border-card"
              @tab-remove="removeTab"
              @tab-click="skip"
            >
              <el-tab-pane
                v-for="(item,index) in editableTabs"
                :key="item.name"
                :label="item.title.title"
                :name="item.name"
                :closable="index>0"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="logOut">退出系统</div>
              </el-dropdown-item>
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
      editableTabsValue: 0, //标签页 序列号
      editableTabs: [
        { title: { title: "首页", routerPath: "/Home" }, name: "0+''" } //标签页
      ],
      tabIndex: 0,

      opction: [
        {
          title: "基础信息",
          arr: [
            //基础信息

            { routerPath: "/sudentRouter", title: "学生管理" },
            { routerPath: "/classRouter", title: "班级管理" },
            { routerPath: "/teacherRouter", title: "教师管理" },
            { routerPath: "/teacherInfoRouter", title: "修改密码" }
          ]
        },
        {
          title: "在线测试",
          arr: [
            //在线测试
            { routerPath: "/testRouter", title: "测试维护" },
            { routerPath: "/assignTaskRouter", title: "布置任务" },
            { routerPath: "/checkRouter", title: "查阅试卷" },
            { routerPath: "/resultsRouter", title: "查看学成绩" }
          ]
        }
      ]
    };
  },
  created() {
    var that = this;
    console.log(JSON.parse(sessionStorage.getItem("data")));
    let data = JSON.parse(sessionStorage.getItem("data"));
    if (JSON.parse(sessionStorage.getItem("data")).length > 0) {
      //获取本地数据
      console.log(data);
      that.editableTabs = data;
      that.editableTabs.forEach(item => {
        if (that.$router.currentRoute.fullPath == item.title.routerPath) {
          that.editableTabsValue = item.name;
        }
      });
    } else {
      that.editableTabsValue = that.editableTabs[0].name;
    }
  },
  methods: {
    /**
     * 展开 收回
     */
    beginRecover() {
      this.isCollapse = !this.isCollapse;
    },
    /**
     * 添加右上导航栏标签
     */

    addTab(data) {
      console.log(data);
      var that = this;
      for (let i = 0; i < that.editableTabs.length; i++) {
        //查找是否有重复
        if (that.editableTabs[i].title.title == data.title) {
          that.editableTabsValue = that.editableTabs[i].name;
          return;
        }
      }
      let newTabName = ++that.tabIndex + "";
      that.editableTabs.push({
        title: data,
        name: newTabName
      });
      sessionStorage.setItem("data", JSON.stringify(that.editableTabs));
      that.editableTabsValue = newTabName;
    },
    /**点击跳转路由 */
    skip(data) {
      this.$router.push(this.editableTabs[data.index].title.routerPath);
    },
    /**
     * 删除标签
     */
    removeTab(targetName) {
      let that = this;
      // console.log(targetName);
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
                this.$router.push(tabs[index - 1].title.routerPath);
              } else {
                this.$router.push(tabs[index + 1].title.routerPath);
              }
            }
          }
        });
      }
      console.log(this.editableTabsValue);
      this.editableTabsValue = activeName;
      console.log(activeName);
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      sessionStorage.setItem("data", JSON.stringify(that.editableTabs));
    },
    //退出系统
    logOut() {
      this.$router.push("/");

      sessionStorage.removeItem("token_type");
      this.$message({
        message: "成功退出系统",
        type: "success"
      });
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
  flex: 1;
  overflow: hidden;
}

// 导航栏激活背景颜色
.el-menu-item.is-active {
  background-color: bisque;
  position: relative;
}
//三角小图标
.el-menu-item.is-active .triangle {
  margin: 0px;
  padding: 0px;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 20px solid black;
  position: absolute;
  right: 0px;
  top: 50%-10px;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>
