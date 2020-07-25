<template>
  <div class="app-container">
    <!-- 添加或修改对话框 -->
    <el-card class="box-card">
      <el-form ref="para" :rules="rules" :model="para" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID" prop="id" hidden>
          <el-input v-model="para.id" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="para.name" />
        </el-form-item>
        <el-form-item label="规格选项" prop="options">
          <el-input v-model="para.options" type="textarea" :autosize="{ minRows: 4, maxRows: 15}" />
        </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input v-model="para.seq" />
        </el-form-item>
        <el-form-item label="模板" prop="templateId">
          <el-select v-model="para.templateId" value-key:id placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button v-if="isCreate == false" type="primary" @click="updateData">更新</el-button>
        <el-button v-if="isCreate == true" type="primary" @click="createData">新增</el-button>
      </div>
    </el-card>
  </div>
</template>

<style>
.el-card {
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.input-new-keyword {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
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
.op-container {
  display: flex;
  justify-content: center;
}
</style>

<script>
import { readPara, createPara, updatePara } from '@/api/para'
import { getAll } from '@/api/template'
import { getToken } from '@/utils/auth'

export default {
  name: 'Para',
  data() {
    return {
      para: {
        id: 0,
        name: '',
        options: '',
        seq: 0,
        templateId: 0
      },
      rules: {
        name: [{ required: true, message: 'name不能为空', trigger: 'blur' }],
        options: [{ required: true, message: 'options不能为空', trigger: 'blur' }]
      },
      isCreate: true,
      options: []
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
    this.init()
    this.getAllTemplate()
  },
  methods: {
    init() {
      if (this.$route.query == null) {
        return
      }
      const paraId = this.$route.query.paraId
      console.log(paraId)
      if (paraId) {
        this.isCreate = false
        readPara(paraId).then(response => {
          this.para = response.data
          console.log(response.data)
        }).catch(() => {
          this.para = []
        })
      }
    },
    getAllTemplate() {
      getAll().then(response => {
        this.options = response.data
      }).catch(response => {
        this.options = []
      })
    },
    createData() {
      this.$refs['para'].validate(valid => {
        if (valid) {
          createPara(this.para).then(response => {
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.$router.push({ path: '/template/paraList' })
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.msg
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['para'].validate(valid => {
        if (valid) {
          updatePara(this.spec)
            .then(() => {
              this.$notify.success({
                title: '成功',
                message: '更新成功'
              })
              this.$router.push({ path: '/template/paraList' })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.msg
              })
            })
        }
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/template/paraList' })
    }
  }
}
</script>
