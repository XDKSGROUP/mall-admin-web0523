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
          <el-form-item label="名称：">
            <el-input size="mini" v-model="listQuery.name" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="值：">
            <el-input size="mini" v-model="listQuery.value" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input size="mini" v-model="listQuery.remark" class="input-width" placeholder="请输入" clearable></el-input>
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
        <el-table-column label="名称" width="350" align="center">
          <template slot-scope="scope">
            <div style="text-align: left;">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="值" width="350" align="center">
          <template slot-scope="scope">
            <div style="text-align: left;">{{ scope.row.value }}</div>
          </template>
        </el-table-column>
        <el-table-column label="业务类型" width="120" align="center">
          <template slot-scope="scope">{{ getBusinessType(scope.row.businessType) }}</template>
        </el-table-column>
        <el-table-column label="资金类型" width="120" align="center">
          <template slot-scope="scope">{{ getMoneyType(scope.row.moneyType) }}</template>
        </el-table-column>
        <el-table-column label="会员等级" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.memberLevelName }}</template>
        </el-table-column>
        <el-table-column label="备注" width="350" align="center">
          <template slot-scope="scope">
            <div style="text-align: left;">{{ scope.row.remark }}</div>
          </template>
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
          <el-col :span="4" class="table-cell-title">名称</el-col>
          <el-col :span="4" class="table-cell-title">值</el-col>
          <el-col :span="4" class="table-cell-title">业务类型</el-col>
          <el-col :span="4" class="table-cell-title">资金类型</el-col>
          <el-col :span="4" class="table-cell-title">会员等级</el-col>
          <el-col :span="4" class="table-cell-title">备注</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.name }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.value }}</el-col>
          <el-col :span="4" class="table-cell">{{ getBusinessType(info.businessType) }}</el-col>
          <el-col :span="4" class="table-cell">{{ getMoneyType(info.moneyType) }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.memberLevelName }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.remark }}</el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="isEdit ? '编辑' : '添加'" :visible.sync="dialogVisible">
      <el-form :model="info" ref="infoForm" :rules="infoRules" label-width="120px" size="small">
        <el-form-item prop="name" label="名称：">
          <el-input v-model="info.name" placeholder="请输入" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item prop="value" label="值：">
          <el-input v-model="info.value" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="businessType" label="业务类型：">
          <el-radio-group v-model="info.businessType" :disabled="isEdit">
            <el-radio :label="0">充值</el-radio>
            <el-radio :label="1">提现</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="moneyType" label="资金类型：">
          <el-radio-group v-model="info.moneyType" :disabled="isEdit">
            <el-radio :label="0">爱心值</el-radio>
            <el-radio :label="1">贡献值</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="memberLevelId" label="会员等级：">
          <el-cascader :value="[info.memberLevelId]" :options="memberLevel.list" :props="{ checkStrictly: true }" clearable
            @change="info.memberLevelId = arguments[0][0]; info.memberLevelName = memberLevel.dic[info.memberLevelId]" :disabled="isEdit"></el-cascader>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input v-model="info.remark" placeholder="请输入"></el-input>
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
import { listInfo, addInfo, setInfo } from '@/api/strategySetting';
import { listInfo as classListInfo } from '@/api/memberLevel';
import { formatDate } from '@/utils/date';
import { enumBusinessType,enumMoneyType } from "@/utils/enums";
import SingleUpload from '@/components/Upload/singleUpload';
import Tinymce from '@/components/Tinymce';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  name: undefined,
  value: undefined,
  remark: undefined,
};
const defaultInfo = {
  id: 0,
  name: "",
  value: "",
  remark: "",
};
export default {
  name: 'projectList',
  components: { SingleUpload, Tinymce },
  data() {
    return {
      enumBusinessType,
      enumMoneyType,
      listQuery: Object.assign({}, defaultListQuery),
      memberLevel: {
        list: [],//会员等级列表
        dic: {},//会员等级字典
      },
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      info: Object.assign({}, defaultInfo),
      infoRules: {
        name: [
          { required: true, message: "请输入名称", trigger: 'change' }
        ],
        value: [
          { required: true, message: "请选择值", trigger: 'change' }
        ],
        businessType: [
          { required: true, message: "请选择业务类型", trigger: 'change' }
        ],
        moneyType: [
          { required: true, message: "请选择资金类型", trigger: 'change' }
        ],
        memberLevelId: [
          { required: true, message: "请选择会员等级", trigger: 'change' }
        ],
        

      },
      isEdit: false,
      dialogDetailVisible: false,
    }
  },
  created() {
    this.getClassList();
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
    async getClassList() {
      debugger
      const me = this,
        rst = await classListInfo();
      if (!rst.data) return;
      const get = (lst) => {
        return lst.map(o => {
          me.memberLevel.dic[o.id] = o.name;
          return {
            label: o.name,
            value: o.id,
            children: o.children ? get(o.children) : undefined
          }
        });
      };
      me.memberLevel.list.push(...get(rst.data.list));
    },
    getBusinessType(value) {
      value = value + "";
      const obj = enumBusinessType.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    getMoneyType(value) {
      value = value + "";
      const obj = enumMoneyType.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
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
  height: 100px;
  line-height: 80px;
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


