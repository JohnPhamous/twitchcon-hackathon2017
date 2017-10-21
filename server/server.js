let tmi = require('tmi.js')
let player = require('play-sound')()
let sentiment = require('sentiment')

let config = require('./config.json')

let options = {
    options: {
        debug: false
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

function playSound(sound) {
    console.log('Playing', sound)
    player.play('./sounds/' + sound, { timeout: 1000 }, (err) => {
        if (err) console.log(`Could not play sound: ${err}`);
    });
}

let client = new tmi.client(options)
client.connect()

client.on('chat', (channel, user, message, self) => {
    console.log(message, sentiment(message))
    if (sentiment(message).score > 3) {
        playSound('cena.mp3')
    }
    else {
        playSound('oh.mp3')
    }
})
