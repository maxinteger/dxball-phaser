export class Ball extends Phaser.Sprite{
	constructor (game){
		super(game, game.world.centerX, game.world.centerY, 'ball');

		game.add.existing(this);
		this.scale.set(0.2);
		game.physics.p2.enable(this);
		this.body.fixedRotation = true;
		this.body.setCircle(20);
	}
}

Ball.preload = function(game){
	game.load.image('ball', 'assets/sprites/ball.png');
};
