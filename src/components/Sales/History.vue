<template>
  <div>
    <b-card class="mb-3" title="รายการขาย">
      <b-row>
        <b-col class="my-2">
          <b-form-group
            label="วันที่"
            label-cols-sm="8"
            label-align-sm="right"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group>
              <b-form-input v-model="filterDate" type="date" id="filterInput" placeholder="วันที่"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filterDate" @click="filterDate = ''">ยกเลิก</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        id="my-table"
        striped
        hover
        :filter="filterDate"
        :items="salesHistory"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template v-slot:table-busy>
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(createDate)="data">{{ data.item.createDate | formatDate }}</template>
        <template v-slot:cell(total)="data">{{ data.item.total | formatNumber }}</template>
        <template v-slot:cell(actions)="row">
          <b-button
            variant="outline-success"
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
    <!-- Info modal -->
    <b-modal size="xl" :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>
        <b-table striped hover :fields="salesItems" :items="infoModal.content">
           <template v-slot:cell(itemPerPrice)="row">{{row.item.itemPerPrice | formatNumber}}</template>           
           <template
  v-slot:cell(total)="row"
>{{row.item.itemPerPrice * row.item.amount | formatNumber}}</template>
           <template
  v-slot:cell(profit)="row"
>{{(row.item.itemPerPrice - row.item.defaultBuyingPrice * row.item.amount) | formatNumber}}</template>
        </b-table>
      </pre>
      <b-row>
        <b-col class="text-right">รวมเป็นเงิน {{infoModal.total | formatNumber}} บาท</b-col>
      </b-row>
    </b-modal>
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
          key: "createDate",
          label: "วันที่"
        },
        {
          key: "refNumber",
          label: "เลขที่ใบเสร็จ",
          sortable: false
        },
        {
          key: "amount",
          label: "จำนวนสินค้า",
          class: "text-right",
          sortable: true
        },
        {
          key: "total",
          label: "จำนวนเงิน",
          class: "text-right",
          sortable: false
        },
        { key: "actions", label: "", class: "text-center" }
      ],
      salesItems: [
        {
          key: "productCode",
          label: "รหัสสินค้า",
          sortable: false
        },
        {
          key: "name",
          label: "ชื่อสินค้า"
        },
        {
          key: "amount",
          label: "จำนวนสินค้า",
          class: "text-right"
        },
        {
          key: "itemPerPrice",
          label: "ราคาสินค้า",
          class: "text-right"
        },
        {
          key: "profit",
          label: "กำไร",
          class: "text-right"
        },
        {
          key: "total",
          label: "รวม",
          class: "text-right"
        }
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
        total: 0
      },
      filterDate: new Date().toLocaleDateString(),
      filter: ""
    };
  },
  methods: {
    salesHistory() {
      const params =
        "?paginator.offset=" +
        (this.currentPage - 1) * this.perPage +
        "&paginator.limit=" +
        this.perPage +
        "&filter.CreateDate=" +
        this.filterDate;
      this.isBusy = true;
      let promise = axios.get(`${config.dev.API_URI}/api/sales/list` + params);
      console.log(new Date().toLocaleDateString());
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
    },
    info(item, index, button) {
      this.infoModal.title = `เลขที่ใบเสร็จ: ${item.refNumber}`;
      this.infoModal.content = item.saleItems;
      this.infoModal.total = item.total;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
      this.infoModal.total = 0;
    },
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted: {}
};
</script>