<template>
  <b-card class="mb-3">
    <h4>ยอดขายรายเดือน</h4>
    <apexchart type="bar" height="230" :options="chartOptions" :series="series" ></apexchart>
  </b-card>
</template>
<script>
export default {
  name: "chartItem",
  data() {
    return {
      series: [
        {
          name: "ปี 2563",
          color: "#00BD39",
          data: [12000, 14000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "ปี 2562",
          color: "",
          data: [
            24000,
            54000,
            34000,
            38000,
            22000,
            43000,
            21000,
            12000,
            32000,
            33000,
            41000,
            65000
          ]
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true
        },
        xaxis: {
          categories: [
            "ม.ค.",
            "ก.พ.",
            "มี.ค.",
            "เม.ย.",
            "พ.ค.",
            "มิ.ย",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค."
          ]
        },
        yaxis: {
          tickAmount: 5,
          decimalsInFloat: undefined
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1
        },
        colors: ["#00BD39", "#e3eaef"],
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " บาท";
            }
          }
        }
      }
    };
  }
};
</script>