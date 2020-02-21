<template>
  <b-container fluid>
    <b-row v-if="!IsPayment">
      <b-col cols="7">
        <b-card>
          <h4>ค้นหารายการสินค้า</h4>
          <b-form-group id="input-group-1" label="ค้นหาสินค้า:" label-for="input-1">
            <b-form-input
              v-model="keyword"
              type="text"
              placeholder="ระบุชื่อ"
              @keypress="fetchProduct"
            ></b-form-input>
          </b-form-group>

          <b-list-group v-for="(item, i) in products" :key="`A-${i}`">
            <b-list-group-item>
              {{ item.productName }} ราคา {{item.defaultSellingPrice}} บาท
              <b-button variant="outline-primary" v-on:click="addItems(item)">ซื้อ</b-button>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="รายการสินค้าที่ซื้อ">
          <b-table :items="items" :fields="fields" show-empty>
            <!-- A custom formatted column -->
            <template v-slot:cell(productName)="data">
              <b class="text-primary">{{data.index + 1}}. {{ data.value}}</b>
            </template>
            <template v-slot:cell(defaultSellingPrice)="data">
              <b class="text-danger">{{ data.value}}</b>
            </template>
            <template v-slot:cell(action)="row">
              <b-button variant="outline-danger" size="sm" @click="removeItems(row.item)">ลบ</b-button>
            </template>
            <template v-slot:empty>
              <h4 class="text-center">ไม่มีรายการสินค้า</h4>
            </template>
            <template v-slot:footer()="data">{{data.label}}</template>
          </b-table>
          สินค้าจำนวน {{items.length}} รายการ รวมเป็นเงิน
          <b
            class="text-danger"
          >{{formatPrice(totalPrice)}}</b> บาท
          <b-button variant="outline-primary" @click="IsPayment = !IsPayment">ชำระเงิน</b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center" v-if="IsPayment">
      <b-col md="5">
        <b-card>
          <b-card-body>
            <h1 class="text-danger text-right">จำนวนเงินที่ต้องชำระ {{formatPrice(totalPrice)}} บาท</h1>

            <b-form-group
              label="จำนวนเงินที่รับมา"
              label-for="input-payment"
              description="กรอกจำนวนเงินที่รับจากลูกค้า"
            >
              <b-form-input
                id="input-payment"
                v-model="payment"
                size="lg"
                required
                placeholder="ระบุจำนวนเงินที่รับมา"
                @change="paymentDifferent()"
              ></b-form-input>
            </b-form-group>
            <h1 class="text-right">เงินทอน {{formatPrice(paymentChange)}} บาท</h1>
            <div>
              <b-button
                block
                variant="outline-warning"
                size="lg"
                @click="IsPayment = !IsPayment"
              >ตรวจสอบอีกครั้ง</b-button>
              <b-button
                block
                variant="success"
                size="lg"
                @click="addPayment"
                :disabled="paymentChange <= 0"
              >ยืนยันชำระเงิน</b-button>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import axios from "axios";
import * as config from "../../config/index.js";

export default {
  name: "sale",
  data() {
    return {
      keyword: "",
      IsPayment: false,
      items: [],
      products: [],
      payment: null,
      fields: [
        {
          key: "productName",
          label: "สินค้า",
          sortable: true
        },
        {
          key: "defaultSellingPrice",
          label: "ราคา",
          sortable: false
        },
        {
          key: "action",
          label: "",
          sortable: false
        }
      ]
    };
  },
  computed: {
    averageScore: function() {
      var sum = this.datas.reduce(function(accumulate, data) {
        return accumulate + Number(data.score);
      }, 0);
      return (sum / this.datas.length).toFixed(2);
    },
    totalPrice: function() {
      var sum = this.items.reduce(
        (sum, key) => sum + parseFloat(key.defaultSellingPrice || 0),
        0
      );
      return sum.toFixed(2);
    },
    paymentChange: function() {
      return this.payment - this.totalPrice;
    }
  },
  methods: {
    fetchProduct: function() {
      if (this.keyword != undefined && this.keyword != "") {
        axios
          .get(`${config.dev.API_URI}/api/sales?name=${this.keyword}`)
          .then(response => (this.products = response.data.value));
        console.log(this.products);
      } else {
        this.products = [];
      }
    },

    addPayment: function() {
      axios
        .post(`${config.dev.API_URI}/api/sales/create`, this.items)
        //.post(`https://localhost:44311/api/sales/create`, this.items)
        .then(() => {
          alert("สำเร็จ");
          this.keyword = "";
          this.IsPayment = false;
          this.items = [];
          this.products = [];
          this.payment = null;
          this.paymentChange = 0;
          this.totalPrice = 0;
        })
        .catch(error => {
          alert(error);
        });
    },

    addItems: function(item) {
      this.items.push(item);
      this.summaryPrice();
    },
    removeItems: function(item) {
      this.items.splice(
        this.items.findIndex(v => v.id === item.id),
        1
      );
      this.summaryPrice();
    },
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {
    this.fetchProduct();
  }
};
</script>