<template>
  <div class="row home content">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <product-item></product-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'
export default {
  components: {
    "product-item": ProductItem
  }
};
</script>