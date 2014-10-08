// Force disconnection of connected srpites before opening a new project
SnapSerializer.prototype.originalOpenProject = SnapSerializer.prototype.openProject;

SnapSerializer.prototype.openProject = function (project, ide) {
    // Disconnect each sprite before opening the new project
    var sprites = ide.sprites.asArray()
    sprites.forEach(function(sprite) {
        if (sprite.arduino && sprite.arduino.board) {
            sprite.arduino.disconnect();
        }
    })

    this.originalOpenProject(project, ide);
}

