// Sofia Aminifard
// Rocket Patrol: The Booming
// Hours took: 5ish

// My Mods:
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
// Display the time remaining (in seconds) on the screen (3)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
// Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)
// Allow the player to control the Rocket after it's fired (1)
// Create a new title screen (e.g., new artwork, typography, layout) (3)
// Total points: 21

// Sources:
// Particles: perplexity.ai


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;
