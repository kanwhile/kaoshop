<template>
  <b-container>
    <b-row class="mt-3 mb-2 mb-xl-4">
      <b-col class="col-auto d-none d-sm-block">
        <h1 class="h5">รายการสินค้า</h1>
      </b-col>
    </b-row>

    <product-form></product-form>
  </b-container>
</template>
<script lang="ts">
import ProductForm from "../components/ProductForm.vue";
export default {
  components: {
    "product-form": ProductForm
  }
};
</script>
<style>
</style>