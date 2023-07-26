import Vue from 'vue';
import LDate from './LDate'

export default {
    init: function () {
        Vue.component(LDate.name, LDate);
    }
};