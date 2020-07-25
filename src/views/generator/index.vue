<template>
  <div class="mod-menu">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.tableName" placeholder="表名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" icon="el-icon-search" @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" icon="el-icon-edit-outline" @click="generatorCode()">生成代码</el-button>
      </el-form-item>
    </el-form>
      <el-table
      ref="multipleTable"
      :data="dataList"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" class="selection"></el-table-column>
         <el-table-column
           prop="tableName"
           header-align="center"
           align="left"
           label="表名">
         </el-table-column>
         <el-table-column
           prop="tableComment"
           header-align="center"
           align="left"
           width="240"
           label="中文名">
         </el-table-column>
         <el-table-column
           prop="engine"
           header-align="center"
           align="left"
           width="240"
           label="数据库引擎">
         </el-table-column>
         <el-table-column
           prop="createTime"
           header-align="center"
           align="left"
           width="240"
           label="创建时间">
         </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="getDataList" />
  </div>
</template>

<script>
import { list, code } from '@/api/generator'
import Pagination from '@/components/Pagination' 

export default {
  components: { Pagination },
  data() {
    return {
      dataForm: {
          tableName: '',
          currentPage: 1,
          pageSize: 10
      },
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      listLoading: true
    }
  },
  activated() {
    this.getDataList()
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.listLoading = true
      list(this.dataForm).then(response => {
          this.dataList = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    //生成代码
    generatorCode() {
      let tables = []
      this.multipleSelection.map((item) => {
        tables.push({
          tableName:item.tableName,
          tableComment:item.tableComment
        })
      })
      code(tables).then(({ data }) => {
        let fileDownload = require('js-file-download')
        fileDownload(data, 'common.zip')
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.currentPage = val;
      this.getDataList();
    },
    //获取复选框内容
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>