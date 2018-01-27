var mat=[[0,0,1,0,0],[0,0,2,0,0],[0,0,3,0,0],[0,0,2,0,0],[0,2,2,0,0]]

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('fb', 'facebook40x40.png');
	game.load.image('snap', 'snapchat-40x40.png');
	game.load.image('twi', 'social-net-icons-round-twitter-40x40.png');
	game.load.image('g+', 'icon-g+.png');

}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    

	
	for(var i=0;i<mat.length;i++){
	for(var j=0;j<mat[0].length;j++){
		if (mat[i][j]==0){
			game.add.sprite(40*j, 40*i, 'fb');
		}
		if (mat[i][j]==1){
			game.add.sprite(40*j, 40*i, 'snap');
		}
		if (mat[i][j]==2){
			game.add.sprite(40*j, 40*i, 'twi');
		}
		if (mat[i][j]==3){
			game.add.sprite(40*j, 40*i, 'g+');
		}
	}
}

}

