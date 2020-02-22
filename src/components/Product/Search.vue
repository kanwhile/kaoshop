<template>
  <b-card>
    <h4>ค้นหารายการสินค้า</h4>
    <b-form-group id="input-group-1" label="ค้นหาสินค้า:" label-for="input-1">
      <b-form-input v-model="keyword" type="text" placeholder="ระบุชื่อ" v-on:keyup="fetchProduct"></b-form-input>
    </b-form-group>

    <b-list-group v-for="(item, i) in products" :key="`A-${i}`">
      <b-list-group-item>
        {{ item.productName }} ราคา {{item.defaultSellingPrice}} บาท
        <b-button variant="outline-primary" v-on:click="handleClick(item)">ซื้อ</b-button>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>


<script>
import axios from "axios";
import * as config from "../../config/index.js";

import {mapActions} from 'vuex'

export default {
  name: "sale",
  data() {
    return {
      keyword: "",
      products:[]
    };
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
    ...mapActions({
      setProduct: 'stockform/setProduct'
    }),
    handleClick (item) {
      this.setProduct(item)
    },
  },
  mounted() {
    this.fetchProduct();
  }
};
</script>