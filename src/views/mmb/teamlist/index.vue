<template>
  <div class="container">
    <div class="li" v-for="(it, idx) in testData" :key="idx">
      <div class="name">{{ it.label }}</div>
      <div class="btn" @click="showChild()">+</div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'teamlist',
  data() {
    return {
      testData: [{
        label: 'xxx科技有有限公司',
        children: [{
          label: '产品研发部',
          children: [{
            label: '研发-前端',
          }, {
            label: '研发-后端',
          }, {
            label: 'UI 设计',
          }]
        }, {
          label: '销售部',
          children: [{
            label: '销售一部',
          }, {
            label: '销售二部',
          }
          ]
        }, {
          label: '财务部'
        }]
      }]
    }
  },
  created() {

  },
  filters: {

  },
  methods: {

  }
}
</script>
<style scoped>
.container {
  width: 100%;
}

.li {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}

.li .btn{
  cursor:pointer;

}

</style>


