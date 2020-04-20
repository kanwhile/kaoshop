<template>
  <div>
    <b-card class="mb-3" title="รายการสินค้าทั้งหมด">
      <b-row>
        <b-col>
          <b-button
            variant="outline-primary"
            size="sm"
            @click="newproductBtn($event.target)"
            class="mr-1"
          >เพิ่มสินค้า</b-button>
        </b-col>
        <b-col class="my-2">
          <b-form-group
            label="ค้นหา"
            label-cols-sm="8"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="พิมพ์ชื่อสินค้าทีต้องการค้นหา"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">ยกเลิก</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Main table element -->
      <b-table
        id="my-table"
        striped
        hover
        :filter="filter"
        :items="products"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template v-slot:table-busy>
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>กำลังโหลดข้อมูล...</strong>
          </div>
        </template>
        <template v-slot:cell(index)="data">{{ data.index + 1 }}</template>
        <template
          v-slot:cell(defaultBuyingPrice)="row"
        >{{row.item.defaultBuyingPrice | formatNumber}}</template>
        <template
          v-slot:cell(profit)="row"
        >{{row.item.defaultSellingPrice - row.item.defaultBuyingPrice | formatNumber}}</template>
        <template
          v-slot:cell(defaultSellingPrice)="row"
        >{{row.item.defaultSellingPrice | formatNumber}}</template>
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
    <!-- New product modal -->
    <b-modal
      size="xl"
      :id="newProductModal.id"
      :title="newProductModal.title"
      @hide="resetInfoModal"
      @ok="addProduct"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ชื่อสินค้า:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                size="sm"
                v-model="newProductModal.productName"
                placeholder="กรุณากรอก"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">รายละเอียด:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                size="sm"
                v-model="newProductModal.description"
                placeholder
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ราคาขาย:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                size="sm"
                type="number"
                v-model.number="newProductModal.defaultSellingPrice"
                placeholder="Enter your price"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ราคาต้นทุน:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                type="number"
                size="sm"
                v-model.number="newProductModal.defaultBuyingPrice"
                placeholder="Enter your price"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ประเภทสินค้า:</label>
            </b-col>
            <b-col sm="10">
              <b-form-select
                v-model="newProductModal.productGroupId"
                :options="optionGroups"
                value-field="id"
                text-field="groupName"
              ></b-form-select>
            </b-col>
          </b-row>          
        </b-container>
      </form>
    </b-modal>
    <!-- Info modal -->
    <b-modal
      size="xl"
      :id="infoModal.id"
      :title="infoModal.title"
      @hide="resetInfoModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ชื่อสินค้า:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                size="sm"
                v-model="infoModal.productName"
                placeholder="กรุณากรอก"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">รายละเอียด:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="input-small" size="sm" v-model="infoModal.description" placeholder></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ราคาขาย:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                size="sm"
                type="number"
                v-model.number="infoModal.defaultSellingPrice"
                placeholder="Enter your price"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ราคาต้นทุน:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                type="number"
                size="sm"
                v-model.number="infoModal.defaultBuyingPrice"
                placeholder="Enter your price"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ประเภทสินค้า:</label>
            </b-col>
            <b-col sm="10">
              <b-form-select
                disabled
                v-model="infoModal.productGroupId"
                :options="optionGroups"
                value-field="id"
                text-field="groupName"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
            </b-col>
            <b-col sm="10">
              <b-button
            variant="outline-danger"
            size="sm"
            @click="deleteProduct($event.target)"
            class="mr-1"
          >ลบรายการสินค้า</b-button>
            </b-col>
          </b-row>
        </b-container>
      </form>
    </b-modal>
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
          lable: "#",
          key: "index"
        },
        {
          key: "productCode",
          label: "รหัสสินค้า"
        },
        {
          key: "productName",
          label: "สินค้า",
          thStyle: "width: 50%"
        },
        {
          key: "defaultBuyingPrice",
          label: "ต้นทุน"
        },
        {
          key: "profit",
          label: "กำไร"
        },
        {
          key: "defaultSellingPrice",
          label: "ราคาขาย"
        },
        {
          key: "actions",
          label: "",
          class: "text-center"
        }
      ],
      filter: "",
      infoModal: {
        id: "info-modal",
        title: "",
        productName: "",
        description: "",
        defaultBuyingPrice: 0,
        defaultSellingPrice: 0,
        productCode: "",
        productGroupId: null
      },
      newProductModal: {
        id: "new-product-modal",
        title: "",
        productName: "",
        description: "",
        defaultBuyingPrice: 0,
        defaultSellingPrice: 0,
        productCode: "",
        productGroupId: null
      },
      optionGroups: []
    };
  },
  methods: {
    products(ctx) {
      const params =
        "?paginator.offset=" +
        (this.currentPage - 1) * this.perPage +
        "&paginator.limit=" +
        this.perPage +
        "&filter.searchString=" +
        ctx.filter;
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
    },
    fetchProductGroup() {
      axios
        .get(
          `${config.dev.API_URI}/api/ProductGroups?paginator.offset=0&paginator.limit=1000`
        )
        .then(response => (this.optionGroups = response.data.value));
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return;
      // }
      // Push the name to submitted names
      this.updateProduct();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide(this.infoModal.id);
      });
    },
    info(item, index, button) {
      this.infoModal.title = `${item.productCode} ${item.productName}`;
      this.infoModal.productName = item.productName;
      this.infoModal.description = item.description;
      this.infoModal.defaultBuyingPrice = item.defaultBuyingPrice;
      this.infoModal.defaultSellingPrice = item.defaultSellingPrice;
      this.infoModal.productCode = item.productCode;
      this.infoModal.productId = item.id;
      this.infoModal.productGroupId = item.productGroupId;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    newproductBtn(button){
      this.newProductModal.productName = "";
      this.newProductModal.description = "";
      this.newProductModal.defaultBuyingPrice = 0;
      this.newProductModal.defaultSellingPrice = 0;
      this.newProductModal.productGroupId = "";
      this.$root.$emit("bv::show::modal", this.newProductModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    async addProduct() {
      await axios.post(
        `${config.dev.API_URI}/api/Products`,
        {
          productCode: this.newProductModal.productCode,
          productName: this.newProductModal.productName,
          description: this.newProductModal.description,
          productGroupId: this.newProductModal.productGroupId,
          defaultBuyingPrice: parseFloat(this.newProductModal.defaultBuyingPrice),
          defaultSellingPrice: parseFloat(this.newProductModal.defaultSellingPrice)
        }
      );
      await this.$root.$emit("bv::refresh::table", "my-table");
    },
    async updateProduct() {
      await axios.patch(
        `${config.dev.API_URI}/api/Products/${this.infoModal.productId}`,
        {
          productCode: this.infoModal.productCode,
          productName: this.infoModal.productName,
          description: this.infoModal.description,
          productGroupId: this.infoModal.productGroupId,
          defaultBuyingPrice: parseFloat(this.infoModal.defaultBuyingPrice),
          defaultSellingPrice: parseFloat(this.infoModal.defaultSellingPrice)
        }
      );
      await this.$root.$emit("bv::refresh::table", "my-table");
    },
    async deleteProduct(){
      await axios.delete(
        `${config.dev.API_URI}/api/Products/${this.infoModal.productId}`
      );
      await this.$root.$emit("bv::refresh::table", "my-table");
      
      this.$nextTick(() => {
        this.$bvModal.hide(this.infoModal.id);
      });
    }
  },
  mounted() {
    this.fetchProductGroup();
  }
};
</script>