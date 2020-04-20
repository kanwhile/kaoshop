<template>
  <b-container fluid>
    <b-row class="mt-3 mb-2 mb-xl-4">
      <b-col class="col-auto d-none d-sm-block">
        <h1 class="h5">ขายสินค้า</h1>
      </b-col>
      <b-col class="col-auto ml-auto text-right mt-n1">
        <b-button href="#/sales/history" variant="outline-primary" @click="isShowForm=!isShowForm" v-if="!isShowForm">
          <b-icon icon="plus"></b-icon>ประวัติการขาย
        </b-button>
      </b-col>
    </b-row>
    <div class="row">
      <div class="col">
        <sales></sales>
      </div>
    </div>
  </b-container>
</template>
<script lang="ts">
import sales from "../components/Sales/Sales.vue";
export default {
  components: {
    sales: sales
  }
};
</script>
<style>
</style>