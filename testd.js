var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example',
{ preload: preload, create: create, update: update});

function preload() {
	game.load.spritesheet('01', 'tour.png', 40, 80);

    game.load.tilemap('jeu', 'jeu.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assetsvm.png');
}

var antenne_posable = [32, 33, 41, 42, 43, 11, 51, 21, 22, 23, 31,71,81,92,93,91,73,72];

var pos_antennes = [];
var antenne;
var currentPoint;
var over = false;
var width = 40;

var map;
var layer;

var W = 1280;
var H = 720;

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

function zeros(dimensions) {
    var array = [];
    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;

}


function create() {

    game.stage.backgroundColor = '#787878';
    map = game.add.tilemap('jeu');
    map.addTilesetImage('niveau1', 'tiles');
    layer = map.createLayer('World1');
    layer.resizeWorld();

	currentPoint = game.add.image(750,50,'01');
	currentPoint.anchor.set(0.5);
    currentPoint.visible = false;

	game.input.onTap.add(onTapHandler, this);
    var traceur = zeros([H/width,W/width]);
    traceur[4][29] = 1;
    console.log(traceur);
}

function onTapHandler() {

    if (!over)

    var flag = true;
    {
        var posx = ((Math.trunc(game.input.activePointer.position.x/width)+1)*width - Math.trunc(width/2));
        var posy = ((Math.trunc(game.input.activePointer.position.y/width)+1)*width - Math.trunc(width/2));
        var grille_x = Math.trunc(posx/width);
        var grille_y = Math.trunc(posy/width);
        for (i = 0 ; i < pos_antennes.length ; i++ ){
            if (arraysEqual(pos_antennes[i],[posx,posy])){
                flag = false;
                break;
            }
        }

        console.log("valeur de la tuille->",(map.layers[0].data[grille_y][grille_x].index),"pos de la grille->",grille_y,grille_x);
        if (flag == true &&(antenne_posable.indexOf(map.layers[0].data[grille_y][grille_x].index)) != -1 ){
            var img = game.add.sprite(posx,posy, '01', 1);
            pos_antennes.push([posx,posy]);
            img.anchor.set(0.5,0.8);
//            console.log(pos_antennes.length);
        }

    }
}

function update() {

	currentPoint.position.copyFrom(game.input.activePointer.position);
}


