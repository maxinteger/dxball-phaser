import {blockPreload, blockManager} from './block.js';
import {Ball} from './ball.js';
import {Tray} from './tray.js';

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'container', { preload, create, update }),
	BM,
	ball,
	tray,
	block,
	bmd;

function preload() {
	Ball.preload(game);
	Tray.preload(game);
	blockPreload(game);
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = '#000000';

	bmd = game.add.bitmapData(800, 600);
	bmd.context.fillStyle = '#ffffff';
	game.add.sprite(0, 0, bmd);

	ball = new Ball(game);
	tray = new Tray(game, [ball]);
	BM = blockManager(game, [ball]);

	BM.createRandom();
}

function update() {
	bmd.context.fillStyle = '#ffff00';
	bmd.context.fillRect(ball.x, ball.y, 1,1);

	game.physics.arcade.collide(tray, ball);
	BM.update();
}
