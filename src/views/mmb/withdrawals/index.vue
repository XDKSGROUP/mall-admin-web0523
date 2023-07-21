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
          <el-form-item label="编号：">
            <el-input size="mini" v-model="listQuery.number" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="会员用户名：">
            <el-input size="mini" v-model="listQuery.username" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="会员真实姓名：">
            <el-input size="mini" v-model="listQuery.realName" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="资金类型：">
            <el-select v-model="listQuery.type" clearable placeholder="请选择">
              <el-option v-for="item in enumMoneyType" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请日期：">
            <el-date-picker size="mini" v-model="listQuery.applyTime" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="申请数量：">
            <el-input-number size="mini" v-model="listQuery.moneyStart" placeholder="开始数量"
              controls-position="right"></el-input-number> 至
            <el-input-number size="mini" v-model="listQuery.moneyEnd" placeholder="结束数量"
              controls-position="right"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card v-if="false" class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="infoTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="帐号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="姓名" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="资金类型" width="80" align="center">
          <template slot-scope="scope">{{ getMoneyType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column label="申请数量" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.applyMoney }}</template>
        </el-table-column>
        <el-table-column label="实际数量" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.actualMoney }}</template>
        </el-table-column>
        <el-table-column label="手续费" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.handlingFee }}</template>
        </el-table-column>
        <el-table-column label="银行卡号" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.bankCardNumber }}</template>
        </el-table-column>
        <el-table-column label="持卡人" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.cardholder }}</template>
        </el-table-column>
        <el-table-column label="银行名称" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.bankName }}</template>
        </el-table-column>
        <el-table-column label="支行名称" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.branchName }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{ getWithdrawalsStatus(scope.row.status) }}</template>
        </el-table-column>
        <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="scope">{{ getAuthStatus(scope.row.auditStatus) }}</template>
        </el-table-column>
        <el-table-column label="申请时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.applyTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">
              详细
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button v-if="scope.row.status === 0 && scope.row.auditStatus === 0" size="mini" type="text"
              @click="handleAuth(scope.$index, scope.row)">
              审核
            </el-button>
            <el-button v-if="scope.row.status === 0 && scope.row.auditStatus === 1" size="mini" type="text"
              @click="setPaySuccess(scope.row)">
              打款
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="setAuthAbolish(scope.row)">
              作废
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15, 20,50,100]" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogDetailVisible">
      <div class="detail">
        <div class="li">
          <div class="label">会员用户名</div>
          <div class="value">{{ info.username }}</div>
        </div>
        <div class="li">
          <div class="label">会员真实姓名</div>
          <div class="value">{{ info.realName }}</div>
        </div>
        <div class="li">
          <div class="label">资金类型</div>
          <div class="value">{{ getMoneyType(info.type) }}</div>
        </div>
        <div class="li">
          <div class="label">申请金额</div>
          <div class="value">{{ info.applyMoney }}</div>
        </div>
        <div class="li">
          <div class="label">实际金额</div>
          <div class="value">{{ info.actualMoney }}</div>
        </div>
        <div class="li">
          <div class="label">手续费</div>
          <div class="value">{{ info.handlingFee }}</div>
        </div>
        <div class="li">
          <div class="label">银行名称</div>
          <div class="value">{{ info.bankName }}</div>
        </div>
        <div class="li">
          <div class="label">支行名称</div>
          <div class="value">{{ info.branchName }}</div>
        </div>
        <div class="li">
          <div class="label">银行卡号</div>
          <div class="value">{{ info.bankCardNumber }}</div>
        </div>
        <div class="li">
          <div class="label">持卡人</div>
          <div class="value">{{ info.cardholder }}</div>
        </div>
        <div class="li">
          <div class="label">申请时间</div>
          <div class="value">{{ info.applyTime }}</div>
        </div>
        <div class="li">
          <div class="label">提现状态</div>
          <div class="value">{{ getWithdrawalsStatus(info.status) }}</div>
        </div>
        <div class="li">
          <div class="label">审核状态</div>
          <div class="value">{{ getAuthStatus(info.auditStatus) }}</div>
        </div>
        <div class="li">
          <div class="label">审核时间</div>
          <div class="value">{{ info.auditTime || "-" }}</div>
        </div>
        <div class="li">
          <div class="label">审核失败原因</div>
          <div class="value">{{ info.auditReason || "-" }}</div>
        </div>
        <div class="li">
          <div class="label">打款时间</div>
          <div class="value">{{ info.paymentTime || "-" }}</div>
        </div>
        <div class="li">
          <div class="label">作废时间</div>
          <div class="value">{{ info.abolishTime || "-" }}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="isEdit ? '编辑' : '添加'" :visible.sync="dialogVisible">
      <el-form :model="info" ref="infoForm" label-width="120px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="info.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="info.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="info.gender">
            <el-radio :label="0">未知</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input v-model="info.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日：">
          <el-date-picker v-model="info.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="称号：">
          <el-input v-model="info.memberLevelName" readonly></el-input>
        </el-form-item>
        <el-form-item label="成就：">
          <el-input v-model="info.memberHonorLevelName" readonly></el-input>
        </el-form-item>
        <el-form-item label="网体编号：">
          <el-input v-model="info.teamNumber" readonly></el-input>
        </el-form-item> <el-form-item label="爱心值：">
          <el-input v-model="info.integral" readonly></el-input>
        </el-form-item>
        <el-form-item label="贡献值：">
          <el-input v-model="info.money" readonly></el-input>
        </el-form-item>
        <el-form-item label="人脉值：">
          <el-input v-model="info.networkValue" readonly></el-input>
        </el-form-item>
        <el-form-item label="团队值：">
          <el-input v-model="info.teamValue" readonly></el-input>
        </el-form-item>
        <el-form-item label="已购买爱心：">
          <el-radio-group v-model="info.isBuySpecific" readonly>
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="info.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'审核'" :visible.sync="dialogAuthVisible">
      <el-form :model="info" ref="infoForm" label-width="120px" size="small">
        <el-form-item label="审核状态：">
          <el-radio-group v-model="info.auditStatus">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驳回原因：" class="row">
          <el-input v-model="info.auditReason" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogAuthConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { listInfo, addInfo, setInfo, setStatus, delInfo, authSuccess, authReject, paySuccess, authAbolish } from '@/api/withdrawals';
