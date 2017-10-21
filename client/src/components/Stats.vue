<template>
  <div>
      <div id="stats">
        <canvas id="canvas"></canvas>
        <router-link to="/" class="button is-link">Sense Another Stream</router-link>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  mounted: function () {
    let MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let color = Chart.helpers.color
    let barChartData = {
      labels: ["Negative Messages", "Emojis", "Positive Messages"],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [
          randomScalingFactor() % 6,
          randomScalingFactor() % 6,
          randomScalingFactor() % 6
        ]
      }]
    }
    let ctx = document.getElementById("canvas").getContext("2d")

    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
          display: false,
          labels: {
          fontColor: '#FFF'
          }
        },
        title: {
          display: false,
        },
        scales: {
          yAxes: [{
            display: true,
            
            ticks: {
              fontColor: "white",
              min: -5,
              max: 5,
              fontSize: 18,
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 14,
            }
          }]
        }
      }
    })
  }
}


</script>

<style>
#stats {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>


