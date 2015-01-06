export class Ball extends Phaser.Sprite{
	constructor (game){
		super(game, game.world.centerX, game.world.centerY, 'ball');
		this.game = game;
		this.scale.set(0.2);
		this.anchor.setTo(0.5, 0.5);

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.collideWorldBounds = true;
		this.body.bounce.set(1);
		this.body.fixedRotation = true;
		this.body.velocity.y = -200;

		game.add.existing(this);
	}
}

Ball.preload = function(game){
	game.load.image('ball', 'assets/sprites/ball.png');
};
