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
          <el-form-item label="创建日期：">
            <el-date-picker size="mini" v-model="listQuery.createTime" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="来源：">
            <el-select v-model="listQuery.source" multiple clearable placeholder="请选择">
              <el-option v-for="item in enumMoneySourceType" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变动金额：">
            <el-input-number size="mini" v-model="listQuery.changeMoneyStart" placeholder="开始数量" controls-position="right"
              style="width:120px;"></el-input-number>
            <el-input-number size="mini" v-model="listQuery.changeMoneyEnd" placeholder="结束数量" controls-position="right"
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
      <el-table ref="infoTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="会员用户名" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="会员真实姓名" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="随机ID" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.teamNumber }}</template>
        </el-table-column>
        <el-table-column label="团队ID" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.commonTeamNumber }}</template>
        </el-table-column>
        <el-table-column label="称号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.memberLevelName }}</template>
        </el-table-column>
        <el-table-column label="岗位" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.manageLevelName }}</template>
        </el-table-column>
        <el-table-column label="荣誉值" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.memberHonorLevelValue }}</template>
        </el-table-column>
        <el-table-column label="变动前金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.beforeMoney }}</template>
        </el-table-column>
        <el-table-column label="变动金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.changeMoney }}</template>
        </el-table-column>
        <el-table-column label="变动后金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.afterMoney }}</template>
        </el-table-column>
        <el-table-column label="金额类型" width="120" align="center">
          <template slot-scope="scope">{{ getMoneyType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column label="内容" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column label="来源" width="180" align="center">
          <template slot-scope="scope">{{ getMoneySourceType(scope.row.source) }}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.sourceNumber }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
import { listInfo, exportExcel } from '@/api/moneyChange';
import { formatDate } from '@/utils/date';
import { enumMoneyType, enumMoneySourceType } from "@/utils/enums";
import SingleUpload from '@/components/Upload/singleUpload';
import Tinymce from '@/components/Tinymce';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  username: undefined,
  realName: undefined,
  type: undefined,
  source: undefined,
  createTime: [],
  createTimeStart: undefined,
  createTimeEnd: undefined,
  changeMoneyStart: undefined,
  changeMoneyEnd: undefined,
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
      enumMoneyType,
      enumMoneySourceType,
      isShowSearchAll: false,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      info: Object.assign({}, defaultInfo),
      infoRules: {
      },
      isEdit: false,
      dialogAuthVisible: false,
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
    }, getMoneySourceType(value) {
      value = value + "";
      const obj = enumMoneySourceType.find(t => t.value === value);
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
</style>


