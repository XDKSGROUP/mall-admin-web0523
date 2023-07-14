<template>
    <div class="ltreenode">
        <div class="li" v-for="(item, index) in children" :key="index">
            <div :class="index == 0 ? 'linel' : index == max ? 'liner' : 'line'" v-if="level != 0">
                <div class="line"></div>
            </div>
            <div class="title">{{ item.title }}</div>
            <nodes v-if="item.children" v-model="item.children" :level="lv"></nodes>
        </div>
    </div>
</template>
  
<script>
export default {
    components: {
        nodes: () => import('./LTreeNode.vue')
    },
    model: {
        prop: "children",
        event: "children",
    },
    props: {
        level: Number,
        children: Array,
    },
    data() {
        return {
            max: undefined,
            lv: undefined
        }
    },
    created() {
        this.max = this.children.length - 1;
        this.lv = this.level + 1;
    },
    methods: {

    }
}
</script>
  
<style scoped>
.ltreenode {
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.li {
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.line {
    width: 100%;
    height: 1px;
    background-color: #000;
}

.line>.line {
    width: 1px;
    height: 5px;
    margin-left: 50%;
    background-color: #000;
}

.linel {
    width: 50%;
    height: 1px;
    margin-left: 50%;
    background-color: #000;
}

.linel>.line {
    width: 1px;
    height: 5px;
    margin-right: auto;
    background-color: #000;
}

.liner {
    width: 50%;
    height: 1px;
    margin-right: 50%;
    background-color: #000;
}

.liner>.line {
    width: 1px;
    height: 5px;
    margin-left: auto;
    background-color: #000;
}

.title {
    padding: 10px 3px 5px;
    text-align: center;
}
</style>
  
  