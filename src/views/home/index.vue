<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">今日充值</div>
          </div>
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">充值总数/充值总额</div>
            <div class="total-value">{{ assets.todayIntegralRechargeCount + assets.todayMoneyRechargeCount }}/￥{{ assets.todayIntegralRechargeTotal + assets.todayMoneyRechargeTotal }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">今日提现</div>
          </div>
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">提现总数/提现总额</div>
            <div class="total-value">{{ assets.todayIntegralWithdrawalsCount + assets.todayMoneyWithdrawalsCount }}/￥{{ assets.todayIntegralWithdrawalsTotal + assets.todayMoneyWithdrawalsTotal }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">今日申请提现</div>
          </div>
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">申请总数/申请总额</div>
            <div class="total-value">{{ assets.todayIntegralApplyWithdrawalsCount + assets.todayMoneyApplyWithdrawalsCount }}/￥{{ assets.todayIntegralApplyWithdrawalsTotal + assets.todayMoneyApplyWithdrawalsTotal }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
   
    <div class="un-handle-layout">
      <div class="layout-title">资产统计</div>
      <div class="un-handle-content">
        <el-row>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.nowIntegralTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.nowMoneyTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
        </el-row>
        <el-row class="font-medium">
          <el-col :span="4" class="overview-item-title">会员爱心总额</el-col>
          <el-col :span="4" class="overview-item-title">会员贡献总额</el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralRechargeCount + assets.moneyRechargeCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralRechargeTotal + assets.moneyRechargeTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralWithdrawalsCount + assets.moneyWithdrawalsCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralWithdrawalsTotal + assets.moneyWithdrawalsTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralApplyWithdrawalsCount + assets.moneyApplyWithdrawalsCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralApplyWithdrawalsTotal + assets.moneyApplyWithdrawalsTotal }}</el-col>
        </el-row>
        <el-row class="font-medium">
          <el-col :span="4" class="overview-item-title">充值总数</el-col>
          <el-col :span="4" class="overview-item-title">充值总额</el-col>
          <el-col :span="4" class="overview-item-title">提现总数</el-col>
          <el-col :span="4" class="overview-item-title">提现总额</el-col>
          <el-col :span="4" class="overview-item-title">申请总数</el-col>
          <el-col :span="4" class="overview-item-title">申请总额</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.todayIntegralManageTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralManageTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.todayMoneyManageTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.moneyManageTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
        </el-row>
        <el-row class="font-medium">
          <el-col :span="4" class="overview-item-title">今日后台充值总额</el-col>
          <el-col :span="4" class="overview-item-title">后台充值总额</el-col>
          <el-col :span="4" class="overview-item-title">今日后台扣除总额</el-col>
          <el-col :span="4" class="overview-item-title">后台扣除总额</el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
        </el-row>
      </div>
    </div>

    <div class="un-handle-layout">
      <div class="layout-title">会员统计</div>
      <div class="un-handle-content">
        <el-row>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.newlyMemberCount }}</el-col>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.memberCount }}</el-col>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.level1Count }}</el-col>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.level2Count }}</el-col>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.level3Count }}</el-col>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.level4Count }}</el-col>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.level5Count }}</el-col>
          <el-col :span="3" class="color-danger overview-item-value">{{ member.level6Count }}</el-col>
        </el-row>
        <el-row class="font-medium">
          <el-col :span="3" class="overview-item-title">今日新增会员</el-col>
          <el-col :span="3" class="overview-item-title">会员总数</el-col>
          <el-col :span="3" class="overview-item-title">公民总数</el-col>
          <el-col :span="3" class="overview-item-title">志愿者总数</el-col>
          <el-col :span="3" class="overview-item-title">社工总数</el-col>
          <el-col :span="3" class="overview-item-title">退休社工总数</el-col>
          <el-col :span="3" class="overview-item-title">站长总数</el-col>
          <el-col :span="3" class="overview-item-title">区域站长总数</el-col>
        </el-row>
      </div>
    </div>

    <div class="un-handle-layout">
      <div class="layout-title">订单统计</div>
      <div class="un-handle-content">
        <el-row>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.todayOrderCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.todayPayAmount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.orderCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.payAmount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
        </el-row>
        <el-row class="font-medium">
          <el-col :span="4" class="overview-item-title">今日订单总数</el-col>
          <el-col :span="4" class="overview-item-title">今日订单总额</el-col>
          <el-col :span="4" class="overview-item-title">订单总数</el-col>
          <el-col :span="4" class="overview-item-title">订单总额</el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.todaySpecificOrderCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.todaySpecificPayAmount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.specificOrderCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.specificPayAmount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.todayBonusAmount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ order.bonusAmount }}</el-col>
        </el-row>
        <el-row class="font-medium">
          <el-col :span="4" class="overview-item-title">今日爱心订单总数</el-col>
          <el-col :span="4" class="overview-item-title">今日爱心订单总额</el-col>
          <el-col :span="4" class="overview-item-title">爱心订单总数</el-col>
          <el-col :span="4" class="overview-item-title">爱心订单总额</el-col>
          <el-col :span="4" class="overview-item-title">今日分红总额</el-col>
          <el-col :span="4" class="overview-item-title">分红总额</el-col>
        </el-row>
      </div>
    </div>

    <div class="un-handle-layout">
      <div class="layout-title">捐赠统计</div>
      <div class="un-handle-content">
        <el-row>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.todayIntegralDonateCount + assets.todayMoneyDonateCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.todayIntegralDonateTotal + assets.todayMoneyDonateTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralDonateCount + assets.moneyDonateCount }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value">{{ assets.integralDonateTotal + assets.moneyDonateTotal }}</el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
          <el-col :span="4" class="color-danger overview-item-value"></el-col>
        </el-row>
        <el-row class="font-medium">
          <el-col :span="4" class="overview-item-title">今日捐赠总数</el-col>
          <el-col :span="4" class="overview-item-title">今日捐赠总额</el-col>
          <el-col :span="4" class="overview-item-title">捐赠总数</el-col>
          <el-col :span="4" class="overview-item-title">捐赠总额</el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
          <el-col :span="4" class="overview-item-title"></el-col>
        </el-row>
      </div>
    </div>
   
  </div>
</template>

<script>
import img_home_order from '@/assets/images/home_order.png';
import img_home_today_amount from '@/assets/images/home_today_amount.png';
import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
import { getInfo as orderInfo } from '@/api/productorders';
import { getInfo as memberInfo } from '@/api/memberLevels';
import { getInfo as assetsInfo } from '@/api/financeproperty';
  export default {
    name: 'home',
    data() {
      return {
        order: {},
        member: {},
        assets: {},
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount

      }
    },
    created() {
      orderInfo().then(response => {
        this.order = response.data;
      });
      memberInfo().then(response => {
        this.member = response.data;
      });
      assetsInfo().then(response => {
        this.assets = response.data;
      });
    },
    methods:{

    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }
</style>
