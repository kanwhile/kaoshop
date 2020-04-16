<template>
  <b-container fluid>
    <b-row class="mt-3 mb-2 mb-xl-4">
      <b-col class="col-auto d-none d-sm-block">
        <h1 class="h5">ประวัติการขาย</h1>
      </b-col>
    </b-row>
    <div class="row">
      <div class="col">
        <salehistory></salehistory>
      </div>
    </div>
  </b-container>
</template>
<script lang="ts">
import salehistory from "../components/Sales/History.vue";
export default {
  components: {
    salehistory: salehistory
  }
};
</script>
<style>
</style>