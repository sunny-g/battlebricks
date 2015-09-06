Game = function(canvasId) {
  var canvas = document.getElementById(canvasId);
  var engine = new BABYLON.Engine(canvas, true);

  this.scene = this._initScene(engine);

  // start the render loop
  engine.runRenderLoop(function() {
    this.scene.render();
  }.bind(this));

  // start listening for key events
  window.addEventListener('keyup', function(event) {
    this.handleUserInput(event.keyCode);
  }.bind(this));
};

Game.prototype = {
  /**
   * Init the environment of the game / skybox, camera, ...
   */
  _initScene: function(engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera('Camera', 0, Math.PI/5, 10, BABYLON.Vector3.Zero(), scene);

    camera.maxZ = 1000;
    camera.attachControl(engine.getRenderingCanvas());

    // Update the scene background color
    scene.clearColor=new BABYLON.Color3(0.8,0.8,0.8);

    // Hemispheric light to light the scene
    new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(1, 2, 1), scene);

    // Skydome
    var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 1000, scene);

    // The sky creation
    BABYLON.Engine.ShadersRepository = "shaders/";

    // var shader = new BABYLON.ShaderMaterial("gradient", scene, "gradient", {});
    // shader.setFloat("offset", 200);
    // shader.setColor3("topColor", BABYLON.Color3.FromInts(0,119,255));
    // shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240,240, 255));
    // shader.backFaceCulling = false;
    // skybox.material = shader;
    
    return scene;
  },

  /**
   * callback that handles keyup events
   */
  handleUserInput: function(keycode) {}
}