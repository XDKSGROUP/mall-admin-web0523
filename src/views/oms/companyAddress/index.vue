<template>
  <div class="app-container">
    <el-card v-show="false" class="filter-container" shadow="never">
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
          <el-form-item label="类型：">
            <el-radio-group v-model="listQuery.type">
              <el-radio v-for="(it, at) in enumNotice" :key="at" :label="parseInt(it.value)">{{ it.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="创建日期：">
            <el-date-picker size="mini" v-model="listQuery.publishTime" type="daterange" range-separator="至"
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
        <el-table-column label="标题" width="200" align="center">
          <template slot-scope="scope">
            <div style="text-align: left;">{{ scope.row.addressName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="收发货人姓名" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="收货人电话" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="省/直辖市" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.province }}</template>
        </el-table-column>
        <el-table-column label="市" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column label="区" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.region }}</template>
        </el-table-column>
        <el-table-column label="详细地址" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.detailAddress }}</template>
        </el-table-column>
        <el-table-column label="默认发货地址" width="120" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleSendStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0"
              v-model="scope.row.sendStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="默认收货地址" width="120" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleReceiveStatusChange(scope.$index, scope.row)" :active-value="1" :inactive-value="0"
              v-model="scope.row.receiveStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="false" size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">
              详细
            </el-button>
            <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button v-if="scope.row.status === 0" size="mini" type="text" @click="handleAuth(scope.$index, scope.row)">
              审核
            </el-button>
            <el-button v-show="false" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogDetailVisible">
      <div class="detail">
        <div class="li">
          <div class="label">项目名称</div>
          <div class="value">{{ info.name }}</div>
        </div>
        <div class="li">
          <div class="label">类别</div>
          <div class="value">{{ info.categoryName }}</div>
        </div>
        <div class="li">
          <div class="label">资金类型</div>
          <div class="value">{{ info.type }}</div>
        </div>
        <div class="li">
          <div class="label">主图</div>
          <div class="value"><el-image style="width: 80px; height: 80px" :src="info.pic" fit="contain"></el-image></div>
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
          <div class="value">{{ info.status }}</div>
        </div>
        <div class="li">
          <div class="label">审核状态</div>
          <div class="value">{{ info.auditStatus }}</div>
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
      <el-form :model="info" ref="infoForm" :rules="infoRules" label-width="120px" size="small">
        <el-form-item prop="addressName" label="标题：">
          <el-input v-model="info.addressName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="收发货人姓名：">
          <el-input v-model="info.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="收货人电话：">
          <el-input v-model="info.phone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="province" label="省/直辖市：">
          <el-input v-model="info.province" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="city" label="市：">
          <el-input v-model="info.city" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="region" label="区：">
          <el-input v-model="info.region" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="detailAddress" label="详细地址：">
          <el-input v-model="info.detailAddress" placeholder="请输入"></el-input>
        </el-form-item>
        
        <el-form-item prop="sendStatus" label="默认发货地址：">
          <el-radio-group v-model="info.sendStatus">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="receiveStatus" label="默认收货地址：">
          <el-radio-group v-model="info.receiveStatus">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>

        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'审核'" :visible.sync="dialogAuthVisible">
      <el-form :model="info" ref="autoForm" label-width="120px" size="small">
        <el-form-item prop="name" label="审核状态：">
          <el-radio-group v-model="info.auditStatus">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="name" label="驳回原因：" class="row">
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
import { listInfo, addInfo, setInfo,setSendStatus,setReceiveStatus } from '@/api/companyAddress';
import { formatDate } from '@/utils/date';
import { enumNotice } from "@/utils/enums";
import SingleUpload from '@/components/Upload/singleUpload';
import Tinymce from '@/components/Tinymce';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  title: undefined,
  type: undefined,
  intro: undefined,
  publishTime: [],
  publishTimeStart: undefined,
  publishTimeEnd: undefined,
};
const defaultInfo = {
  id: 0,
  type: "",
  title: "",
  intro: "",
  contents: "",
};
export default {
  name: 'projectList',
  components: { SingleUpload, Tinymce },
  data() {
    return {
      enumNotice,
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
        addressName: [
          { required: true, message: "请输入地址名称", trigger: 'change' }
        ],
        name: [
          { required: true, message: "请输入收发货人姓名", trigger: 'change' }
        ],
        phone: [
          { required: true, message: "请输入收货人电话", trigger: 'change' }
        ],
        province: [
          { required: true, message: "请输入省/直辖市", trigger: 'change' }
        ],
        city: [
          { required: true, message: "请输入市", trigger: 'change' }
        ],
        region: [
          { required: true, message: "请输入区", trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: "请输入详细地址", trigger: 'change' }
        ],
        sendStatus: [
          { required: true, message: "请选择默认发货地址", trigger: 'change' }
        ],
        receiveStatus: [
          { required: true, message: "请选择默认收货地址", trigger: 'change' }
        ],
      },
      isEdit: false,
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
    getNoticeType(value) {
      value = value + "";
      const obj = enumNotice.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    getProjectProgressStatus(value) {
      value = value + "";
      const obj = enumProjectProgressStatus.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
      if (q.publishTime.length) {
        q.publishTimeStart = q.publishTime[0];
        q.publishTimeEnd = q.publishTime[1];
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
      this.$confirm('是否要删除该公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append('ids', [row.id]);
        params.append('deleteStatus', 1);
        delInfo(params).then(response => {
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
      const me = this;
      me.dialogVisible = true;
      me.isEdit = true;
      me.info = Object.assign({}, row);
      me.$nextTick(() => {
        me.$refs.infoForm && me.$refs.infoForm.clearValidate();
      })
    },
    handleAuth(index, row) {
      this.dialogAuthVisible = true;
      this.info = Object.assign({}, row);
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
    handleSendStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateSendStatus(row.sendStatus, ids);
    },
    handleReceiveStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateReceiveStatus(row.receiveStatus, ids);
    },
    getList() {
      this.listLoading = true;
      listInfo(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.data.total;
      });
    },
    updateSendStatus(sendStatus, ids) {
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('sendStatus', sendStatus);
      setSendStatus(params).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    updateReceiveStatus(receiveStatus, ids) {
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('receiveStatus', receiveStatus);
      setReceiveStatus(params).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
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
</style>


