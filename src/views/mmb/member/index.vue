<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
          查询搜索
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>
      <div class="search">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="用户名：">
            <el-input v-model="listQuery.username" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input v-model="listQuery.nickname" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="listQuery.realName" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="邀请人用户名：">
            <el-input v-model="listQuery.inviterUsername" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建日期：">
            <el-date-picker size="mini" v-model="listQuery.createTime" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
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
      <el-table ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="帐号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="昵称" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="称号" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.memberLevelName }}</template>
        </el-table-column>
        <el-table-column label="爱心产品" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.isBuySpecific == 1 ? "已购" : "未购" }}</template>
        </el-table-column>
        <el-table-column label="成就" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.memberHonorLevelName }}</template>
        </el-table-column>
        <el-table-column label="手机" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="爱心值" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.integral }}</template>
        </el-table-column>
        <el-table-column label="贡献值" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="人脉值" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.networkValue }}</template>
        </el-table-column>
        <el-table-column label="团队值" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.teamValue }}</template>
        </el-table-column>
        <el-table-column label="实名认证" width="120" align="center">
          <template slot-scope="scope">{{ getAuthStatus(scope.row.realNameStatus) }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="100" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button v-if="scope.row.realNameStatus === 1" size="mini" type="text"
              @click="handleAuth(scope.$index, scope.row)">
              审核
            </el-button>
            <el-button size="mini" type="text" @click="handelResetLoginPassword(scope.row)">
              重置登录密码
            </el-button>
            <el-button size="mini" type="text" @click="handelResetPaymentPassword(scope.row)">
              重置支付密码
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="handleSelectRole(scope.$index, scope.row)">分配角色
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
        :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15, 20]" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="isEdit ? '编辑' : '添加'" :visible.sync="dialogVisible">
      <el-form :model="member" ref="memberForm" label-width="120px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="member.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="member.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="member.gender">
            <el-radio :label="0">未知</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input v-model="member.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日：">
          <el-date-picker v-model="member.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="称号：">
          <el-input v-model="member.memberLevelName" disabled></el-input>
        </el-form-item>
        <el-form-item label="成就：">
          <el-input v-model="member.memberHonorLevelName" disabled></el-input>
        </el-form-item>
        <el-form-item label="网体编号：">
          <el-input v-model="member.teamNumber" disabled></el-input>
        </el-form-item> <el-form-item label="爱心值：">
          <el-input v-model="member.integral" disabled></el-input>
        </el-form-item>
        <el-form-item label="贡献值：">
          <el-input v-model="member.money" disabled></el-input>
        </el-form-item>
        <el-form-item label="人脉值：">
          <el-input v-model="member.networkValue" disabled></el-input>
        </el-form-item>
        <el-form-item label="团队值：">
          <el-input v-model="member.teamValue" disabled></el-input>
        </el-form-item>
        <el-form-item label="已购买爱心：">
          <el-radio-group v-model="member.isBuySpecific" disabled>
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="member.status">
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
      <el-form :model="member" ref="memberForm" label-width="120px" size="small">
        <el-form-item label="真实姓名：">
          <el-input v-model="member.realName" readonly></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：">
          <el-input v-model="member.identificationNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="申请时间：">
          <el-input v-model="member.certificationApplyTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-radio-group v-model="member.realNameStatus">
            <el-radio :label="2">驳回</el-radio>
            <el-radio :label="3">通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证正面：">
          <el-image style="width: 100%; height: 100px" :src="member.idCardFront" fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="身份证反面：">
          <el-image style="width: 100%; height: 100px" :src="member.idCardBack" fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="驳回原因：" class="row">
          <el-input v-model="member.certificationRejectReason" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogAuthConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="allocDialogVisible" width="30%">
      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
        <el-option v-for="item in allRoleList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { listInfo, addInfo, setInfo, setStatus, delInfo, getRoleByMember, setRole, resetLoginPassword, resetPaymentPassword } from '@/api/member';
import { listAll } from '@/api/mmbRole';
import { formatDate } from '@/utils/date';
import { enumMemberAuthStatus } from "@/utils/enums";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  username: undefined,
  nickname: undefined,
  phone: undefined,
  realName: undefined,
  inviterUsername: undefined,
  createTime: [],
};
const defaultMember = {
  id: null,
  username: null,
  nickname: null,
  status: 1
};
export default {
  name: 'memberList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      member: Object.assign({}, defaultMember),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocMemberId: null,
      dialogAuthVisible: false,
    }
  },
  created() {
    this.getList();
    this.getAllRoleList();
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
    getAuthStatus(value) {
      value = value + "";
      const obj = enumMemberAuthStatus.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
      if (q.createTime.length) {
        q.createTimeStart = q.createTime[0];
        q.createTimeEnd = q.createTime[1];
      }
      this.getList();
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
      this.member = Object.assign({}, defaultMember);
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
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.member = Object.assign({}, row);
    },
    handleAuth(index, row) {
      this.dialogAuthVisible = true;
      this.member = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          setInfo(this.member.id, this.member).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          addInfo(this.member).then(response => {
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
      if (me.member.realNameStatus === 2 && !me.member.certificationRejectReason) {
        me.$message({
          message: '请填写驳回原因',
          type: 'warning'
        });
        return;
      }

      me.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setInfo(me.member.id, me.member).then(response => {
          me.$message({
            message: '审核成功！',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        });
      })
    },
    handleAllocDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", this.allocMemberId);
        params.append("roleIds", this.allocRoleIds);
        setRole(params).then(response => {
          this.$message({
            message: '分配成功！',
            type: 'success'
          });
          this.allocDialogVisible = false;
        })
      })
    },
    handleSelectRole(index, row) {
      this.allocMemberId = row.id;
      this.allocDialogVisible = true;
      this.getRoleListByMember(row.id);
    },
    getList() {
      this.listLoading = true;
      listInfo(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    getAllRoleList() {
      listAll().then(response => {
        this.allRoleList = response.data;
      });
    },
    getRoleListByMember(memberId) {
      getRoleByMember(memberId).then(response => {
        let allocRoleList = response.data;
        this.allocRoleIds = [];
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].id);
          }
        }
      });
    },
    handelResetLoginPassword(info) {
      const me=this;
      me.$confirm('确定要重置登录密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetLoginPassword(info).then(res => {
          this.$message({
            message: '重置完成！',
            type: 'success'
          });
          this.allocDialogVisible = false;
        });
      })
    },
    handelResetPaymentPassword(info) {
      const me=this;
      me.$confirm('确定要重置支付密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPaymentPassword(info).then(res => {
          this.$message({
            message: '重置完成！',
            type: 'success'
          });
          this.allocDialogVisible = false;
        });
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

.search {}

>>>.search .el-form-item {
  width: 50%;
  margin: 15px 0 0;
}

.pagination-container {
  padding: 0 0 30px;
}
</style>


