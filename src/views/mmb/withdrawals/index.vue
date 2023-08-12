<template>
  <div class="app-container">
    <el-card class="search" shadow="never" :class="isShowSearchAll ? '' : 'hide'">
      <div class="title">
        <div class="l">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div class="r">
          <el-button style="" type="primary" @click="handleSearchList()" size="small">
            查询搜索
          </el-button>
          <el-button style="" @click="handleResetSearch()" size="small">
            重置
          </el-button>
          <el-button style="" @click="isShowSearchAll = !isShowSearchAll" size="small">
            {{ isShowSearchAll ? "收缩" : "全部" }}
          </el-button>
        </div>
      </div>
      <div class="cont">
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
            <el-input-number size="mini" v-model="listQuery.moneyStart" placeholder="开始数量" controls-position="right"
              style="width:120px;"></el-input-number>
            <el-input-number size="mini" v-model="listQuery.moneyEnd" placeholder="结束数量" controls-position="right"
              style="width:120px;"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <div class="title">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
      </div>
      <div class="cont">
        <el-button size="mini" @click="handleAuth()" style="margin-left: 10px">批量审核</el-button>
        <el-button size="mini" @click="setPaySuccess()" style="margin-left: 10px">批量打款</el-button>
        <el-button size="mini" @click="handleAdd()" v-if="false" style="margin-left: 10px">添加</el-button>
        <el-button size="mini" @click="handleExport()" style="margin-left: 10px">导出</el-button>
      </div>
    </el-card>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15, 20, 50, 100]" :total="total">
      </el-pagination>
    </div>
    <div class="table-container">
      <el-table ref="infoTable" :data="list" style="width: 100%;" v-loading="listLoading" border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="帐号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="真实姓名" width="120" align="center">
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
          <el-col :span="4" class="table-cell-title">提现编号</el-col>
          <el-col :span="4" class="table-cell-title">会员账号</el-col>
          <el-col :span="4" class="table-cell-title">真实姓名</el-col>
          <el-col :span="4" class="table-cell-title">资金类型</el-col>
          <el-col :span="4" class="table-cell-title">申请时间</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.number }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.username }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.realName }}</el-col>
          <el-col :span="4" class="table-cell">{{ getMoneyType(info.type) }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.applyTime }}</el-col>
          <el-col :span="4" class="table-cell"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">提现银行名称</el-col>
          <el-col :span="4" class="table-cell-title">提现支行名称</el-col>
          <el-col :span="4" class="table-cell-title">提现银行卡号</el-col>
          <el-col :span="4" class="table-cell-title">持卡人</el-col>
          <el-col :span="8" class="table-cell-title">备注</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.bankName }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.branchName }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.bankCardNumber }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.cardholder }}</el-col>
          <el-col :span="8" class="table-cell">{{ info.remark || "-" }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">提现状态</el-col>
          <el-col :span="4" class="table-cell-title">申请金额</el-col>
          <el-col :span="4" class="table-cell-title">实际金额</el-col>
          <el-col :span="4" class="table-cell-title">手续费</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ getWithdrawalsStatus(info.status) }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.applyMoney }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.actualMoney }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.handlingFee }}</el-col>
          <el-col :span="4" class="table-cell"></el-col>
          <el-col :span="4" class="table-cell"></el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">审核信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">审核状态</el-col>
          <el-col :span="4" class="table-cell-title">审核人账号</el-col>
          <el-col :span="4" class="table-cell-title">审核人昵称</el-col>
          <el-col :span="4" class="table-cell-title">审核时间</el-col>
          <el-col :span="8" class="table-cell-title">审核失败原因</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ getAuthStatus(info.auditStatus) }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.auditorUsername || "-" }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.auditorNickName || "-" }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.auditTime || "-" }}</el-col>
          <el-col :span="8" class="table-cell">{{ info.auditReason || "-" }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">打款信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">打款人账号</el-col>
          <el-col :span="4" class="table-cell-title">打款人昵称</el-col>
          <el-col :span="4" class="table-cell-title">打款时间</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.paymenterUsername || "-" }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.paymenterNickName || "-" }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.paymentTime || "-" }}</el-col>
          <el-col :span="4" class="table-cell"></el-col>
          <el-col :span="4" class="table-cell"></el-col>
          <el-col :span="4" class="table-cell"></el-col>
        </el-row>
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
import { listInfo, addInfo, setInfo, setStatus, delInfo, authSuccess, authReject, paySuccess, authAbolish, exportExcel } from '@/api/withdrawals';
import { formatDate } from '@/utils/date';
import { enumWithdrawalsStatus, enumMoneyType, enumAuthStatus } from "@/utils/enums";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  number: undefined,
  username: undefined,
  realName: undefined,
  type: undefined,
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
      isShowSearchAll: false,
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
      multipleSelection: [],
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
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
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
    handleExport() {
      const me = this, q = me.listQuery;
      exportExcel(q);
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
        const prms = { id: me.info.id ? [me.info.id] : me.multipleSelection.map(t => t.id) };
        authSuccess(prms).then(response => {
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
        const prms =Object.assign(me.info, { id: me.info.id ? [me.info.id] : me.multipleSelection.map(t => t.id) });
        authReject(prms).then(response => {
          me.$message({
            message: '驳回完成',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        })
      })
    },
    setPaySuccess(info) {
      const me = this;
      me.$confirm('确认已打款吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
        const prms =Object.assign(info||{}, { id: info&&info.id ? [info.id] : me.multipleSelection.map(t => t.id) });
        paySuccess(prms).then(response => {
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
}

.row {
  width: 100%;
}

.search {
  height: auto;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
}

.search.hide {
  height: 118px;
}

.search .title {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.search>>>.el-form-item {
  width: 400px;
  margin: 15px 0 0;
}

.search>>>.el-date-editor {
  width: 250px;
  padding: 3px 5px;
}

.search>>>.el-range-separator {
  width: 20px !important;
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


