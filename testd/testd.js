var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example',
{ preload: preload, create: create, update: update});

function preload() {
	game.load.spritesheet('01', 'tour.png', 40, 40);
	game.load.spritesheet('02', 'tour.png', 40, 40);

    game.load.tilemap('jeu', 'jeu.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assetsvm.png');
}

var points = [];
var pos_antennes = [];
var antenne;
var coorMaison = [[250,250,false],[375,400,false]]
var currentPoint;
var over = false;
var rayon = 300;
var width = 40;

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

function create() {


    game.stage.backgroundColor = '#787878';
    map = game.add.tilemap('jeu');
    map.addTilesetImage('niveau1', 'tiles');
    layer = map.createLayer('World1');
    layer.resizeWorld();

    game.stage.backgroundColor = 0xffffff;

	//Placement de l'image
	currentPoint = game.add.image(750,50,'01');
	currentPoint.anchor.set(0.5);
    currentPoint.visible = false;

	antenne = game.add.image(-100, -100, '01', 1);
    antenne.anchor.set(0.5);
    antenne.visible = false;

	game.input.onTap.add(onTapHandler, this);
    console.log(map.layers[0].data[0][0].index);


}

function onTapHandler() {

    if (!over)

    var flag = true;
    {
        console.log(pos_antennes,pos_antennes.length);
        var posx = ((Math.trunc(game.input.activePointer.position.x/width)+1)*width - Math.trunc(width/2));
        var posy = ((Math.trunc(game.input.activePointer.position.y/width)+1)*width - Math.trunc(width/2));
        for (i = 0 ; i < pos_antennes.length ; i++ ){
            if (arraysEqual(pos_antennes[i],[posx,posy])){
                flag = false;
                break;
            }
        }
        if (flag == true){
            var img = game.add.sprite(posx,posy, '02', 0);
            pos_antennes.push([posx,posy]);
            points.push(img.position);
            img.anchor.set(0.5,0.5);
        }


        circle = new Phaser.Circle(posx, posy, rayon);
        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(1, 0x00ff00, 1);
        graphics.drawCircle(circle.x, circle.y, circle.diameter);


    }
}

function update() {

//    console.log(jeu.tiles);

	currentPoint.position.copyFrom(game.input.activePointer.position);
}


