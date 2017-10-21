<template>
  <div class="container has-text-centered">
    <div class="card">
      <div class="card-header"></div>
      <div class="card-content">
        <div class="content">
          <img id="twitch-logo" src="../../static/img/logo.png"/>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input class="input is-large" type="text" placeholder="Channel Name" v-model="channelName">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button @click="senseChannel" class="button is-link" :disabled="channelName.length < 3">Sense</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    senseChannel: function() {
      console.log(this.channelName)
      fetch(`http://localhost:3000/new/${this.channelName}`)
        .then((res) => {
           this.$router.push({path: '/stats'})
        })
    }
  },
  data () {
    return {
      channelName: ''
    }
  }
}
</script>

<style scoped>
  .card-header {
    background-color: #4c377c;
    color: white;
    padding: 10px 5px;
    text-align: center;
  }
  #twitch-logo {
    width: 80%;
    margin-bottom: 20px;
  }
  .card {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    bottom: 0;
    display: inline-block;
    margin-top: 15%;
  }
  .content {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border: #eeeeee solid 1px;
    padding: 30px;
  }
  .control, .button {
    width: 100%;
  }
</style>
