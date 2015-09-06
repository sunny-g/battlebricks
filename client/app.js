Meteor.startup(function() {  
  var game = new Game('renderCanvas');
  var size = 100;

  var ground = BABYLON.Mesh.CreateGround('ground', size, size, 2, game.scene);
  ground.material = new BABYLON.StandardMaterial(ground.name + 'mat', game.scene);
  ground.material.specularColor = BABYLON.Color3.Black();
  ground.checkCollisions = true;

  var spawnPoint = new BABYLON.Vector3(0, 10, -10);
  var player = new Player(game, spawnPoint);

});
