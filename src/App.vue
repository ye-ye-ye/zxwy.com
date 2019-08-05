<template>
  <div id="app">
     
    <router-view/>
  </div>
</template>

<style lang="less"> 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body{margin: 0px;padding: 0px;}
a{text-decoration: none;}
// 主页面标题下空隙
.el-menu-item-group__title{
  padding:  0px !important;
}

div.el-submenu__title{background-color: antiquewhite !important;}
//主页面首页标签×去除
#tab-0 .el-icon-close{
      display: none;
  }
   .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
   border-bottom: 3px solid #409EFF !important;
 }
</style>
