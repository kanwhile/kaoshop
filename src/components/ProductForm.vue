<template>
  <form id="app" @submit="checkForm">
    <h1 class="h3 mb-3">เพิ่มรายการสินค้า</h1>
    <div class="card">
      <div class="card-body">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ชื่อ:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="input-small" size="sm" v-model="name" placeholder="Enter your name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">รายละเอียด:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="input-small" size="sm" v-model="description" placeholder=""></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ราคา:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-small"
                size="sm"
                v-model="price"
                placeholder="Enter your price"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-small">ประเภทสินค้า:</label>
            </b-col>
            <b-col sm="10">
              <b-form-select v-model="groupid" :options="groups" size="sm" class="mt-3">
                <option
                  v-for="group in groups"
                  :key="group.id"
                  :value="group.id"
                >{{group.groupName}}</option>
              </b-form-select>
            </b-col>
          </b-row>
        </b-container>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import config from "../config/index.js";

export default {
  name: "productform",
  data: function() {
    return {
      errors: [],
      groups: null,
      name: null,
      price: null,
      groupid: null,
      products: []
    };
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();
      axios
        .post(`${config.dev.API_URI}/api/Product`, {
          ProductName: this.name,
          description: this.description,
          price: parseFloat(this.price),
          groupid: this.groupid
        })
        .then(response => this.products.push(response.data.value));
    },
    fetchProductGroup: function() {
      axios
        .get(`${config.dev.API_URI}/api/ProductGroups`)
        .then(response => (this.groups = response.data.value));
    },
    fetchProduct: function() {
      axios
        .get(`${config.dev.API_URI}/api/Products`)
        .then(response => (this.products = response.data.value));
    }
  },
  //  Vue.js 2 นั้นไม่มี ready ให้ใช้ มีแต่ mounted
  mounted() {
    this.fetchProductGroup();
  }
};
</script>