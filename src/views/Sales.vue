<template>
  <div class="row product content">
    <div class="col">
      <sales></sales>
    </div>
  </div>
</template>
<script lang="ts">
import sales from "../components/Sales/Sales.vue";
export default {
  components: {
    "sales": sales
  }
};
</script>
<style>
</style>