<template>
  <div>
    <b-card class="mb-3">
      <h4>รายการขาย</h4>
      <b-table
        id="my-table"
        striped
        hover
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
    <!-- Info modal -->
    <b-modal size="xl" :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>
        <b-table striped hover :fields="salesItems" :items="infoModal.content" >
           <template v-slot:cell(actions)="row">{{formatPrice(row.item.itemPerPrice * row.item.amount)}}</template>
        </b-table>
      </pre>
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
          key: "refNumber",
          label: "เลขที่ใบเสร็จ",
          sortable: false,
          thStyle: "width: 70%"
        },
        {
          key: "amount",label: "จำนวนสินค้า",class: 'text-right',sortable: true,thStyle: "width: 10%"
        },
        {
          key: "total",
          label: "จำนวนเงิน",
          class: 'text-right',
          sortable: false,
          thStyle: "width: 10%"
        },
        { key: "actions", label: "" ,class: 'text-center',thStyle: "width: 10%"}
      ],
      salesItems: [
        {
          key: "productCode",
          label: "รหัสสินค้า",
          sortable: false,
          thStyle: "width: 20%"
        },
        {
          key: "name",
          label: "ชื่อสินค้า",
          sortable: false,
          thStyle: "width: 50%"
        },
        {
          key: "amount",
          label: "จำนวนสินค้า",
          class: 'text-right',
          sortable: false,
          thStyle: "width: 10%"
        },
        {
          key: "itemPerPrice",
          label: "ราคาสินค้า",
          class: 'text-right',
          sortable: false,
          thStyle: "width: 10%"
        },
        {
          key: "total",
          label: "รวม",
          class: 'text-right',
          sortable: false,
          thStyle: "width: 10%"
        }
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  methods: {
    salesHistory(ctx) {
      const params =
        "?paginator.offset=" +
        (this.currentPage - 1) * this.perPage +
        "&paginator.limit=" +
        this.perPage;
      this.isBusy = true;
      let promise = axios.get(`${config.dev.API_URI}/api/sales/list` + params);

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
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>