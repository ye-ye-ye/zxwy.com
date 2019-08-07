<template>
  <div id="class">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
<!-- Form -->
<el-button type="primary"  @click="dialogFormVisible = true" icon="el-icon-circle-plus-outline"></el-button>

<el-dialog title="增加班级" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="班级" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="教师" :label-width="formLabelWidth">
      <el-input v-model="form.teacher" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="专业" :label-width="formLabelWidth">
      <el-select v-model="form.major" placeholder="请选择专业">
        <el-option label="Web前端开发" value="1"></el-option>
        <el-option label="软件测试" value="2"></el-option> 
        <el-option label=".NET后台开发" value="3"></el-option> 
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
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
  

<script>
export default {
  data() {
    return {
        dialogFormVisible: false,//嵌套表单 false 为关闭状态
      tableData: [],//表格数据
       form: {
          className: '',//班级名称
          teacher:'',//教师名称
          major:''//专业
        },
        formLabelWidth: '120px'
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
.el-dialog__header{
   
  margin-left: 45%;
}
</style>
 
