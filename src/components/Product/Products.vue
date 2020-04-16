<template>
  <div>
    <b-card class="mb-3">
      <h4>สินค้าใกล้หมด</h4>
      <b-table
        id="my-table"
        striped
        hover
        :items="products"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(profit)="row">
          {{row.item.defaultSellingPrice - row.item.defaultBuyingPrice}}
        </template>
         <template v-slot:cell(actions)="row">
          <b-button
            variant="outline-info"
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >ดูรายละเอียด</b-button>
        </template>
      </b-table>
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
<script lang="ts">
import axios from "axios";
import * as config from "../../config/index.js";
export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      perPage: 50,
      totalRows: 0,
      isBusy: false,
      fields: [
        {
          lable: "#"
        },
        {
          key: "productCode",
          label: "รหัสสินค้า",
          sortable: false
        },
        {
          key: "productName",
          label: "สินค้า",
          sortable: false,
          thStyle: "width: 50%"
        },
        {
          key: "defaultBuyingPrice",
          label: "ต้นทุน",
          sortable: true
        },
        {
          key: "profit",
          label: "กำไร",
          sortable: true
        },
        {
          key: "defaultSellingPrice",
          label: "ราคาขาย",
          sortable: true
        }
      ]
    };
  },
  methods: {
    products() {
      const params =
        "?paginator.offset=" +
        (this.currentPage - 1) * this.perPage +
        "&paginator.limit=" +
        this.perPage;
      this.isBusy = true;
      let promise = axios.get(`${config.dev.API_URI}/api/products` + params);

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