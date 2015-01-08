/**
 * Block class
 */
const _ = require('lodash');

const BLOCK_WIDTH = 30,
	  BLOCK_HEIGHT = 15;

class Block extends Phaser.Sprite{
	constructor (game, type, x, y){
		this.game = game;

		super(game, x, y, 'block1');
		this.anchor.setTo(0.5, 0.5);

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.immovable = true;

		game.add.existing(this);
	}

	hit(){
		this.destroy();
	}
}

export function blockPreload(game){
	game.load.image('block1', 'assets/sprites/block1.png');
}

export function blockManager(game, balls){
	var blocks = [];

	function create(type, x, y) {
		var block = new Block(game, type, x, y);
		blocks.push(block);
		return block;
	}

	function createRandom(number=20){
		var nx = Math.floor(game.world.width / BLOCK_WIDTH),
			ny = Math.floor((game.world.height / 2) / BLOCK_HEIGHT),
			acc = [];

		_.range(number).forEach(function(i){
			var x, y;
			do{
				[x, y] = [_.random(nx), _.random(ny)];
			} while (acc.indexOf(x + '' + y) !== -1);
			acc.push(x + '' + y);
			create(null, x * BLOCK_WIDTH, y * BLOCK_HEIGHT);
		});
	}

	function getBlocks(){
		return blocks;
	}

	function collision(block, ball){
		block.hit(true);
	}

	function update(){
		game.physics.arcade.collide(blocks, balls, collision);
	}

	return {create, createRandom, update, getBlocks};
}
