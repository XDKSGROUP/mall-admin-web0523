<template>
  <div class="container">
    <nodes v-model="testData" :level="0"></nodes>
  </div>
</template>
<script>
import nodes from '@/components/L/LTreeNode.vue'

export default {
  name: 'teamlist',
  components: {
    nodes
  },
  data() {
    return {
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

.li .btn {
  cursor: pointer;

}
</style>


