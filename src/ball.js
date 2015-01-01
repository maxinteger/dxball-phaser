export class Ball extends Phaser.Sprite{
	constructor (game){
		super(game, game.world.centerX, game.world.centerY, 'ball');

		game.add.existing(this);
		game.physics.p2.enable(this);
		this.scale.set(0.2);
		this.body.fixedRotation = true;
	}
}

Ball.preload = function(game){
	game.load.image('ball', 'assets/sprites/ball.png');
};
