<template>
    <div class="app-container">
        <!-- 查询和其他操作 -->
        <div class="filter-container">
            <!--<el-button v-permission="['POST /admin/category/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>-->
            <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
        </div>

        <!-- 查询结果 -->
        <el-table v-loading="listLoading" :data="dataList" element-loading-text="正在查询中。。。" border fit highlight-current-row row-key="id">

            <el-table-column align="center" label="ID" prop="id"/>
            <el-table-column align="center" label="名称" prop="name"/>
            <el-table-column align="center" label="模板ID" prop="templateId"/>
            <el-table-column align="center" label="规格选项" prop="options"/>
            <el-table-column align="center" label="排序" prop="seq"/>

            <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <!--<el-button v-permission="['POST /admin/category/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button v-permission="['POST /admin/category/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>-->
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button v-if="back == true" type="danger" size="mini" @click="handleBack()">返回模板</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getDataList" />
    </div>
</template>

<style scoped>
    .filter-item{
        margin-left: 100px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 145px;
        height: 145px;
        display: block;
    }
</style>

<script>
import { listSpec, createSpec, updateSpec, deleteSpec } from '@/api/spec'
import Pagination from '@/components/Pagination'
import { getToken } from '@/utils/auth'

export default {
  name: 'Spec',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      dataList: [],
      total: 0,
      dataForm: {
        id: undefined,
        name: '',
        options: '',
        seq: 0,
        templateId: 0
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        templateId: undefined,
        sort: 'create_time desc'
      },
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        name: [{ required: true, message: 'name不能为空', trigger: 'blur' }],
        options: [{ required: true, message: 'options不能为空', trigger: 'blur' }]
      },
      back: false
    }
  },
  computed: {
    headers() {
      return {
        'X-Tinymall-Token': getToken()
      }
    }
  },
  created() {
    if (this.$route.query.templateId != null) {
      this.listQuery.templateId = this.$route.query.templateId
      this.back = true
    }
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.listLoading = true
      listSpec(this.listQuery).then(response => {
        this.dataList = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.dataList = []
        this.total = 0
        this.listLoading = false
      })
    },
    resetForm() {
        this.dataForm = {
          id: undefined,
          name: '',
          options: '',
          seq: 0,
          templateId: 0
        }
    },
    handleCreate() {
      this.$router.push({ path: '/template/specEdit', query: {  }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/template/specEdit', query: { specId: row.id }})
    },
    handleDelete(row) {
      deleteSpec(row)
      .then(response => {
          this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.dataList.indexOf(row)
        this.dataList.splice(index, 1)
      })
      .catch(response => {
          this.$notify.error({
          title: '失败',
          message: response.data.msg
        })
      })
    },
    handleBack(){
      this.$router.push({ path: '/template/list', params: { }})
    }
  }
}
</script>
