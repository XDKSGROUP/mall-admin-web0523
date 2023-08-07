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
            <el-input v-model="listQuery.id" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="帐号：">
            <el-input v-model="listQuery.username" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="邀请人帐号：">
            <el-input v-model="listQuery.inviterUsername" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="随机ID：">
            <el-input v-model="listQuery.teamNumber" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="团队ID：">
            <el-input v-model="listQuery.commonTeamNumber" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="称号：">
            <el-select v-model="listQuery.memberLevelId" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumMemberTitle" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位：">
            <el-select v-model="listQuery.manageLevelId" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumMemberMTitle" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="购买爱心：">
            <el-select v-model="listQuery.isBuySpecific" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumYesNo" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="listQuery.realName" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item label="实名认证：">
            <el-select v-model="listQuery.realNameStatus" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumMemberRealAuthStatus" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成就：">
            <el-select v-model="listQuery.realNameStatus" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumMemberRealAuthStatus" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="爱心值：">
            <el-input-number size="mini" v-model="listQuery.integralStart" placeholder="起始值" clearable
              style="width:120px;"></el-input-number>
            <el-input-number size="mini" v-model="listQuery.integralEnd" placeholder="结束值" clearable
              style="width:120px;"></el-input-number>
          </el-form-item>
          <el-form-item label="贡献值：">
            <el-input-number size="mini" v-model="listQuery.moneyStart" placeholder="起始值" clearable
              style="width:120px;"></el-input-number>
            <el-input-number size="mini" v-model="listQuery.moneyEnd" placeholder="结束值" clearable
              style="width:120px;"></el-input-number>
          </el-form-item>
          <el-form-item label="团队值：">
            <el-input-number size="mini" v-model="listQuery.teamValueStart" placeholder="起始值" clearable
              style="width:120px;"></el-input-number>
            <el-input-number size="mini" v-model="listQuery.teamValueEnd" placeholder="结束值" clearable
              style="width:120px;"></el-input-number>
          </el-form-item>
          <el-form-item label="积分：">
            <el-input-number size="mini" v-model="listQuery.integrationStart" placeholder="起始值" clearable
              style="width:120px;"></el-input-number>
            <el-input-number size="mini" v-model="listQuery.integrationEnd" placeholder="结束值" clearable
              style="width:120px;"></el-input-number>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumEnableStatus" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建日期：">
            <el-date-picker v-model="listQuery.createTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input v-model="listQuery.nickname" class="input-width" placeholder="请输入" clearable></el-input>
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
      <el-table ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="随机ID/团队ID" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.teamNumber }} / {{ scope.row.commonTeamNumber }}</template>
        </el-table-column>
        <el-table-column label="帐号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="昵称/姓名" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }} / {{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="称号" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.memberLevelName }}</template>
        </el-table-column>
        <el-table-column label="岗位" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.manageLevelName }}</template>
        </el-table-column>
        <el-table-column label="成就" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.memberHonorLevelName }}</template>
        </el-table-column>
        <el-table-column label="邀请人帐号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.inviterUsername }}</template>
        </el-table-column>
        <el-table-column label="爱心值" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.integral }}</template>
        </el-table-column>
        <el-table-column label="贡献值" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="人脉值" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.networkValue }}</template>
        </el-table-column>
        <el-table-column label="团队值" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.teamValue }}</template>
        </el-table-column>
        <el-table-column label="荣誉值" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.memberHonorLevelValue }}</template>
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
        <el-table-column label="积分" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.integration }}</template>
        </el-table-column>
        <el-table-column label="手机" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="爱心产品" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.isBuySpecific == 1 ? "已购" : "未购" }}</template>
        </el-table-column>
        <el-table-column label="实名认证" width="120" align="center">
          <template slot-scope="scope">{{ getAuthStatus(scope.row.realNameStatus) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">
              信息详细
            </el-button>
            <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">
              信息编辑
            </el-button>
            <el-button size="mini" type="text" @click="handleUpdateProperty(scope.$index, scope.row)">
              资产编辑
            </el-button>
            <el-button v-if="scope.row.realNameStatus === 1" size="mini" type="text"
              @click="handleAuth(scope.$index, scope.row)">
              实名审核
            </el-button>
            <el-button size="mini" type="text" @click="handelResetLoginPassword(scope.row)">
              登录重置
            </el-button>
            <el-button size="mini" type="text" @click="handelResetPaymentPassword(scope.row)">
              支付重置
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="handleSelectRole(scope.$index, scope.row)">分配角色
            </el-button>
            <el-button v-if="false" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="isEdit ? '编辑' : '添加'" :visible.sync="dialogVisible">
      <el-form :model="member" ref="memberForm" label-width="120px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="member.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="member.nickname"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="member.realName" :disabled="isProd"></el-input>
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="member.identificationNumber" :disabled="isProd"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="member.gender">
            <el-radio v-for="(item, index) in enumGender" :key="index" :label="parseInt(item.value)">{{ item.name
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input v-model="member.phone"></el-input>
        </el-form-item>
        <el-form-item label="生日：">
          <LDate v-model="member.birthday" type="date" :isUpdate="dialogVisible" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></LDate>
        </el-form-item>
        <el-form-item label="推荐人：">
          <el-input v-model="member.inviterUsername" disabled></el-input>
        </el-form-item>
        <el-form-item label="称号：">
          <el-select v-model="member.memberLevelId" placeholder="请选择" clearable :disabled="isProd"
            @change="setIdName(member, 'memberLevelName', enumMemberTitle, arguments[0])">
            <el-option v-for="(item, index) in enumMemberTitle" :key="index" :label="item.name"
              :value="parseInt(item.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站长：">
          <el-select v-model="member.manageLevelId" placeholder="请选择" clearable :disabled="isProd"
            @change="setIdName(member, 'manageLevelName', enumMemberMTitle, arguments[0])">
            <el-option v-for="(item, index) in enumMemberMTitle" :key="index" :label="item.name"
              :value="parseInt(item.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成就：">
          <el-select v-model="member.memberHonorLevelId" placeholder="请选择" clearable :disabled="isProd"
            @change="setIdName(member, 'memberHonorLevelName', enumMemberLevel, arguments[0])">
            <el-option v-for="(item, index) in enumMemberLevel" :key="index" :label="item.name"
              :value="parseInt(item.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随机编号：">
          <el-input v-model="member.teamNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="团队编号：">
          <el-input v-model="member.commonTeamNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="爱心值：">
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
        <el-form-item label="荣誉值：">
          <el-input v-model="member.memberHonorLevelValue" disabled></el-input>
        </el-form-item>
        <el-form-item label="已购买爱心：">
          <el-radio-group v-model="member.isBuySpecific" :disabled="isProd">
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
    <el-dialog :title="'详细'" :visible.sync="dialogDetailVisible">
      <div class="detail">
        <div class="li">
          <div class="f">帐号：</div>
          <div class="v">{{ member.username }}</div>
        </div>
        <div class="li">
          <div class="f">昵称：</div>
          <div class="v">{{ member.nickname }}</div>
        </div>
        <div class="li">
          <div class="f">性别：</div>
          <div class="v">{{ member.gender == 0 ? "未知" : member.gender == 1 ? "男" : "女" }}</div>
        </div>
        <div class="li">
          <div class="f">手机：</div>
          <div class="v">{{ member.phone }}</div>
        </div>
        <div class="li">
          <div class="f">生日：</div>
          <div class="v">{{ member.birthday }}</div>
        </div>
        <div class="li">
          <div class="f">称号：</div>
          <div class="v">{{ member.memberLevelName }}</div>
        </div>
        <div class="li">
          <div class="f">成就：</div>
          <div class="v">{{ member.memberHonorLevelName }}</div>
        </div>
        <div class="li">
          <div class="f">帐号Id：</div>
          <div class="v">{{ member.id }}</div>
        </div>
        <div class="li">
          <div class="f">网体Id：</div>
          <div class="v">{{ member.teamNumber }}</div>
        </div>
        <div class="li">
          <div class="f">公网Id：</div>
          <div class="v">{{ member.commonTeamNumber }}</div>
        </div>
        <div class="li">
          <div class="f">推荐人：</div>
          <div class="v">{{ member.inviterUsername }}</div>
        </div>
        <div class="li">
          <div class="f">积分：</div>
          <div class="v">{{ member.integration }}</div>
        </div>
        <div class="li">
          <div class="f">爱心值：</div>
          <div class="v">{{ member.integral }}</div>
        </div>
        <div class="li">
          <div class="f">贡献值：</div>
          <div class="v">{{ member.money }}</div>
        </div>
        <div class="li">
          <div class="f">人脉值：</div>
          <div class="v">{{ member.networkValue }}</div>
        </div>
        <div class="li">
          <div class="f">团队值：</div>
          <div class="v">{{ member.teamValue }}</div>
        </div>
        <div class="li">
          <div class="f">已购买爱心：</div>
          <div class="v">{{ member.isBuySpecific ? "是" : "否" }}</div>
        </div>
        <div class="li">
          <div class="f">是否启用：</div>
          <div class="v">{{ member.status ? "是" : "否" }}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false" size="small">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'编辑会员资产'" :visible.sync="dialogPropertyVisible">
      <el-form :model="property" ref="memberForm" label-width="120px" size="small">
        <el-form-item label="资产：">
          <el-radio-group v-model="property.type">
            <el-radio :label="0">爱心值</el-radio>
            <el-radio :label="1">贡献值</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="操作：">
          <el-radio-group v-model="property.changeType">
            <el-radio :label="0">增加</el-radio>
            <el-radio :label="1">扣减</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="变动金额：">
          <el-input v-model="property.changeMoney" placeholder="请输入变动金额"></el-input>
        </el-form-item>

        <el-form-item label="原因：">
          <el-input v-model="property.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPropertyVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handlePropertyDialogConfirm()" size="small">确 定</el-button>
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
          <el-image style="width: 100%; height: 100px" :src="member.idCardFront" fit="contain"
            @click="previewShow(member.idCardFront)"></el-image>
        </el-form-item>
        <el-form-item label="身份证反面：">
          <el-image style="width: 100%; height: 100px" :src="member.idCardBack" fit="contain"
            @click="previewShow(member.idCardBack)"></el-image>
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
    <el-dialog title="预览图片" :visible.sync="preview.isShow" width="90%" style="text-align: center;">
      <img :src="preview.src" style="height:600px;" />
    </el-dialog>
  </div>
</template>
<script>
import { listInfo, addInfo, setInfo, setStatus, delInfo, getRoleByMember, setRole, resetLoginPassword, resetPaymentPassword, updateProperty, exportExcel } from '@/api/member';
import { listAll } from '@/api/mmbRole';
import { formatDate, str2Date } from '@/utils/date';
import { setIdName, enumMemberRealAuthStatus, enumMemberTitle, enumGender, enumMemberMTitle, enumMemberLevel, enumYesNo, enumEnableStatus } from "@/utils/enums";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  username: undefined,
  nickname: undefined,
  phone: undefined,
  realName: undefined,
  realNameStatus: undefined,
  inviterUsername: undefined,
  memberLevelId: undefined,
  manageLevelId: undefined,
  isBuySpecific: undefined,
  createTime: [],
};
const defaultProperty = {
  id: null,
  type: null,
  changeType: null,
  changeMoney: 1,
  content: null
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
      enumEnableStatus,
      enumYesNo,
      enumMemberTitle,
      enumGender,
      enumMemberMTitle,
      enumMemberLevel,
      enumMemberRealAuthStatus,
      isShowSearchAll: false,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      member: Object.assign({}, defaultMember),
      property: Object.assign({}, defaultProperty),
      isProd: false,
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocMemberId: null,
      dialogAuthVisible: false,
      dialogPropertyVisible: false,
      dialogDetailVisible: false,
      preview: {
        isShow: false,
        src: ""
      }
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
    setIdName,
    getAuthStatus(value) {
      value = value + "";
      const obj = enumMemberRealAuthStatus.find(t => t.value === value);
      return obj ? obj.name : "-";
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
      if (q.createTime && q.createTime.length) {
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
      this.isEdit = false;
      this.member = Object.assign({}, defaultMember);
      this.dialogVisible = true;
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
      this.$confirm('是否要删除该会员?', '提示', {
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
      this.isEdit = true;
      this.member=Object.assign({}, row);
      this.dialogVisible = true;
    },
    handleUpdateProperty(index, row) {
      this.dialogPropertyVisible = true;
      this.property.id = row.id;
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
          if(typeof(this.member.birthday)!="string")this.member.birthday=this.member.birthday.toLocaleString().replace(/\//g,"-");
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
    handlePropertyDialogConfirm() {
      const me = this;
      me.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateProperty(me.property).then(res => {
          this.$message({
            message: '操作完成！',
            type: 'success'
          });
          this.dialogPropertyVisible = false;
        });
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
        me.member.birthday=me.member.birthday+" 00:00:00";
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
    handleDetail(index, row) {
      this.member = Object.assign({}, row);
      this.dialogDetailVisible = true;
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
      const me = this;
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
      const me = this;
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
    handleExport() {
      const me = this, q = me.listQuery;
      exportExcel(q);
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




.pagination-container {
  padding: 0 0 30px;
}

.detail {
  display: flex;
  flex-wrap: wrap;
}

>>>.el-dialog .el-dialog__body {
  padding: 15px 20px;
}

.detail .li {
  width: 33.33%;
  line-height: 40px;
  display: flex;
}

.detail .li:nth-child(2n) {
  background-color: #f1f1f1;
}

.detail .f {
  width: 110px;
  padding-left: 10px;
  color: #999;
}

.detail .v {
  width: calc(100% - 80px);
}
</style>


