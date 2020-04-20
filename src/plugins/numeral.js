import Vue from 'vue'

import numeral from 'numeral'

Vue.filter('formatNumber', function (value) {
    if (value) {
        return numeral(String(value)).format('0,0.00');
    }
});