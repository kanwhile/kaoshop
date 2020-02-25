<template>
  <div>
    <b-card class="mb-3">
      <h4>สินค้าใกล้หมด</h4>
      <b-table
        id="my-table"
        striped
        hover
        :items="lowStock"
        :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      ></b-table>
      <p class="mt-3">Current Page: {{ currentPage }}</p>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";
import * as config from "../../config/index.js";
export default {
  name: "Items",
  data() {
    return {
      currentPage: 1,
      perPage: 50,
      totalRows: 0,
      isBusy: false,
      fields: [
        {
          key: "productName",
          label: "สินค้า",
          sortable: false,
          thStyle: "width: 60%"
        },
        {
          key: "minimum",
          label: "ขั้นต่ำ",
          sortable: false,
          thStyle: "width: 20%"
        },
        {
          key: "quantity",
          label: "คงเหลือ",
          sortable: true,
          thStyle: "width: 20%"
        }
      ]
    };
  },
  methods: {
    lastStock() {
      const params =
        "?paginator.offset=1&paginator.limit=50&orderBy.by=update&orderBy.desc=false";
      this.isBusy = true;
      let promise = axios.get(`${config.dev.API_URI}/api/stock` + params);
      return promise
        .then(response => {
          const items = response.data.value;
          // Here we could override the busy state, setting isBusy to false
          // this.isBusy = false
          return items;
        })
        .catch(() => {
          // Here we could override the busy state, setting isBusy to false
          // this.isBusy = false
          // Returning an empty array, allows table to correctly handle
          // internal busy state in case of error
          return [];
        });
    },
    lowStock(ctx) {
      console.log(ctx);
      const params =
        "?paginator.offset=" +
        this.currentPage * this.perPage +
        "&paginator.limit=" +
        this.perPage +
        "&orderBy.by=quantity&orderBy.desc=" +
        ctx.sortDesc;
      this.isBusy = true;
      let promise = axios.get(`${config.dev.API_URI}/api/stock` + params);

      return promise
        .then(response => {
          const items = response.data.value;
          this.totalRows = response.data.countItems;
          this.isBusy = false;
          return items;
        })
        .catch(() => {
          return [];
        });
    }
  }
};
</script>