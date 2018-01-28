var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example',
{ preload: preload, create: create});

var antenne_posable = [32, 33, 41, 42, 43, 11, 51, 21, 22, 23, 31,71,81,92,93,91,73,72];


var antennes = [];
var pos_antennes = [];
var pos_allume = [];
var antenne;
var currentPoint;
var over = false;
var width = 40;
var traceur = [];

var map;
var layer;

var W = 1280;
var H = 720;
var entry = [4,29];

function preload() {

    game.load.video('credits', 'creditsv1.mp4');
    game.load.spritesheet('01', 'tour.png', 40, 80);
    game.load.spritesheet('range', 'range3.png', 280, 280);

    game.load.spritesheet('1etoile', 'nv1.png', 960, 540);
    game.load.spritesheet('2etoile', 'nv2.png', 960, 540);
    game.load.spritesheet('3etoile', 'nv3.png', 960, 540);

    game.load.tilemap('jeu', 'jeu.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assetsvm.png')

    game.load.audio('musique','background.wav');
    game.load.audio('antenne','pose.mp3');

}

var video;
var sprite;
var music;
var antenne;

function create() {
	video = game.add.video('credits');

    video.onPlay.addOnce(start, this);

    sprite = video.addToWorld(640, 360, 0.5, 0.5);

    video.play();



}

function start() {

    //  After 5 seconds we'll swap to a new video
    game.time.events.add(28000, changeSource, this);

    //  This would swap on a mouse click
    // game.input.onDown.addOnce(changeSource, this);

}

function changeSource() {

    game.stage.backgroundColor = '#787878';
    map = game.add.tilemap('jeu');
    map.addTilesetImage('niveau1', 'tiles');
    layer = map.createLayer('World1');
    layer.resizeWorld();

	currentPoint = game.add.image(750,50,'01');
	currentPoint.anchor.set(0.5);
    currentPoint.visible = false;
	
	var antenne = game.add.sprite(29*40,5*40, '01', 1);
	antenne.onde=new Array();
	antenne.onde[0] = new Phaser.Circle(29*40,5*40,1);
    antennes.push(antenne);
	pos_antennes.push([4,29]);

    music= game.add.audio('musique');
    antennea= game.add.audio('antenne');
    music.loopFull();

    game.input.onTap.add(onTapHandler, this);
    traceur = zeros([H/width,W/width]);
    traceur[4][29] = 1;
    console.log("traceurbefore",traceur);
    var temp = motif(3,[4,29]);
    updateTraceur(traceur,temp);
    console.log("traceurafter",traceur);

}



function voisin(temp1,temp2){
    var a1 = motif(4,temp1);
    var a2 = motif(4,temp2);
    for (var i=0;i<a1.length;i++){
        for (var j=0;j<a2.length;j++){
            if ((a1[i][0]==a2[j][0]) && (a1[i][1]==a2[j][1]) ){
                return true;
            }
        }
    }
    return false;
}


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

function updateTraceur(vtraceur, coords) {
    for (i = 0 ; i < coords.length; i++){
        var cc_li = coords[i][0];
        var cc_col =coords[i][1];
        vtraceur[cc_li][cc_col] = 1;
    }
}

function motif(longueur,centre){
    var L = [];
    var c_lig = centre[0];
    var c_col = centre[1];
    for (i = 1 ; i < longueur + 1 ; i++){
        if ((0 <=(c_lig + (i - 1)) <= 17) && (0 <= c_col <= 31)){
            L.push([c_lig + (i - 1), c_col]);
            }
        for (j = 1 ; (j < longueur - i + 1); j++){
            if ((0 <= (c_lig + (i - 1)) <= 17) && (0<= c_col - j <= 31)){
                L.push([c_lig + (i - 1), c_col - j]);
            }
            if ((0 <= (c_lig + (i - 1)) <= 17) && (0 <= c_col + j <= 31)) {
                L.push([c_lig + (i - 1), c_col + j]);
            }
        }
    }

    for (pos = 0 ; pos < L.length ; pos++){

        i = L[pos][0];
        j = L[pos][1];

        if (i > c_lig){
            if ((0 <= (c_lig - (i - c_lig)) <= 17) >= 0 && (0 <= j <= 31)){
                L.push([c_lig - (i - c_lig), j])
            }
        }
    }
    return L;
}

var cpt=10;

function onTapHandler() {

    if (!over)

    var flag = true;
    {
        var posx = ((Math.trunc(game.input.activePointer.position.x/width)+1)*width - Math.trunc(width/2));
        var posy = ((Math.trunc(game.input.activePointer.position.y/width)+1)*width - Math.trunc(width/2));
        var grille_x = Math.trunc(posx/width);
        var grille_y = Math.trunc(posy/width);
        for (i = 0 ; i < antennes.length ; i++ ){
            if (arraysEqual([antennes[i].x,antennes[i].y],[posx,posy])){
                flag = false;
                break;
            }
        }

        console.log("valeur de la tuille->",(map.layers[0].data[grille_y][grille_x].index),"pos de la grille->",grille_y,grille_x);
        if (flag == true &&((antenne_posable.indexOf(map.layers[0].data[grille_y][grille_x].index)) != -1)  && (voisin(pos_antennes[pos_antennes.length-1],[grille_y,grille_x])==true) ){
            

            var range = game.add.sprite(posx,posy, 'range',1);
            var antenne = game.add.sprite(posx,posy, '01', 1);
			antenne.onde = new Array()
            antennes.push(antenne);
            pos_antennes.push([grille_y,grille_x]);
            var temp = motif(4,[grille_y,grille_x]);
            //updateTraceur(traceur,temp);
            range.anchor.set(0.5,0.5);
            antenne.anchor.set(0.5,0.8);
			antenne.onde[0] = new Phaser.Circle(posx, posy,1);
            antennea.play();

            cpt=cpt-1;

//            console.log(pos_antennes.length);
        }
        console.log("cpt : ",cpt)

        if(cpt==0){
            window.setTimeout(function(){
                music.destroy();

                var uneetoile = game.add.sprite(640,360, '1etoile', 1);
                //var deuxetoile = game.add.sprite(posx,posy, 'deuxetoile', 1);
                //var troisetoile = game.add.sprite(posx,posy, '01', 1);

                uneetoile.anchor.set(0.5,0.5);

                window.setTimeout(function(){
                    video = game.add.video('credits');

                    sprite = video.addToWorld(640, 360, 0.5, 0.5);

                    video.play();

                },2000)

            },2000);
        }

    }
}


function update() {
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

