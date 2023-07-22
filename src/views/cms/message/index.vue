<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
          查询
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>
      <div class="search">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="标题：">
            <el-input size="mini" v-model="listQuery.title" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input size="mini" v-model="listQuery.intro" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumMessageStatus" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送日期：">
            <el-date-picker size="mini" v-model="listQuery.sendTime" type="daterange"  value-format="yyyy-MM-dd HH:mm:ss" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>批量操作</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15, 20,50,100]" :total="total">
      </el-pagination>
    </div>
    <div class="table-container">
      <el-table ref="infoTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="标题" width="350" align="center">
          <template slot-scope="scope">
            <div style="text-align: left;">{{ scope.row.title }}</div>
          </template>
        </el-table-column>
       
        <el-table-column label="简介" width="350" align="center">
          <template slot-scope="scope">{{ scope.row.intro }}</template>
        </el-table-column>
        <el-table-column label="发送人账号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.senderUsername }}</template>
        </el-table-column>
        <el-table-column label="发送人昵称" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.senderNickName }}</template>
        </el-table-column>
        <el-table-column label="接收会员用户名" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.memberUsername }}</template>
        </el-table-column>
        <el-table-column label="接收会员真实姓名" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.memberRealName }}</template>
        </el-table-column>
        <el-table-column label="发送时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.sendTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{ getMessageStatus(scope.row.status) }}</template>
        </el-table-column>
        
        <el-table-column label="">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">
              详细
            </el-button>
            <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogDetailVisible">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">标题</el-col>
          <el-col :span="4" class="table-cell-title">简介</el-col>
          <el-col :span="4" class="table-cell-title">发送人账号 </el-col>
          <el-col :span="4" class="table-cell-title">发送人昵称</el-col>
          <el-col :span="4" class="table-cell-title">发送时间</el-col>
          <el-col :span="4" class="table-cell-title">状态</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.title }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.intro }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.senderUsername }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.senderNickName }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.sendTime }}</el-col>
          <el-col :span="4" class="table-cell">{{ getMessageStatus(info.status) }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">接收会员用户名</el-col>
          <el-col :span="4" class="table-cell-title">接收会员真实姓名</el-col>
          <el-col :span="16" class="table-cell-title">内容</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.memberUsername }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.memberRealName }}</el-col>
          <el-col :span="16" class="table-cell">{{ info.contents }}</el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="isEdit ? '编辑' : '添加'" :visible.sync="dialogVisible">
      <el-form :model="info" ref="infoForm" :rules="infoRules" label-width="120px" size="small">
        <el-form-item prop="title" label="标题：">
          <el-input v-model="info.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="memberUsername" label="接收会员账号：" class="row">
          <el-input v-model="info.memberUsername" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="简介：" class="row">
          <el-input v-model="info.intro" type="textarea" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="contents" label="内容：" class="row">
          <tinymce :height="300" v-model="info.contents" placeholder="请输入"></tinymce>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>
<script>
import { listInfo, addInfo, setInfo } from '@/api/message';
import { formatDate } from '@/utils/date';
import { enumMessageStatus } from "@/utils/enums";
import SingleUpload from '@/components/Upload/singleUpload';
import Tinymce from '@/components/Tinymce';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  title: undefined,
  status: undefined,
  intro: undefined,
  sendTime: [],
  sendTimeStart: undefined,
  sendTimeEnd: undefined,
};
const defaultInfo = {
  id: 0,
  memberUsername: "",
  title: "",
  intro: "",
  contents: "",
};
export default {
  name: 'projectList',
  components: { SingleUpload, Tinymce },
  data() {
    return {
      enumMessageStatus,
      listQuery: Object.assign({}, defaultListQuery),
      category: {
        list: [],//类别列表
        dic: {},//类别字典
      },
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      info: Object.assign({}, defaultInfo),
      infoRules: {
        memberUsername: [
          { required: true, message: "请输入接收会员账号", trigger: 'change' }
        ],
        title: [
          { required: true, message: "请输入标题", trigger: 'change' }
        ],
        intro: [
          { required: true, message: "请输入简介", trigger: 'change' }
        ],
        contents: [
          { required: true, message: "请输入内容", trigger: 'change' }
        ],
        

      },
      isEdit: false,
      dialogDetailVisible: false,
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    getMessageStatus(value) {
      value = value + "";
      const obj = enumMessageStatus.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
      if (q.sendTime.length) {
        q.sendTimeStart = q.sendTime[0];
        q.sendTimeEnd = q.sendTime[1];
      }
      me.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleAdd() {
      const me = this;
      me.dialogVisible = true;
      me.isEdit = false;
      me.info = Object.assign({}, defaultInfo);
      me.$nextTick(() => {
        me.$refs.infoForm && me.$refs.infoForm.clearValidate();
      })
    },
    handleDialogConfirm() {
      const me = this, info = me.info;
      me.$refs.infoForm.validate((valid) => {
        if (!valid) {
          return;
        }
        me.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (me.isEdit) {
            setInfo(info).then(response => {
              me.$message({
                message: '修改成功！',
                type: 'success'
              });
              me.dialogVisible = false;
              me.getList();
            })
          } else {
            addInfo(info).then(response => {
              me.$message({
                message: '添加成功！',
                type: 'success'
              });
              me.dialogVisible = false;
              me.getList();
            })
          }
        });
      });
    },
    handleDetail(index, row) {
      this.dialogDetailVisible = true;
      this.info = Object.assign({}, row);
    },
    handleUpdate(index, row) {
      const me = this;
      me.dialogVisible = true;
      me.isEdit = true;
      me.info = Object.assign({}, row);
      me.$nextTick(() => {
        me.$refs.infoForm && me.$refs.infoForm.clearValidate();
      })
    },
    getList() {
      this.listLoading = true;
      listInfo(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
  }
}
</script>
<style scoped>
>>>.el-dialog {
  width: 80%;
  min-width: 800px;
}

>>>.el-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

>>>.el-form-item {
  width: 50%;
  margin: 15px 0 0;
}

>>>.el-dialog__body {
  padding: 10px 30px;
}

.row {
  width: 100%;
}

.detail {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.detail .li {
  width: 50%;
  line-height: 30px;
  display: flex;
}

.detail .label {
  width: 120px;
  padding-right: 20px;
  text-align: right;
}

.detail .value {
  flex: 1;
}

.search {}

>>>.search .el-form-item {
  width: 50%;
  margin: 15px 0 0;
}

.pagination-container {
  padding: 0 0 30px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #DCDFE6;
  border-top: 1px solid #DCDFE6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  background: #F2F6FC;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


