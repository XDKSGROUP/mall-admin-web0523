<template>
  <div class="container">
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
        <el-form :inline="true" :model="filter" size="small" label-width="140px">
          <el-form-item label="用户名：">
            <el-input v-model="filter.username" class="input-width" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="tree">
      <nodes v-if="isShowData" v-model="data" keyTitle="username" :current="filter.username" :level="0"
        @select="handelSelect" @next="handelNext"></nodes>
    </div>
    <el-drawer title="详细信息" :visible.sync="showDetail" direction="rtl">
      <div class="memberinfo">
        <div class="li">
          <div class="f">编号：</div>
          <div class="v">{{ selectItem.memberId }}</div>
        </div>
        <div class="li">
          <div class="f">用户名：</div>
          <div class="v">{{ selectItem.username }}</div>
        </div>
        <div class="li">
          <div class="f">电话：</div>
          <div class="v">{{ selectItem.phone }}</div>
        </div>
        <div class="li">
          <div class="f">随机编号：</div>
          <div class="v">{{ selectItem.teamNumber }}</div>
        </div>
        <div class="li">
          <div class="f">团队编号：</div>
          <div class="v">{{ selectItem.commonTeamNumber }}</div>
        </div>
        <div class="li">
          <div class="f">会员角色：</div>
          <div class="v">{{ selectItem.memberLevelName }}</div>
        </div>
        <div class="li">
          <div class="f">会员等级：</div>
          <div class="v">{{ selectItem.memberHonorLevelName }}</div>
        </div>
        <div class="li">
          <div class="f">团队角色：</div>
          <div class="v">{{ selectItem.manageLevelName }}</div>
        </div>
        <div class="li">
          <div class="f">直推人账户：</div>
          <div class="v">{{ selectItem.inviterUsername==null?"无": selectItem.inviterUsername }}</div>
        </div>
        <div class="li">
          <div class="f">人脉值：</div>
          <div class="v">{{ selectItem.networkValue }}</div>
        </div>
        <div class="li">
          <div class="f">团队值：</div>
          <div class="v">{{ selectItem.teamValue }}</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { listInfo, listInfoNext } from '@/api/team';
import nodes from '@/components/L/LTreeNode.vue'

export default {
  name: 'teamlist',
  components: {
    nodes
  },
  data() {
    return {
      isShowData: false,
      data: [],
      isShowSearchAll: false,
      filter: {
        username: ""
      },
      selectItem: {},
      showDetail: false,
      testData: [
        {
          title: '梁当',
          children: [
            {
              title: '月星',
              children: [
                {
                  title: '王小某',
                  children: [
                    {
                      title: '李清',
                      children: [
                        {
                          title: '刘雪',
                        }, {
                          title: '龙易',
                        }]
                    }, {
                      title: '林树风',
                      children: [
                        {
                          title: '王一博',
                        }, {
                          title: '林学名',
                        }
                      ]
                    }
                  ]
                },
                {
                  title: "王广"
                }
              ]
            },
            {
              title: '巩新'
            }
          ]
        }
      ]
    }
  },
  async created() {

  },
  filters: {

  },
  methods: {
    async loadData() {
      const me = this, filter = me.filter;
      if (!filter.username) { me.data = []; return; }
      me.isShowData = false;
      const rst = await listInfo(filter.username);
      if (rst.code !== 200) this.$message({ type: 'error', message: rst.message });
      const dic = {};
      const root = rst.data[0];
      rst.data.forEach(t => {
        const code = t.binaryStorage, parent = dic[code.replace(/.$/, "")];
        t.isChild = t.pointMemberCount ? true : false;
        dic[code] = t;
        if (!parent) return;
        parent.children ? parent.children.push(t) : (parent.children = [t]);
      });
      me.data = [root];
      me.isShowData = true;
    },
    async loadNext(item) {
      if (item.children && item.children.length == 2) return;
      const me = this, rst = await listInfoNext(item.username);
      if (rst.code !== 200) me.$message({ type: 'error', message: rst.message });
      if (!item.children) item.children = [];
      rst.data.forEach(t => {
        t.isChild = t.pointMemberCount ? true : false;
        item.children.push(t);
      });
    },
    async handleSearchList() {
      this.loadData();
    },
    async handleResetSearch() {
      this.filter = {};
      this.loadData();
    },
    async handelSelect(item) {
      this.selectItem = item;
      this.showDetail = true;
      console.log(item)
    },
    async handelNext(item, vue) {
      await this.loadNext(item);
      vue.reload(item);
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
}

.container .tree {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
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



.li {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}

.li .btn {
  cursor: pointer;

}

.memberinfo {
  display: flex;
  flex-wrap: wrap;
}

.memberinfo .li {
  width: 100%;
  line-height: 30px;
  padding: 2px 20px;
  text-align: left;
  display: flex;
}

.memberinfo .li:nth-child(2n) {
  background-color: #eee;
}

.memberinfo .f {
  width: 120px;
  text-align: left;
}

.memberinfo .v {
  text-align: left;
}
</style>


