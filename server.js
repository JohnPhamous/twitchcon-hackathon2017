let tmi = require('tmi.js')
let config = require('./config.json')
let player = require('play-sound')()


let options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: config.nickname,
        password: config.oauth
    },
    channels: config.channels
}

let client = new tmi.client(options)
client.connect()

client.on('chat', (channel, user, message, self) => {
    console.log('a@: ' + message)
    if(message.includes('bad')) {
        player.play('./sounds/cena.mp3', { timeout: 1000 }, (err) => {
            if (err) console.log(`Could not play sound: ${err}`);
        });
    }
})
