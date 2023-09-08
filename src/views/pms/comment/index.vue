<template>
  <div class="app-container">
    <el-card class="search" shadow="never">
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
        </div>
      </div>
      <div class="cont">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="产品名称">
            <el-input size="mini" v-model="listQuery.productName" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="评价内容">
            <el-input size="mini" v-model="listQuery.content" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="评价星级">
            <el-input size="mini" v-model="listQuery.stars" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="评论类型">
            <el-select v-model="listQuery.type" clearable placeholder="请选择">
              <el-option v-for="item in enumCommentType" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评价日期：">
            <el-date-picker size="mini" v-model="listQuery.createTime" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
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
        <el-button size="mini" @click="setAuthSuccess()" v-if="false" style="margin-left: 10px">批量到帐</el-button>
        <el-button size="mini" @click="handleAuth()" v-if="false" style="margin-left: 10px">批量回复</el-button>
        <el-button size="mini" @click="handleAdd()" v-if="false" style="margin-left: 10px">添加</el-button>
        <el-button size="mini" @click="handleExport()" v-if="false" style="margin-left: 10px">导出</el-button>
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
        <el-table-column label="商品图片" width="100" align="center">
          <template slot-scope="scope">
            <el-image style="width: 80px; height: 80px" :src="scope.row.productPic"
              @click="previewShow(scope.row.productPic)" fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.productName }}</template>
        </el-table-column>
        <el-table-column label="产品规格" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.productAttribute }}</template>
        </el-table-column>
        <el-table-column label="销售价格" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.productPrice }}</template>
        </el-table-column>
        <el-table-column label="优惠后价格" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.realAmount }}</template>
        </el-table-column>
        <el-table-column label="购买数量" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.productQuantity }}</template>
        </el-table-column>
        <el-table-column label="会员头像" width="100" align="center">
          <template slot-scope="scope">
            <el-image style="width: 80px; height: 80px" :src="scope.row.memberIcon"
              @click="previewShow(scope.row.memberIcon)" fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="会员账号" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.memberUsername }}</template>
        </el-table-column>
        <el-table-column label="会员昵称" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.memberNickName }}</template>
        </el-table-column>
        <el-table-column label="评价星级" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.star }}</template>
        </el-table-column>
       <el-table-column label="评论内容" width="500" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column label="评价时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">
              详细
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button v-if="scope.row.status === 0" size="mini" type="text" @click="setAuthSuccess(scope.row)">
              到帐
            </el-button>
            <el-button v-if="scope.row.replayList&&scope.row.replayList.length===0" size="mini" type="text" @click="handleAuth(scope.$index, scope.row)">
              回复
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
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
          <el-col :span="4" class="table-cell-title">产品图片</el-col>
          <el-col :span="4" class="table-cell-title">产品名称</el-col>
          <el-col :span="4" class="table-cell-title">购买规格</el-col>
          <el-col :span="4" class="table-cell-title">销售价格</el-col>
          <el-col :span="4" class="table-cell-title">优惠后金额</el-col>
          <el-col :span="4" class="table-cell-title">购买数量</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell"><img style="height: 80px" :src="info.productPic"></el-col>
          <el-col :span="4" class="table-cell">{{ info.productName }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.productAttribute }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.productPrice }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.realAmount }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.productQuantity }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">会员头像</el-col>
          <el-col :span="4" class="table-cell-title">会员账号</el-col>
          <el-col :span="4" class="table-cell-title">会员昵称</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
          <el-col :span="4" class="table-cell-title">&nbsp;</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell"><img style="height: 80px" :src="info.memberIcon"></el-col>
          <el-col :span="4" class="table-cell">{{ info.memberUsername }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.memberNickName }}</el-col>
          <el-col :span="4" class="table-cell">&nbsp;</el-col>
          <el-col :span="4" class="table-cell">&nbsp;</el-col>
          <el-col :span="4" class="table-cell">&nbsp;</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">评价时间</el-col>
          <el-col :span="4" class="table-cell-title">评价星级</el-col>
          <el-col :span="8" class="table-cell-title">评价内容</el-col>
          <el-col :span="8" class="table-cell-title">评价图片</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.createTime }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.star }}</el-col>
          <el-col :span="8" class="table-cell">{{ info.content }}</el-col>
          <el-col :span="8" class="table-cell"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">追评时间</el-col>
          <el-col :span="4" class="table-cell-title">追评内容</el-col>
          <el-col :span="16" class="table-cell-title">追评图片</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ info.addedTime }}</el-col>
          <el-col :span="4" class="table-cell">{{ info.addedContent }}</el-col>
          <el-col :span="16" class="table-cell">{{ info.addedPics }}</el-col>
          <!-- <el-col :span="12" class="table-cell"><img v-for="item in info.productPic.split(',')" style="width:80px;height:80px;margin-right: 5px;" :src="item" :key="item.id"></el-col> -->
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">回复信息</span>
      </div>
      <div class="table-layout" v-if="info.replayList&&info.replayList.length===0" >
        <el-row>
          <el-col :span="24" class="table-cell">暂无回复</el-col>
        </el-row>
        
      </div>
      <div class="table-layout" v-else v-for="(item, index) in info.replayList" :key="index">
        <el-row>
          <el-col :span="4" class="table-cell-title">回复人类型</el-col>
          <el-col :span="4" class="table-cell-title">回复人头像</el-col>
          <el-col :span="4" class="table-cell-title">回复人昵称</el-col>
          <el-col :span="4" class="table-cell-title">回复时间</el-col>
          <el-col :span="8" class="table-cell-title">回复内容</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ getReplayType(item.type) }}</el-col>
          <el-col :span="4" class="table-cell"><img style="height: 80px" :src="item.memberIcon"></el-col>
          <el-col :span="4" class="table-cell">{{ item.memberNickName }}</el-col>
          <el-col :span="4" class="table-cell">{{ item.createTime }}</el-col>
          <el-col :span="8" class="table-cell">{{ item.content }}</el-col>
        </el-row>
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
            @change="info.categoryId = arguments[0][0]; info.categoryName = category.dic[info.categoryId]"></el-cascader>
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
    <el-dialog :title="'回复'" :visible.sync="dialogAuthVisible">
      <el-form :model="info" ref="autoForm" label-width="120px" size="small">
        <el-form-item prop="name" label="回复内容：" class="row">
          <el-input v-model="info.replayContent" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogAuthConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="预览图片" :visible.sync="preview.isShow" width="90%" style="text-align: center;">
      <img :src="preview.src" style="height:600px;" />
    </el-dialog>
  </div>
