class Block extends Phaser.Sprite{
	constructor (game){
		super(game);
	}
}

export function blockFactory(game){
	return new Block(game);
}
