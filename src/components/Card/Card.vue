<template>
  <b-card class="mb-3">
    <div class="float-right">
      <b-icon :icon="textIcon" class="widget-icon"></b-icon>
    </div>
    <h5 class="text-muted font-weight-normal mt-0" title="Number of Customers">{{textTitle}}</h5>
    <h3 class="mt-3 mb-3">{{formatPrice(number)}}</h3>
    <p class="mb-0 text-muted">
      <span class="text-success mr-2">
        <i class></i> 5.27%
      </span>
      <span class="text-nowrap">{{textSub}}</span>
    </p>
  </b-card>
</template>

<script>
export default {
  name: "cardItem",
  props: ["textTitle", "number", "textSub","textIcon"],
  data() {
    return {
      items: null
    };
  },
  methods: {
    formatPrice: function(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>
<style >
.widget-icon {
  color: #00BD39;
  background-color: rgba(114, 245, 131, 0.25);
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 3px;
  display: inline-block;
}
</style>