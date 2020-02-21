<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="row">
          <div class="col-12">
            <div class="page-title-box">
              <h4 class="page-title">Dashboard</h4>
            </div>
          </div>
        </div>
        <b-row>
          <b-col md="5">
            <b-row>
              <b-col>
                <card-item text-title="ยอดขาย" number="36254" text-sub="รายวัน"></card-item>
              </b-col>
              <b-col>
                <card-item text-title="ยอดขาย" number="36254" text-sub="รายวัน"></card-item>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <card-item text-title="ยอดขาย" number="36254" text-sub="รายวัน"></card-item>
              </b-col>
              <b-col>
                <card-item text-title="ยอดขาย" number="36254" text-sub="รายวัน"></card-item>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="7">
            <chart-item></chart-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card class="mb-3">
              <h4>
                สินค้าขายดี
                <small>(เดือน กุมภาพันธ์)</small>
              </h4>
              <b-table striped hover :items="items"></b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card class="mb-3">
              <h4>
                ประวัติการขาย
                <small>(เดือน กุมภาพันธ์)</small>
              </h4>
              <b-table striped hover :items="items"></b-table>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import cardItem from "../components/Card/Card.vue";
import chartItem from "../components/Chart.vue";
export default {
  components: {
    "card-item": cardItem,
    "chart-item": chartItem
  },
  data() {
    return {
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  }
};
</script>