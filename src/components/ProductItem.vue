<template>
  <b-card>
    <h1 class="h5 mb-4">รายการสินค้าทั้งหมด</h1>
    <b-table striped :items="items" :fields="fields"></b-table>
  </b-card>
</template>

<script>
import axios from "axios";
import config from "../config/index.js";

export default {
  name: "productItem",
  data() {
    return {
      fields: [
        "#",
        { key: "productCode", label: "รหัส" },
        { key: "productName", label: "สินค้า", class: "col" },
        {
          key: "price",
          class: "text-right",
          label: "ราคา",
          formatter: value => {
            let val = (value / 1).toFixed(2);
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        }
      ],
      items: null
    };
  },
  mounted() {
    axios
      .get(`${config.dev.API_URI}/api/Products`)
      .then(response => (this.items = response.data.value));
  }
};
</script>