var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', 
{ preload: preload, create: create, update: update});

function preload() {
	game.load.spritesheet('01', '1.jpg', 40, 40);
	game.load.spritesheet('02', '2.png', 40, 40);
}

var points = [];
var antenne;
var coorMaison = [[250,250,false],[375,400,false]]
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
	
	var imMaison1 = game.add.image(coorMaison[0][0], coorMaison[0][1], '02', 1);
	var imMaison2 = game.add.image(coorMaison[1][0], coorMaison[1][1], '02', 1);
	
    antenne.anchor.set(0.5);
    antenne.visible = true;
	
	var text = "Score " + score;
    var style = { font: "50px Arial", fill: "#ff0044", align: "center" };
	affScore = game.add.text(game.world.centerX, 0, text, style);
	
}

function onTapHandler() {

    if (!over)
    {
        var img = game.add.sprite(game.input.activePointer.position.x, game.input.activePointer.position.y, '01', 0);

        points.push(img.position);

        img.anchor.set(0,0)

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
		/*var graphics = game.add.graphics(0, 0);
		
		graphics.beginFill(0xFF00000, 1000);
		graphics.drawCircle(currentPoint.x, currentPoint.y, rayon);*/
		
		//Calcul de la zone d'effect
		for (var i=0; i<coorMaison.length; i++) {
			if (((Math.sqrt(Math.pow((coorMaison[i][0] - currentPoint.x),2) + (Math.pow((coorMaison[i][1] - currentPoint.y),2)))) < rayon) 
				&& (coorMaison[i][2]==false)){
				score = score + 1;
				coorMaison[i][2] = true;
				affScore.text = "Score " + score;

			}
			
		}
    }

}

function update() {
	currentPoint.position.copyFrom(game.input.activePointer.position);
}

