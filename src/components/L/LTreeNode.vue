<template>
    <div class="ltreenode">
        <div class="li" v-for="(item, index) in children" :key="index">
            <div :class="index == 0 ? 'linel' : index == max ? 'liner' : 'line'" v-if="level != 0">
                <div class="line"></div>
            </div>
            <div class="title" :class="item[keyTitle] == current ? 'current' : ''">
                <div @click="handelSelect(item, index)">{{ item[keyTitle] }}</div>
                <div v-if="!isLoad[index]" class="icon" @click="handelShowHide(item, index)">
                    {{ show[index] ? '-' : '+' }}
                </div>
            </div>
            <nodes v-if="show[index] && item.children" v-model="item.children" :current="current" :keyTitle="keyTitle"
                :level="lv" @next="$emit('next', arguments[0], arguments[1])"
                @select="$emit('select', arguments[0], arguments[1])">
            </nodes>
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
        keyTitle: {
            type: String,
            default: "title"
        },
        current: String
    },
    data() {
        return {
            show: undefined,
            index: undefined,
            max: undefined,
            lv: undefined,
            select: undefined,
            isLoad: [],
        }
    },
    created() {
        const me = this;
        me.lv = me.level + 1;
        me.max = me.children && (me.children.length - 1) || 0;
        me.show = me.children.map(t => t.children ? true : false);
        me.isLoad = me.children.map(t => t.isChild ? false : true);
    },
    methods: {
        //展示和隐藏切换
        handelShowHide(item, index) {
            const me = this, s = me.show;
            if (!s[index] && item.isChild && !item.children) me.handelNext(item, index);
            s[index] = !s[index];
            me.show = s.map(t => t);
        },
        //选择
        handelSelect(item, index) {
            this.index = index;
            this.select = item;
            this.$emit("select", item, this);
        },
        //读取下1个
        handelNext(item, index) {
            this.index = index;
            this.select = item;
            this.$emit("next", item, this);
        },
        //重新加载
        reload() {
            const me = this, s = me.show;
            me.select.isChild = me.select.children && me.select.children.length;
            me.isLoad[me.index] = me.select.isChild ? false : true;
            s[me.index] = false;
            me.show = s.map(t => t);
            s[me.index] = true;
            me.show = s.map(t => t);
        }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title .icon {
    width: 10px;
    height: 10px;
    line-height: 6px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #333;
    border-radius: 50%;
}

.current {
    color: #ff0000;
}
</style>
  
  