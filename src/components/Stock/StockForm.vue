<template>
  <div id="stock-form">
    <b-card>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group label="เลขที่เอกสาร:" label-for="input-1" description="เลขที่เอกสาร">
          <b-form-input v-model="form.DocumentNumber" type="text" placeholder="เลขที่เอกสาร"></b-form-input>
        </b-form-group>
        <b-form-group label="วันที่:" description="วันที่">
          <b-form-input v-model="form.WriteDate" type="text" placeholder="วันที่"></b-form-input>
        </b-form-group>
        <b-form-group label="วันที่:" description="วันที่">
          <b-form-input v-model="form.Sale" type="text" placeholder="วันที่"></b-form-input>
        </b-form-group>
        <b-form-group label="เลขประจำตัวผู้เสียภาษี:" description="เลขประจำตัวผู้เสียภาษี">
          <b-form-input v-model="form.TaxID" type="text" placeholder="เลขประจำตัวผู้เสียภาษี"></b-form-input>
        </b-form-group>
        <b-form-group label="ที่อยู่:" description="ที่อยู่">
          <b-form-input v-model="form.Address" type="text" placeholder="ที่อยู่"></b-form-input>
        </b-form-group>
        <b-form-group label="ผู้ติดต่อ:" description="ผู้ติดต่อ">
          <b-form-input v-model="form.Contact" type="text" placeholder="ผู้ติดต่อ"></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
            <b-card class="mb-3">
              <h4>รายการสั่งซื้อ</h4>
              <b-table :items="products" :fields="fields" show-empty fixed>
                <!-- A custom formatted column -->
                <template v-slot:cell(productName)="row">
                  <b class="text-primary">{{row.index + 1}}. {{ row.value}}</b>
                </template>
                <template v-slot:cell(quantity)="row" md="1">
                  <b-input v-model="row.value" type="number" @change="setQuantity(row)"></b-input>
                </template>

                <template v-slot:cell(action)="row">
                  <b-button variant="outline-danger" size="sm" @click="removeProduct(row.item)">ลบ</b-button>
                </template>
                <template v-slot:empty>
                  <h4 class="text-center">ไม่มีรายการสินค้า</h4>
                </template>
                <template v-slot:footer()="data">{{data.label}}</template>
              </b-table>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button type="submit" variant="outline-success">บันทึก</b-button>&nbsp;
            <b-button type="reset" variant="outline-warning">ยกเลิก</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import * as config from "../../config/index.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "stock-form",
  computed: {
    ...mapState({
      products: store => store.stockform.products
    })
  },
  data() {
    return {
      form: {
        DocumentNumber: "",
        WriteDate: "",
        Sale: "",
        TaxID: "",
        Address: "",
        Contact: "",
        SubTotal: 0,
        Discount: 0,
        Vat: 0,
        Total: 0
      },
      items: [],
      fields: [
        {
          key: "productName",
          label: "สินค้า",
          sortable: false,
          thStyle: "width: 50%"
        },
        {
          key: "defaultBuyingPrice",
          label: "ต้นทุน",
          sortable: false,
          thStyle: "width: 10%"
        },
        {
          key: "defaultSellingPrice",
          label: "ราคาขาย",
          sortable: false,
          thStyle: "width: 15%"
        },
        {
          key: "quantity",
          label: "จำนวน",
          sortable: false,
          thStyle: "width: 15%"
        },
        {
          key: "action",
          label: "",
          sortable: false,
          thStyle: "width: 10%"
        }
      ],
      show: true
    };
  },
  methods: {
    ...mapActions({
      removeProduct: "stockform/removeProduct",
      removeAllProduct: "stockform/removeAllProduct",
      setQuantity: "stockform/setQuantity"
    }),
    onSubmit(evt) {
      evt.preventDefault();
      let data = this.products.map(item => {
        return {
          id: item.id,
          minimum: 0,
          quantity: item.quantity,
          productId: item.id
        };
      });
      
      axios
        .post(`${config.dev.API_URI}/api/stock/addstock`, data)
        .then(() => {
          this.form = [];
          this.removeAllProduct();
        })
        .catch(error => {
          alert("Error : " + error);
        });
    },
    onReset() {
      this.$emit("eventBack", false);
    }
  }
};
</script>