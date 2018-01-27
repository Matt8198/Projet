var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', 
{ preload: preload, create: create, update: update});

function preload() {
	game.load.spritesheet('01', '1.jpg', 17, 17);
	game.load.spritesheet('02', '2.png', 17, 17);
}

var points = [];
var antenne;
var maison;
var currentPoint;
var over = false;
var rayon = 300;
var score = 0;

function create() {
	//Placement de l'image
	currentPoint = game.add.image(750,50,'01');
	currentPoint.anchor.set(0.5);
	
	antenne = game.add.image(10, 10, '01', 1);
    antenne.anchor.set(0.5);
    antenne.visible = false;
	
	game.input.onTap.add(onTapHandler, this);
	
	maison = game.add.image(250, 250, '02', 1);
    antenne.anchor.set(0.5);
    antenne.visible = true;
	
	var text = score;
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
	game.add.text(game.world.centerX-300, 0, text, style);
	
}

function onTapHandler() {

    if (!over)
    {
        var img = game.add.sprite(game.input.activePointer.position.x, game.input.activePointer.position.y, '01', 0);

        points.push(img.position);

        img.anchor.set(0.5,0.5)
		
	
		
        img.events.onInputOver.add(function() {
            this.scale.setTo(1.2, 1.2);
            over = true;
        }, img);

        img.events.onInputOut.add(function() {
            this.scale.setTo(1, 1);
            over = false;
			game.input.onTap.add(onTapHandler, this);
        }, img);
		
		//Zone d'effet
		var graphics = game.add.graphics(0, 0);
		
		graphics.beginFill(0xFF00000, 1000);
		graphics.drawCircle(currentPoint.x, currentPoint.y, rayon);
		
		//Calcul de la zone d'effect
		console.log(Math.sqrt(Math.pow((maison.x - currentPoint.x),2) - (Math.pow((maison.y - currentPoint.y),2))));
		console.log(rayon);
		if (Math.sqrt(Math.pow((maison.x - currentPoint.x),2) + (Math.pow((maison.y - currentPoint.y),2))) < rayon) {
			console.log(score);
			score += score;
		}
    }

}

function pickTile(sprite, pointer) {

    currentTile = game.math.snapToFloor(pointer.x, 40) / 40;

}

function render() {
		game.debug.renderCircle(graphics,'rgba(255,255,255,0.5)');

}
function update() {
	currentPoint.position.copyFrom(game.input.activePointer.position);
}