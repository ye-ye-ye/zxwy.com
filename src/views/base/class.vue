<template>
  <div id="class">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="className" label="班级名称" width="150"></el-table-column>
        <el-table-column prop="userName" label="老师名称" width="150"></el-table-column>
        <el-table-column prop="courseName" label="专业名称"></el-table-column>
        <el-table-column prop="classStudents" label="班级人数"></el-table-column>
        <el-table-column prop="classCreateTime" label="创班日期"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
    </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getAllClass();
  },
  methods: {
    getAllClass() {
      let that = this;
      this.$http
        .get("/api/Class/GetAllClass")
        .then(res => {
          console.log(res.data);
          res.data.forEach(element => {
            console.log(element.className);
            that.tableData.push({
              className: element.className,
              userName: element.userName,
              courseName: element.courseName,
              classStudents: element.classStudents,
              classCreateTime: element.classCreateTime
            });
          });
        })
        .catch(() => {});
    }
  }
};
</script>

 
<style scope ang="less">
.box-card {
  margin-top: 20px;
  width: 80%;
}
</style>
 