import { formatDate } from '@/utils/date';
import { enumWithdrawalsStatus, enumMoneyType, enumAuthStatus } from "@/utils/enums";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  number: undefined,
  username: undefined,
  realName: undefined,
  type:undefined,
  applyTime: [],
  applyTimeStart: undefined,
  applyTimeEnd: undefined,
  moneyStart: undefined,
  moneyEnd: undefined,
};
const defaultInfo = {
  id: null,
};
export default {
  name: 'withdrawalsList',
  data() {
    return {
      enumMoneyType,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      info: Object.assign({}, defaultInfo),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocMemberId: null,
      dialogAuthVisible: false,
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
    getMoneyType(value) {
      value = value + "";
      const obj = enumMoneyType.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    getWithdrawalsStatus(value) {
      value = value + "";
      const obj = enumWithdrawalsStatus.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    getAuthStatus(value) {
      value = value + "";
      const obj = enumAuthStatus.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
      console.log(q.applyTime);
      if (q.applyTime.length) {
        q.applyTimeStart = q.applyTime[0];
        q.applyTimeEnd = q.applyTime[1];
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
      this.dialogVisible = true;
      this.isEdit = false;
      this.info = Object.assign({}, defaultInfo);
    },
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setStatus(row.id, { status: row.status }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
        this.getList();
      });
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delInfo(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleDetail(index, row) {
      this.dialogDetailVisible = true;
      this.info = Object.assign({}, row);
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.info = Object.assign({}, row);
    },
    handleAuth(index, row) {
      this.dialogAuthVisible = true;
      this.info = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          setInfo(this.info.id, this.info).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          addInfo(this.info).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        }
      })
    },
    handleDialogAuthConfirm() {
      const me = this;
      if (!me.info.auditStatus) {
        me.$message({
          message: '请选择审核状态',
          type: 'warning'
        });
        return;
      }
      if (me.info.auditStatus === 1) {
        me.setAuthSuccess();
      } else if (me.info.auditStatus === 2) {
        me.setAuthReject();
      }
    },
    getList() {
      this.listLoading = true;
      listInfo(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    setAuthSuccess() {
      const me = this;
      me.$confirm('确认要审核通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        authSuccess(me.info).then(response => {
          me.$message({
            message: '审核通过',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        })
      })
    },
    setAuthReject() {
      const me = this;
      if (!me.info.auditReason) {
        me.$message({
          message: '请填写驳回原因',
          type: 'warning'
        });
        return;
      }
      me.$confirm('确认要驳回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        authReject(me.info).then(response => {
          me.$message({
            message: '驳回完成',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        })
      })
    },
    setPaySuccess(row) {
      const me = this;
      me.$confirm('确认已打款吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        paySuccess(row).then(response => {
          me.$message({
            message: '已打款完成',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        })
      })
    },
    setAuthAbolish(row) {
      const me = this;
      me.$confirm('确认要作废吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        authAbolish(row).then(response => {
          me.$message({
            message: '已作废完成',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        })
      })
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
  margin: 0;
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
</style>


