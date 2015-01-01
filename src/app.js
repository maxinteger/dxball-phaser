function preload() {
	game.load.image('einstein', 'assets/pics/ra_einstein.png');
}

function create() {
	game.add.sprite(0, 0, 'einstein');
}

export var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'container', { preload, create });
