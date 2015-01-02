const TRAY_HEIGHT = 20,
	SPEED = 10;

export class Tray extends Phaser.Sprite{
	constructor(game){
		this.game = game;

		super(game, game.world.centerX, game.world.height - TRAY_HEIGHT, 'tray');
		this.anchor.setTo(0.5, 1);
		this.scale.set(5, 0.5);

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.collideWorldBounds = true;
		this.body.immovable = true;

		game.add.existing(this);
	}

	update (){
		var game = this.game;
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.x -= SPEED;
			this.frame = 0;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.x += SPEED;
			this.frame = 2;
		}
	}
}

Tray.preload = function(game){
	game.load.image('tray', 'assets/sprites/tray-base.png');
};
