<template>
  <div class="row product content">
    <div class="col">
      <product-form></product-form>
    </div>
  </div>
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