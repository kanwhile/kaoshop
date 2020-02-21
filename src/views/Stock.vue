<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="page-title-box">
          <h4 class="page-title">สต็อกสินค้า</h4>
        </div>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-primary">
          <b-icon icon="plus"></b-icon>เพิ่มสต็อกสินค้า
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mb-3">
          <h4>สินค้าใกล้หมด</h4>
          <b-table striped hover :items="items"></b-table>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mb-3">
          <h4>สินค้าเพิ่มล่าสุด</h4>
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