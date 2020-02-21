<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="page-title-box">
          <h4 class="page-title">ขายสินค้า</h4>
        </div>
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