const TRAY_HEIGHT = 20;

export class Tray extends Phaser.Sprite{
	constructor(game, balls){
		super(game, this.lastX, game.world.height - TRAY_HEIGHT, 'tray');
		this.anchor.setTo(0.5, 1);
		this.scale.set(5, 0.5);

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.immovable = true;

		game.input.onUp.add(this.releaseBalls, this);
		game.add.existing(this);

		this.game = game;
		this.balls = balls;
		this.ballsOnTray = balls.slice(0);

		this.velocity = 0;
		this.lastX = game.world.centerX;

	}

	releaseBalls(){
		this.ballsOnTray.forEach((ball) => {
			ball.start();
			ball.body.velocity.x = this.velocity;
		});
		this.ballsOnTray.length = 0;
	}

	hit(tray, ball){
		ball.body.velocity.x = this.velocity;
		console.log(tray, ball);
	}

	update (){
		var game = this.game,
			mouseX = game.input.mousePointer.x;

		if(mouseX < this.width / 2){
			this.x = this.width / 2;
		} else if (mouseX > game.world.width - this.width / 2){
			this.x = game.world.width - this.width / 2;
		} else {
			this.x = game.input.mousePointer.x;
		}

		this.ballsOnTray.forEach((ball)=> ball.x = this.x);

		this.velocity = this.x - this.lastX;
		this.lastX = this.x;

		game.physics.arcade.collide(this, this.balls, console.log.bind(console));
	}
}

Tray.preload = function(game){
	game.load.image('tray', 'assets/sprites/tray-base.png');
};
