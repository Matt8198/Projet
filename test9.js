
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update});

var graphics;
var maxRayon = 300;
var interRayon = 100;
var map;
var layer;


var antenne;
var coorMaison = [[250,250,false],[375,400,false]]
var currentPoint;
var over = false;
var rayon = 300;
var width = 40;
var antennes = [];

var graphics;
var map;
var layer;


function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function preload() {
	
	game.load.spritesheet('01', 'tour.png', 40, 40);
	
	game.load.spritesheet('02', 'tour.png', 40, 40);
	
    game.load.tilemap('jeu', 'jeu.json', null, Phaser.Tilemap.TILED_JSON);
	
    game.load.image('tiles', 'assetsv3.png');
	

}

function create() {

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('jeu');

    map.addTilesetImage('niveau1', 'tiles');
	    
    layer = map.createLayer('World1');

    layer.resizeWorld();
	
	//Placement de l'image
	currentPoint = game.add.image(750,50,'01');
	currentPoint.anchor.set(0.5);
    currentPoint.visible = false;

	antenne = game.add.image(-100, -100, '01', 1);
    antenne.anchor.set(0.5);
    antenne.visible = false;

	game.input.onTap.add(onTapHandler, this);
    console.log(map.layers[0].data[0][0].index);
	
	graphics = game.add.graphics(0, 0);	

}

function onTapHandler() {

    if (!over)

    var flag = true;
    {
        console.log(antennes.length);
        var posx = ((Math.trunc(game.input.activePointer.position.x/width)+1)*width - Math.trunc(width/2));
		var posy = ((Math.trunc(game.input.activePointer.position.y/width)+1)*width - Math.trunc(width/2));
        for (i = 0 ; i < antennes.length ; i++ ){
            if (arraysEqual([antennes[i].x,antennes[i].y],[posx,posy])){
                flag = false;
                break;
            }
        }
        if (flag == true){
            var antenne = game.add.sprite(posx,posy, '02', 0);
            antennes.push(antenne);
            antenne.anchor.set(0.5,0.5);
			antenne.onde = new Array();
			antenne.onde[0] = new Phaser.Circle(posx, posy,1);
		
			console.log(antennes);
		}
    }
}

function update(){

	graphics.clear();
	graphics.lineStyle(2, 0x0000ff, 1);
		
	for (var a=0; a<antennes.length; a++) {
		var antenne = antennes[a];
		for (var i=0; i<antenne.onde.length; i++) {
			var circle = antenne.onde[i];
			circle.setTo(circle.x, circle.y, circle.diameter+1);
			if (circle.diameter == interRayon) {
				antenne.onde.push(new Phaser.Circle(antenne.x, antenne.y,1));
			}
			if (circle.diameter == maxRayon) {
				antenne.onde.splice(i,1);
			}
			graphics.drawCircle(circle.x, circle.y, circle.diameter);
		}	
	}
		
	currentPoint.position.copyFrom(game.input.activePointer.position);
}



