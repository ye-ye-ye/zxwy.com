<template>
  <div id="student">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="classData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width:100%">
        <el-table-column prop="className" label="班级" width="100"></el-table-column>
        <el-table-column prop="stuName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="stuAge" label="年龄" width="50"></el-table-column>
        <el-table-column prop="stuSex" label="性别" width="100"></el-table-column>
        <el-table-column prop="stuMobile" label="手机号码" width="150"></el-table-column>
        <el-table-column prop="stuPassword" label="密码" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row), dialogFormVisible=true,button=2"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row),button=3"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="classData.length"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 4, //    每页的数据
      classData: []
    };
  },
  created() {
    this.lode();
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    lode() {
      var that = this;
      this.$http
        .get("/api/Class/GetAllClass")
        .then(res => {
          var a = [];
          console.log(res.data);
          console.log(res.data[0].classId);
          res.data.forEach(el => {
            that.$http
              .get("/api/Student/GetClassStudent?classId=" + el.classId)
              .then(res => {
                console.log(res.data);

                a.push(...res.data);
              })
              .catch(() => {});
          });
          that.classData = a;
        })
        .catch(() => {});
    }
  }
};
</script>

<style scope>
 
</style>
