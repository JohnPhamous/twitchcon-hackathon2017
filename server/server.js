let tmi = require('tmi.js')
let player = require('play-sound')()
let sentiment = require('sentiment')
let express = require('express')

let config = require('./config.json')

let app = express()


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

function playSound(sound) {
    console.log('Playing', sound)
    player.play('./sounds/' + sound, (err) => {
        if (err) console.log(`Could not play sound: ${err}`);
    });
}

let pointsExport = []
let absSum = 0
let posSum = 0
let negSum = 0
let emojiSum = 0
let messageCount = 0
let currentMessage = ''
let previousMessage = '0'
let currentMessageTokens = []
let client
let isStreaming = false
let messageCnt = 0
let randomMax = Math.floor(Math.random() * 15) + 1

function connect() {
    if (isStreaming) {
        client.disconnect()
    }

    client = new tmi.client(options)
    client.connect()
    
    client.on('chat', (channel, user, message, self) => {
        // console.log(message, sentiment(message))
        messageCount++
        let currentScore = sentiment(message).score
        pointsExport.push(currentScore)
        currentMessage = message
        currentMessageTokens = sentiment(message).tokens
        console.log(currentMessageTokens)
        // console.log(posSum, negSum, absSum)

        if (currentScore === 0) {
            currentScore = Math.random() * (5 + 5) - 5;
        }
        if (currentScore > 0) {
            absSum += currentScore
            posSum += currentScore
        }
        else {
            absSum += currentScore * -1
            negSum += currentScore * -1
        }
        // 4 - 5
        if (messageCnt % randomMax === 0) {
            messageCnt = 0
            randomMax = Math.floor(Math.random() * 15) + 1
            if (currentScore > 4 && currentScore <= 5) {
                playSound('cena.mp3')
            }
            // 3 - 4
            else if (currentScore > 3 && currentScore <= 4) {
                playSound('nigra.mp3')
            }
            // 2 - 3
            else if (currentScore > 2 && currentScore <= 3) {
                playSound('deez.mp3')
            }
            // 1 - 2
            else if (currentScore > 0 && currentScore <= 2) {
                playSound('jeff.mp3')
            }
            else if (currentScore > -2 && currentScore < 0) {
                playSound('youlike.mp3')
            }
            else {
                playSound('violin.mp3')
            }
        }
        messageCnt++
    })

    isStreaming = true
}

connect()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/data', (req, res) => {
    res.send(pointsExport)
    console.log(pointsExport)
    pointsExport.length = 0
})

// Used for the stats page
app.get('/song', (req, res) => {
    res.send([posSum / absSum, 0, negSum / absSum, messageCount, currentMessage, options.channels[0], currentMessageTokens])  
})

app.get('/stop', (req, res) => {
    console.log('closing')
    client.disconnect()
    isStreaming = false
    res.send('Stream closed')
})

app.get('/new/:newChannel', (req, res) => {
    console.log('Opening new stream')
    options.channels = ['#' + req.params.newChannel]
    pointsExport = []
    absSum = 0
    posSum = 0
    negSum = 0
    emojiSum = 0
    messageCount = 0
    currentMessage = ''
    connect()
    res.send(req.params.newChannel)
})
app.listen(3000)
