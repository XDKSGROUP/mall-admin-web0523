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
          <el-form-item v-if="false" label="标题：">
            <el-input size="mini" v-model="listQuery.title" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="false" label="类型：">
            <el-radio-group v-model="listQuery.type">
              <el-radio v-for="(it, at) in enumNotice" :key="at" :label="parseInt(it.value)">{{ it.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计日期：">
            <el-date-picker size="mini" v-model="listQuery.date" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>批量操作</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">导出</el-button>
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
        <el-table-column label="统计日期" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.statisticsDate | formatDate }}</template>
        </el-table-column>
        <el-table-column label="爱心值剩余总量" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.nowIntegralTotal }}</template>
        </el-table-column>
        <el-table-column label="贡献值剩余总量" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.nowMoneyTotal }}</template>
        </el-table-column>
        <el-table-column label="今日充值总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayRechargeTotal }}</template>
        </el-table-column>
        <el-table-column label="今日提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="爱心值充值总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralRechargeCount }}</template>
        </el-table-column>
        <el-table-column label="爱心值充值总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralRechargeTotal }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值充值总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralRechargeCount }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值充值总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralRechargeTotal }}</template>
        </el-table-column>
        <el-table-column label="贡献值充值总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyRechargeCount }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值充值总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyRechargeCount }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值充值总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyRechargeTotal }}</template>
        </el-table-column>
        <el-table-column label="爱心值提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="爱心值提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="贡献值提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="贡献值提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="爱心值申请提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralApplyWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="爱心值申请提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralApplyWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值申请提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralApplyWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值申请提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralApplyWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="贡献值申请提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyApplyWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="贡献值申请提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyApplyWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值申请提现总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyApplyWithdrawalsCount }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值申请提现总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyApplyWithdrawalsTotal }}</template>
        </el-table-column>
        <el-table-column label="爱心值捐赠总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralDonateCount }}</template>
        </el-table-column>
        <el-table-column label="爱心值捐赠总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralDonateTotal }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值捐赠总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralDonateCount }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值捐赠总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralDonateTotal }}</template>
        </el-table-column>
        <el-table-column label="贡献值捐赠总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyDonateCount }}</template>
        </el-table-column>
        <el-table-column label="贡献值捐赠总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyDonateTotal }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值捐赠总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyDonateCount }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值捐赠总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyDonateTotal }}</template>
        </el-table-column>
        <el-table-column label="爱心值订单总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralOrderCount }}</template>
        </el-table-column>
        <el-table-column label="爱心值订单总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralOrderTotal }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值订单总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralOrderCount }}</template>
        </el-table-column>
        <el-table-column label="今日爱心值订单总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralOrderTotal }}</template>
        </el-table-column>
        <el-table-column label="贡献值订单总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyOrderCount }}</template>
        </el-table-column>
        <el-table-column label="贡献值订单总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyOrderTotal }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值订单总数" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyOrderCount }}</template>
        </el-table-column>
        <el-table-column label="今日贡献值订单总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyOrderTotal }}</template>
        </el-table-column>

        <el-table-column label="后台充值总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.integralManageTotal }}</template>
        </el-table-column>
        <el-table-column label="今日后台充值总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayIntegralManageTotal }}</template>
        </el-table-column>
        <el-table-column label="后台扣除总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.moneyManageTotal }}</template>
        </el-table-column>
        <el-table-column label="今日后台扣除总额" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.todayMoneyManageTotal }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { listInfo } from '@/api/financeproperty';
import { formatDate } from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  title: undefined,
  date: [],
  dateStart: undefined,
  dateEnd: undefined,
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
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatDate(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
      if (q.date.length) {
        q.dateStart = q.date[0];
        q.dateEnd = q.date[1];
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


