<template>
  <b-container>
    <b-row>
      <b-col>
        <div class="page-title-box">
          <h4 class="page-title">รายการสินค้า</h4>
        </div>
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