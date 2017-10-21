let irc = require('irc')
let config = require('./config.json')

let client = new irc.Client(config.server, config.nickname, {
    channels: config.channel
})

client.addListener("message", function(from, to, text, message) {
    console.log(message)
});
