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
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.orderSn" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.receiverKeyword" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker v-model="listQuery.createTimex" type="daterange" value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="请选择" clearable>
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select v-model="listQuery.orderType" class="input-width" placeholder="请选择" clearable>
              <el-option v-for="item in orderTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select v-model="listQuery.sourceType" class="input-width" placeholder="请选择" clearable>
              <el-option v-for="item in sourceTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已购买爱心订单：">
            <el-select v-model="listQuery.isSpecific" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumYesNo" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式：">
            <el-select v-model="listQuery.payType" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in enumPayType" :key="index" :label="item.name"
                :value="parseInt(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类：">
            <el-cascader v-model="classIds" :options="classAllIds" @change="changeClassIds(arguments)"
              v-if="showClassIds"></el-cascader>
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
        <el-button size="mini" @click="handleImport()" style="margin-left: 10px">发货导入</el-button>
        <el-button size="mini" @click="handleExport()" style="margin-left: 10px">导出</el-button>
      </div>
    </el-card>
    <div class="tabs">
      <div class="li" v-for="(item, at) in statusOptions" :key="at" @click="handleSearchList(item.value)"
        :class="{ s: item.value == listQuery.status }">{{ item.label }}
      </div>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option v-for="item in operateOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15, 20, 50, 100]" :total="total">
      </el-pagination>
    </div>
    <div class="table-container tableex">
      <div class="columns">
        <div class="c1">订单信息</div>
        <div class="c2">实付金额</div>
        <div class="c3">操作</div>
      </div>

      <div class="item" v-for="(it, at) in list" :key="at">
        <div class="title">
          <div class="dt">
            {{ it.createTime | formatCreateTime }}
          </div>
          <div class="orderno">
            订单号: {{ it.orderSn }}({{ it.memberUsername }})
          </div>
          <div class="name">
            会员编号({{ it.memberId }})
          </div>
          <div class="tags">
            <div class="tag2">支付时间：{{ it.paymentTime | formatCreateTime }}</div>
            <div class="tag2">{{ it.status | formatStatus }}</div>
            <div class="tag1" v-if="it.deliverySn">快递单号：{{ it.deliverySn }}</div>
          </div>
        </div>
        <div class="info">
          <div class="goods">
            <div class="li" v-for="(itp, atp) in it.itemList" :key="atp">
              <div class="img">
                <img :src="itp.productPic" />
              </div>
              <div class="prms">
                <div class="tt">{{ itp.productName }} {{ itp.realAmount }}元/件</div>
                <div class="tp">
                  <div v-for="(ita, ata) in (itp.productAttr && JSON.parse(itp.productAttr) || [])" :key="ata">
                    {{ ita.key }}:{{ ita.value }}
                  </div>
                </div>
              </div>
              <div class="price">
                <div class="money">小计: {{ itp.realAmount * itp.productQuantity }}元</div>
                <div class="num">数量: X {{ itp.productQuantity }}</div>
              </div>
            </div>
          </div>
          <div class="amount">
            <div class="money">￥{{ it.totalAmount }}</div>
            <div class="freight">(含运费￥{{ it.freightAmount }})</div>
            <div class="paymethod">{{ it.payType | formatPayType }}</div>
          </div>
          <div class="operate">
            <el-button size="mini" @click="handleViewOrder(at, it)">查看订单</el-button>
            <el-button size="mini" @click="handleChangeMoneyList(it)" v-if="it.isSpecific">查看分红</el-button>
            <el-button size="mini" @click="handleCloseOrder(at, it)" v-show="it.status === 0">关闭订单</el-button>
            <el-button size="mini" @click="handleDeliveryOrder(at, it)" v-show="it.status === 1">订单发货</el-button>
            <el-button size="mini" @click="handleViewLogistics(at, it)"
              v-show="it.status === 2 || it.status === 3">订单跟踪</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteOrder(at, it)"
              v-show="it.status === 4">删除订单</el-button>
          </div>
        </div>
        <div class="contact">
          <div class="name">
            收货人: {{ it.receiverName }}
          </div>
          <div class="tel">
            电话: {{ it.receiverPhone }}
          </div>
          <div class="address">
            地址: {{ it.receiverProvince }} {{ it.receiverCity }} {{ it.receiverRegion }} {{ it.receiverDetailAddress }}
          </div>
          <div class="type">
            {{ it.delivery_company }}
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="关闭订单" :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input style="width: 80%" type="textarea" :rows="5" placeholder="请输入内容" v-model="closeOrder.content">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
    <el-dialog title="查看分红信息" :visible.sync="dialogChangeMoneyVisible" width="80%">
      <el-table :data="changeMoneyList" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="帐号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="姓名" width="120" align="center">
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
        <el-table-column label="变动金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.changeMoney }}</template>
        </el-table-column>
        <el-table-column label="变动前金额" width="120" align="center">
          <template slot-scope="scope">￥{{ scope.row.beforeMoney }}</template>
        </el-table-column>
        <el-table-column label="变动后金额" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.afterMoney }}</template>
        </el-table-column>
        <el-table-column label="说明" width="250" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column label="操作时间" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatCreateTime }}</template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeMoneyVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <LImport v-model="showImport" title="发货导入" url="/order/importBat" durl="/static/files/发货模板.xlsx"
      @success="handleImportSuccess"></LImport>
  </div>
