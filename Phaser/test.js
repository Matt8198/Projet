var game = new Phaser.Game(1280,720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create,render:render});

function preload() {
    game.load.spritesheet('item', '1.jpg', 40, 40);
}

function create() {
    // Add some items to left side, and set a onDragStop listener
    // to limit its location when dropped.
    var item;
    for (var i = 0; i < 6; i++)
    {
        // Directly create sprites on the left group.
        item = game.add.sprite(40,40 * i, 'item', i);

        // Enable input detection, then it's possible be dragged.
        item.inputEnabled = true;

        // Make this item draggable.
        item.input.enableDrag();
        
        // Then we make it snap to left and right side,
        // also we make it only snap when released.
        item.input.enableSnap(40,40, false, true);

        // Limit drop location to only the 2 columns.
        item.events.onDragStop.add(fixLocation);
    }
}

function render() {
    game.debug.text('Group Left.', 100, 560);
    game.debug.text('Group Right.', 280, 560);
}

function fixLocation(item) {
    // Move the items when it is already dropped.
    if (item.x < 40) {
        item.x =40;
    }
    else if (item.x > 40 && item.x < 135) {
        item.x = 90;
    }
    else if (item.x > 160) {
        item.x = 135;
    }

}