import { DatePicker } from 'element-ui';
//实例列表
const cases = {};
export default {
    name: 'LDate',
    extends: DatePicker,
    props: ["isUpdate"],
    watch: {
        "isUpdate": (nv, ov) => {
            if (!nv) return;
            for (let key in cases) {
                cases[key].updateValue();
            }
        }
    },
    beforeMount() {
        cases[this._uid] = this;

        this.updateValue();
    },
    beforeDestroy() {
        delete cases[this._uid];
    },
    methods: {
        updateValue() {
            const val = this.value;
            if (val && !val.getFullYear) {
                this.$emit("input", new Date(val), this);
            }
        }
    }
};
