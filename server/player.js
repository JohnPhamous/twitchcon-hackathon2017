const player = require('play-sound')();
player.play('./sounds/cena.mp3', (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
});