</template>
<script>
import { fetchList, closeOrder, deleteOrder, exportExcel } from '@/api/order'
import { listInfo as listChangeMoney } from '@/api/moneyChange';
import { formatDate } from '@/utils/date';
import { enumYesNo, enumPayType } from '@/utils/enums';
import { fetchListWithChildren } from '@/api/productCate'
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
import LImport from '@/components/l/LImportXlsx.vue'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  orderSn: null,
  receiverKeyword: null,
  firstCategoryId: undefined,
  secondCategoryId: [],
  status: null,
  orderType: null,
  sourceType: null,
  createTimeStart: null,
  createTimeEnd: null,
};
export default {
  name: "orderList",
  components: { LogisticsDialog, LImport },
  data() {
    return {
      enumYesNo,
      enumPayType,
      isShowSearchAll: false,
      createTime: [],
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: []
      },
      statusOptions: [
        {
          label: '待付款',
          value: 0
        },
        {
          label: '待发货',
          value: 1
        },
        {
          label: '已发货',
          value: 2
        },
        {
          label: '已完成',
          value: 3
        },
        {
          label: '已关闭',
          value: 4
        }
      ],
      orderTypeOptions: [
        {
          label: '正常订单',
          value: 0
        },
        {
          label: '秒杀订单',
          value: 1
        }
      ],
      sourceTypeOptions: [
        {
          label: 'PC订单',
          value: 0
        },
        {
          label: 'APP订单',
          value: 1
        }
      ],
      operateOptions: [
        {
          label: "批量发货",
          value: 1
        },
        {
          label: "关闭订单",
          value: 2
        },
        {
          label: "删除订单",
          value: 3
        }
      ],
      logisticsDialogVisible: false,
      dialogChangeMoneyVisible: false,
      showClassIds: false,
      classAllIds: [],
      classIds: [],
      changeMoneyList: [],

      showImport: false,
    }
  },
  created() {
    this.getList();
    this.loadProductClassList();
  },
  filters: {
    formatPayType(value) {
      const val = value.toString(), it = enumPayType.filter(t => t.value == val)[0];
      if (!it) return "";
      return it.name;
    },
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatSourceType(value) {
      if (value === 1) {
        return 'APP订单';
      } else {
        return 'PC订单';
      }
    },
    formatStatus(value) {
      if (value === 1) {
        return '待发货';
      } else if (value === 2) {
        return '已发货';
      } else if (value === 3) {
        return '已完成';
      } else if (value === 4) {
        return '已关闭';
      } else if (value === 5) {
        return '无效订单';
      } else {
        return '待付款';
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList(status) {
      const me = this, q = me.listQuery;
      q.pageNum = 1;
      q.status = status;
      if (q.createTimex && q.createTimex.length) {
        q.createTimeStart = q.createTimex[0];
        q.createTimeEnd = q.createTimex[1];
      }
      me.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: '/oms/orderDetail', query: { id: row.id } })
    },
    handleCloseOrder(index, row) {
      this.closeOrder.dialogVisible = true;
      this.closeOrder.orderIds = [row.id];
    },
    handleDeliveryOrder(index, row) {
      let listItem = this.covertOrder(row);
      this.$router.push({ path: '/oms/deliverOrderList', query: { list: [listItem] } })
    },
    handleViewLogistics(index, row) {
      this.logisticsDialogVisible = true;
    },
    handleDeleteOrder(index, row) {
      let ids = [];
      ids.push(row.id);
      this.deleteOrder(ids);
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.operateType === 1) {
        //批量发货
        let list = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 1) {
            list.push(this.covertOrder(this.multipleSelection[i]));
          }
        }
        if (list.length === 0) {
          this.$message({
            message: '选中订单中没有可以发货的订单',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$router.push({ path: '/oms/deliverOrderList', query: { list: list } })
      } else if (this.operateType === 2) {
        //关闭订单
        this.closeOrder.orderIds = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(this.multipleSelection[i].id);
        }
        this.closeOrder.dialogVisible = true;
      } else if (this.operateType === 3) {
        //删除订单
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder(ids);
      }
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
    handleCloseOrderConfirm() {
      if (this.closeOrder.content == null || this.closeOrder.content === '') {
        this.$message({
          message: '操作备注不能为空',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      let params = new URLSearchParams();
      params.append('ids', this.closeOrder.orderIds);
      params.append('note', this.closeOrder.content);
      closeOrder(params).then(response => {
        this.closeOrder.orderIds = [];
        this.closeOrder.dialogVisible = false;
        this.getList();
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    handleChangeMoneyList(row) {
      listChangeMoney({
        pageSize: 9999,
        sourceId: row.id,
        source: [6]
      }).then(response => {
        this.changeMoneyList = response.data.list;
        this.dialogChangeMoneyVisible = true;
      });
    },
    handleExport() {
      const me = this, q = me.listQuery;
      exportExcel(q);
    },
    handleImport() {
      this.showImport = true;
    },
    handleImportSuccess() {

    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    deleteOrder(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteOrder(params).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      })
    },
    covertOrder(order) {
      let address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress;
      let listItem = {
        orderId: order.id,
        orderSn: order.orderSn,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverPostCode: order.receiverPostCode,
        address: address,
        deliveryCompany: null,
        deliverySn: null
      };
      return listItem;
    },
    async loadProductClassList() {
      const me = this, res = await fetchListWithChildren();
      let list = res.data;
      me.classAllIds = [];
      for (let i = 0; i < list.length; i++) {
        let children = [];
        if (list[i].children != null && list[i].children.length > 0) {
          for (let j = 0; j < list[i].children.length; j++) {
            children.push({ label: list[i].children[j].name, value: list[i].children[j].id });
          }
        }
        me.classAllIds.push({ label: list[i].name, value: list[i].id, children: children });
      }
      me.$nextTick(() => {
        me.showClassIds = true;
      });
    },
    async changeClassIds(args) {
      const me = this, ids = args[0];
      me.listQuery.firstCategoryId = ids[0];
      me.listQuery.secondCategoryId = [ids[1]];
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
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

.opts>button {
  margin: 5px 5px 5px 0;
}

.tabs {
  margin: 20px 0 0;
  border-bottom: 1px solid #409EFF;
  display: flex;
}

.tabs .li {
  padding: 8px 20px 6px;
  margin: 0 10px;
  background: #eee;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  cursor: pointer;
}

.tabs .s {
  color: #fff;
  background: #409EFF;
}


.tableex .columns {
  line-height: 40px;
  color: #333;
  font-size: 14px;
  border-radius: 5px;
  background: #eee;
  text-align: center;
  display: flex;
}

.columns .c1 {
  width: 55%;
}

.columns .c2 {
  width: 20%;
  text-align: left;
}

.columns .c2 {
  width: 25%;
}

.tableex .item {
  margin-top: 15px;
  font-size: 14px;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
}

.item .title {
  padding: 10px;
  background: #eee;
  display: flex;
}

.item .title>div {
  padding: 0 5px;
}

.item .title .tags {
  display: flex;
}

.item .tags div {
  padding: 0 5px;
}

.item .info {
  padding: 10px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item .info .goods {
  width: 55%;
}

.item .goods .li {
  padding: 0 3% 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item .goods .li:nth-child(2n+1) {
  background: #fafafa;
  border-radius: 10px;
}

.item .goods .li:last-child {
  padding-bottom: 0;
}

.item .goods .img {
  width: 80px;
  margin-right: 20px;
  display: block;
  flex: 0 0 80px;
}

.item .goods img {
  width: 100%;
}

.item .goods .prms {
  flex: 1;
}

.item .goods .price {
  width: 30%;
  min-width: 120px;
  margin-left: 20px;
}

.item .info {
  line-height: 24px;
}

.item .info .amount {
  width: 20%;
}

.item .info .operate {
  width: 25%;
}

.item .operate button {
  margin: 0 5px 8px 0;
}

.item .contact {
  padding: 10px;
  background: #eee;
  display: flex;
}

.item .contact div {
  padding: 0 5px;
}
</style>


