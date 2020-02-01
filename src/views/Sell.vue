<template>
  <div class="row product content">
    <div class="col">
      <sell></sell>
    </div>
  </div>
</template>
<script lang="ts">
import Sell from "../components/Sell/Sell.vue";
export default {
  components: {
    "sell": Sell
  }
};
</script>
<style>
</style>