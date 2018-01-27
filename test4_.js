
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.tilemap('jeu', 'jeu.json', null, Phaser.Tilemap.TILED_JSON);
	
    game.load.image('tiles', 'assets3.png');

}

var map;
var layer;

function create() {

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('jeu');

    map.addTilesetImage('niveau1', 'tiles');
    
    layer = map.createLayer('World1');

    layer.resizeWorld();

}
