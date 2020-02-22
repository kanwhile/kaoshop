<template>
  <b-container fluid>
    <b-row class="mt-3 mb-2 mb-xl-4">
      <b-col class="col-auto d-none d-sm-block">
        <h1 class="h5">สต็อกสินค้า</h1>
      </b-col>
      <b-col class="col-auto ml-auto text-right mt-n1">
        <b-button variant="outline-primary">
          <b-icon icon="plus"></b-icon>เพิ่มสต็อกสินค้า
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mb-3">
          <h4>สต็อกใกล้หมด</h4>
          <b-table striped hover :items="items"></b-table>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mb-3">
          <h4>สต็อกเพิ่มล่าสุด</h4>
          <b-table striped hover :items="items"></b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
export default {
  data() {
    return {
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  }
};
</script>