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
          <el-form-item label="项目名称：">
            <el-input size="mini" v-model="listQuery.name" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建日期：">
            <el-date-picker size="mini" v-model="listQuery.createTime" type="daterange" range-separator="至"
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
    <div class="table-container">
      <el-table ref="infoTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="项目名称" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="类别" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.categoryName }}</template>
        </el-table-column>
        <el-table-column label="展示图" width="100" align="center">
          <template slot-scope="scope"><el-image style="width: 80px; height: 80px" :src="scope.row.pic"
              fit="contain"></el-image></template>
        </el-table-column>
        <el-table-column label="善款接收方" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.donationsReceiver }}</template>
        </el-table-column>
        <el-table-column label="执行机构" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.actuator }}</template>
        </el-table-column>
        <el-table-column label="目标金额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.targetMoney }}</template>
        </el-table-column>
        <el-table-column label="已筹金额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.raisedMoney }}</template>
        </el-table-column>
        <el-table-column label="捐赠份数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.donationsNumber }}</template>
        </el-table-column>
        <el-table-column label="关注人数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.followersNumber }}</template>
        </el-table-column>
        <el-table-column label="进展状态" width="80" align="center">
          <template slot-scope="scope">{{ getProjectProgressStatus(scope.row.progressStatus) }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{ getEnableStatus(scope.row.publishStatus) }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
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
        <el-form-item prop="pic" label="展示图：" class="row">
          <single-upload v-model="info.pic"></single-upload>
        </el-form-item>
        <el-form-item prop="name" label="名称：">
          <el-input v-model="info.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="类别：">
          <el-cascader :value="[info.categoryId]" :options="category.list" :props="{ checkStrictly: true }" clearable
            @change="info.categoryId=arguments[0][0];info.categoryName = category.dic[info.categoryId]"></el-cascader>
        </el-form-item>
        <el-form-item prop="donationsReceiver" label="善款接收方：">
          <el-input v-model="info.donationsReceiver" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="actuator" label="执行机构：">
          <el-input v-model="info.actuator" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="targetMoney" label="目标金额：">
          <el-input-number v-model="info.targetMoney" controls-position="right" :min="1" :max="9999999999"
            placeholder="请输入"></el-input-number>
        </el-form-item>
        <el-form-item prop="raisedMoney" label="已筹金额：">
          <el-input-number v-model="info.raisedMoney" controls-position="right" :min="1" :max="9999999999"
            placeholder="请输入"></el-input-number>
        </el-form-item>
        <el-form-item prop="donationsNumber" label="捐赠份数：">
          <el-input-number v-model="info.donationsNumber" controls-position="right" :step="1" :min="1" :max="9999999999"
            placeholder="请输入"></el-input-number>
        </el-form-item>
        <el-form-item prop="followersNumber" label="关注人数：">
          <el-input-number v-model="info.followersNumber" controls-position="right" :step="1" :min="1" :max="9999999999"
            placeholder="请输入"></el-input-number>
        </el-form-item>
        <el-form-item prop="progressStatus" label="进展状态：">
          <el-radio-group v-model="info.progressStatus">
            <el-radio :label="0">未开始</el-radio>
            <el-radio :label="1">筹款中</el-radio>
            <el-radio :label="2">已结束</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="publishStatus" label="启用状态：">
          <el-radio-group v-model="info.publishStatus">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="releaseTime" label="发布时间：">
          <el-date-picker v-model="info.releaseTime" type="date" placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="textarea" label="简介：" class="row">
          <el-input v-model="info.info" type="textarea" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="项目介绍：" class="row">
          <tinymce :height="300" v-model="info.introduction" placeholder="请输入"></tinymce>
        </el-form-item>
        <el-form-item prop="progressContent" label="进展内容：" class="row">
          <tinymce :height="300" v-model="info.progressContent" placeholder="请输入"></tinymce>
        </el-form-item>
        <el-form-item prop="implementation" label="执行情况：" class="row">
          <tinymce :height="300" v-model="info.implementation" placeholder="请输入"></tinymce>
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
import { listInfo, addInfo, setInfo, setStatus, delInfo, authSuccess, authReject } from '@/api/project';
import { listInfo as classListInfo } from '@/api/projectClass';
import { formatDate } from '@/utils/date';
import { enumProjectProgressStatus, enumEnableStatus } from "@/utils/enums";
import SingleUpload from '@/components/Upload/singleUpload';
import Tinymce from '@/components/Tinymce';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  name: undefined,
  createTime: [],
  createTimeStart: undefined,
  createTimeEnd: undefined,
};
const defaultInfo = {
  id: 0,
  introduction: "",
  progressContent: "",
  implementation: "",
};
export default {
  name: 'projectList',
  components: { SingleUpload, Tinymce },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      category:{
        list:[],//类别列表
        dic:{},//类别字典
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
        pic: [
          { required: true, message: "请上传展示图", trigger: 'change' }
        ],
        donationsReceiver: [
          { required: true, message: "请输入善款接收方", trigger: 'change' }
        ],
        actuator: [
          { required: true, message: "请输入执行机构", trigger: 'change' }
        ],
        targetMoney: [
          { required: true, message: "请输入目标金额", trigger: 'change' }
        ],
        raisedMoney: [
          { required: true, message: "请输入已筹金额", trigger: 'change' }
        ],
        donationsNumber: [
          { required: true, message: "请输入捐赠份数", trigger: 'change' }
        ],
        followersNumber: [
          { required: true, message: "请输入关注人数", trigger: 'change' }
        ],
        progressStatus: [
          { required: true, message: "请输入进展状态", trigger: 'change' }
        ],
        publishStatus: [
          { required: true, message: "请输入启用状态", trigger: 'change' }
        ],
        releaseTime: [
          { required: true, message: "请输入发布时间", trigger: 'change' }
        ],
        info: [
          { required: true, message: "请输入简介", trigger: 'change' }
        ],
        introduction: [
          { required: true, message: "请输入项目介绍", trigger: 'change' }
        ],
        progressContent: [
          { required: true, message: "请输入进展内容", trigger: 'change' }
        ],
        implementation: [
          { required: true, message: "请输入执行情况", trigger: 'change' }
        ],
        introduction: [
          { required: true, message: "请输入项目介绍", trigger: 'change' }
        ],
      },
      isEdit: false,
      dialogAuthVisible: false,
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
      const me = this,
        rst = await classListInfo();
      if (!rst.data) return;
      const get = (lst) => {
        return lst.map(o => {
          me.category.dic[o.id] = o.name;
          return {
            label: o.name,
            value: o.id,
            children: o.children ? get(o.children) : undefined
          }
        });
      };
      me.category.list.push(...get(rst.data));
    },
    getEnableStatus(value) {
      value = value + "";
      const obj = enumEnableStatus.find(t => t.value === value);
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
      if (q.createTime.length) {
        q.createTimeStart = q.createTime[0];
        q.createTimeEnd = q.createTime[1];
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
      const me=this;
      me.dialogVisible = true;
      me.isEdit = false;
      me.info = Object.assign({}, defaultInfo);
      me.$nextTick(()=>{
        me.$refs.infoForm&&me.$refs.infoForm.clearValidate();
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
      const me=this;
      me.dialogVisible = true;
      me.isEdit = true;
      me.info = Object.assign({}, row);
      me.$nextTick(()=>{
        me.$refs.infoForm&&me.$refs.infoForm.clearValidate();
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
        info.releaseTime = formatDate(new Date(info.releaseTime), 'yyyy-MM-dd hh:mm:ss');
        me.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (me.isEdit) {
            setInfo(info.id, info).then(response => {
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