</template>
<script>
import { listInfo, replay } from '@/api/productComment';
import { formatDate } from '@/utils/date';
import { enumCommentType, enumReplayType } from "@/utils/enums";
import Tinymce from '@/components/Tinymce';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  productName: undefined,
  username: undefined,
  content: undefined,
  star: [],
  type: undefined,
  createTime: [],
  createTimeStart: undefined,
  createTimeEnd: undefined,
};
const defaultInfo = {
  id: 0,
  introduction: "",
  progressContent: "",
  implementation: "",
  pics: "",
};
export default {
  name: 'projectList',
  components: { Tinymce },
  data() {
    return {
      enumCommentType,
      enumReplayType,
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
      preview: {
        isShow: false,
        src: ""
      },
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
      const obj = enumCommentType.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    getReplayType(value) {
      value = value + "";
      const obj = enumReplayType.find(t => t.value === value);
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
      const me = this;
      me.dialogVisible = true;
      me.isEdit = true;
      me.info = Object.assign({}, row);
      me.$nextTick(() => {
        me.$refs.infoForm && me.$refs.infoForm.clearValidate();
      })
    },
    handleAuth(index, row) {
      this.info = Object.assign({}, row);
      this.dialogAuthVisible = true;
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
      if (!me.info.replayContent) {
        me.$message({
          message: '请填写回复内容',
          type: 'warning'
        });
        return;
      }
      this.setReplay(me.info);
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
    setAuthSuccess(info) {
      const me = this;
      const prms = { id: info ? [info.id] : me.multipleSelection.map(t => t.id) };
      me.$confirm('确认已经到帐了吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        paySuccess(prms).then(response => {
          me.$message({
            message: '充值完成',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        })
      })
    },
    setReplay(info) {
      const me = this;
      me.$confirm('确认要回复吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const prms = Object.assign(info, { commentId: info.id,content:info.replayContent });
        replay(prms).then(response => {
          me.$message({
            message: '回复完成',
            type: 'success'
          });
          me.dialogAuthVisible = false;
          me.getList();
        })
      })
    },
    previewShow(src) {
      this.preview.src = src;
      this.preview.isShow = true;
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


