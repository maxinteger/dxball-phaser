import {Ball} from './ball.js';

var ball,
	bmd,
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'container', { preload, create, update, render });

function preload() {
	Ball.preload(game);
}

function create() {
	game.physics.startSystem(Phaser.Physics.P2JS);

	game.stage.backgroundColor = '#124184';

	bmd = game.add.bitmapData(800, 600);
	bmd.context.fillStyle = '#ffffff';

	game.add.sprite(0, 0, bmd);

	game.physics.p2.gravity.y = 100;
	game.physics.p2.restitution = 0.8;

	ball = new Ball(game);

	game.input.onDown.add(launch, this);
}

function launch() {
	if (game.input.x < ball.x){
		ball.body.velocity.x = -200;
		ball.body.velocity.y = -200;
	} else {
		ball.body.velocity.x = 200;
		ball.body.velocity.y = -200;
	}
}

function update() {
	bmd.context.fillStyle = '#ffff00';
	bmd.context.fillRect(ball.x, ball.y, 2, 2);
}

function render() {
	game.debug.spriteBounds(ball, 'red', false);
	game.debug.body(ball, 'blue', true);
}
