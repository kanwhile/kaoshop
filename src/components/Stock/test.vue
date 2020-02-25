<template>
  <div id="app">
    <b-table
      :striped="stripped"
      small
      responsive="sm"
      :items="itemsProvider"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      @row-clicked="rowClicked"
    >
      <template slot="name" slot-scope="data">
        <strong>{{ data.item.email }}</strong>
      </template>
      <template slot="quantity" slot-scope="data">
        <strong>{{ data.item.first_name }}</strong>
      </template>
    </b-table>
    <b-pagination
      size="sm"
      ref="pagination"
      :total-rows="totalRows"
      :per-page="perPage"
      v-model="currentPage"
      prev-text="Prev"
      next-text="Next"
      hide-goto-end-buttons
    />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Items",
  data: () => {
    return {
      stripped: true,
      totalRows: 0,
      perPage: 2,
      currentPage: 1,
      fields: [{ key: "email" }, { key: "first_name" }]
    };
  },
  computed: {
    itemsTableContext() {
      return this.$store.getters.itemsTableContext;
    }
  },
  mounted() {
    console.log("Context: " + JSON.stringify(this.itemsTableContext));
    if (this.itemsTableContext) {
      this.currentPage = this.itemsTableContext.currentPage;
    }
  },
  methods: {
    itemsProvider(ctx) {
      console.log("Provider context: " + JSON.stringify(ctx));
      this.$store.dispatch("itemsTableContext", ctx);
      const promise = axios.get(
        "https://reqres.in/api/users?page=" +
          ctx.currentPage +
          "&per_page=" +
          this.perPage
      );
      return promise
        .then(data => {
          this.items = data.data.data;
          this.totalRows = data.data.total;
          return this.items;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    rowClicked() {
      this.$router.push({ path: "/item" });
    }
  }
};
</script>