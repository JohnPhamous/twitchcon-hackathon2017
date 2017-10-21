<template>
  <div>
      <div id="stats">
        <center>
          <h1 id="currentChannel">#channel</h1>
          <h1><span id="currentMessage"></span></h1>
          <h1>Number of Messages: <span id="numMessage"></span></h1>
        </center>
        <canvas id="canvas"></canvas>
        <center><router-link to="/" class="button is-link">Sense Another Stream</router-link></center>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  mounted: function () {
    let color = Chart.helpers.color
    let twitchData = {
      labels: ["Negative Messages", "Positive Messages"],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(window.chartColors.twitch).alpha(0.5).rgbString(),
        borderColor: window.chartColors.twitch,
        borderWidth: 1,
        data: [0, 0, 0]
      }]
    }
    let ctx = document.getElementById("canvas").getContext("2d")
    window.myBar = new Chart(ctx, {
      type: 'horizontalBar',
      data: twitchData,
      options: {
        animation: {
          duration: 0.1,
          onComplete: function () {
              let chartInstance = this.chart,
                  ctx = chartInstance.ctx
                  ctx.font = Chart.helpers.fontString(24, '', Chart.defaults.global.defaultFontFamily)
                  ctx.textAlign = 'center'
                  ctx.fillStyle = 'white'
                  ctx.textBaseline = 'bottom'

                  this.data.datasets.forEach(function (dataset, i) {
                      let meta = chartInstance.controller.getDatasetMeta(i)
                      meta.data.forEach(function (bar, index) {
                          let data = dataset.data[index]                            
                          ctx.fillText((data).toFixed(2) + '%', bar._model.x + 50, bar._model.y + 10)
                      })
                  })
              }
        },
        responsive: true,
        legend: {
          position: 'top',
          display: false,
          labels: {
          fontColor: '#FFF'
          }
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false,
        },
        scales: {
          yAxes: [{
            display: true,
            
            ticks: {
              fontColor: "white",
              fontSize: 18,
            }
          }],
          xAxes: [{
            display: false,
            ticks: {
              fontColor: "white",
              fontSize: 14,
              min: 0,
              max: 100
            }
          }]
        }
      }
    })

    let callCounter = 0
    window.setInterval(function(){
      window.myBar.update()
      fetch('http://localhost:3000/song')
        .then(function(data) {
          return data.json()
        })
        .then((res) => {
          console.log(res)
          twitchData.datasets[0].data[0] = res[0] * 100
          twitchData.datasets[0].data[1] = res[2] * 100

          let numDisplay = document.getElementById('numMessage')
          numDisplay.innerHTML = res[3]

          let currentMessage = document.getElementById('currentMessage')
          currentMessage.innerHTML = res[4]

          if (callCounter === 0) {
            let currentChannel = document.getElementById('currentChannel')
            // currentChannel.innerHTML = res[5]
            currentChannel.innerHTML = `<a href="https://www.twitch.tv/${res[5].slice(1, -1)}">${res[5]}</a>`
          }   
        })
        .catch(function(err) {
          console.log(err)
        })
    }, 100);
  }
}


</script>

<style>
#stats {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#currentMessage {
  font-size: 1.5em;
}
</style>


