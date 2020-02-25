<template>
  <b-container fluid>
    <b-row class="mt-3 mb-2 mb-xl-4">
      <b-col class="col-auto d-none d-sm-block">
        <h1 class="h5">สต็อกสินค้า</h1>
      </b-col>
      <b-col class="col-auto ml-auto text-right mt-n1">
        <b-button variant="outline-primary" @click="isShowForm=!isShowForm" v-if="!isShowForm">
          <b-icon icon="plus"></b-icon>เพิ่มสต็อกสินค้า
        </b-button>
      </b-col>
    </b-row>
    <b-row v-show="!isShowForm">
      <b-col>
        <stock-table></stock-table>
      </b-col>
      <b-col>
        <!-- <b-card class="mb-3">
          <h4>สต็อกเพิ่มล่าสุด</h4>
          <b-table striped hover :items="lastStock" :busy.sync="isBusy" :fields="fields"></b-table>
        </b-card> -->
      </b-col>
    </b-row>
    <b-row v-show="isShowForm">
      <b-col md="4">
        <search></search>
      </b-col>
      <b-col>
        <stock-form @eventBack="value => isShowForm = value"></stock-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import StockTable from "../components/Stock/StockTable.vue";
import StockForm from "../components/Stock/StockForm.vue";
import Search from "../components/Product/Search.vue";
export default {
  components: {
    StockForm,
    Search,
    StockTable
  },
  data() {
    return {     
      isShowForm: false,
    };
  },
  mounted() {}
};
</script>