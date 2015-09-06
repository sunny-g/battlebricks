Player = function(game, spawnPoint) {
  this.game = game;
  this.scene = game.scene;
  // Set the spawn point
  this.spawnPoint = spawnPoint;
  // The player eyes height
  this.height = 2;
  // The player speed
  this.speed = 1;
  // The player inertia
  this.inertia = 0.9;
  // The player angular inertia
  this.angularInertia = 0;
  // The mouse sensibility (lower is most sensible)
  this.angularSensibility = 1000;
  // the player must click on the canvas to activate control
  this.controlEnabled = false;

  // The player camera
  this.camera = this._initCamera();
  this.scene.activeCamera = this.camera;

  var canvas = this.scene.getEngine().getRenderingCanvas();
  canvas.addEventListener('click', function(event) {
    var width = this.scene.getEngine().getRenderWidth();
    var height = this.scene.getEngine().getRenderHeight();

    if (this.controlEnabled) {
      var pickInfo = this.scene.pick(width/2, height/2, null, false, this.camera);
      this.handleUserMouse(evt, pickInfo);
    }
  }.bind(this));

  // Event listener to go pointer lock
  this._initPointerLock();
};

Player.prototype = {
  handleUserMouse: function(event, pickInfo) {

  },

  /**
   * Init the player camera
   * @returns {BABYLON.FreeCamera}
   * @private
   */
  _initCamera: function() {
    var cam = new BABYLON.FreeCamera("camera", this.spawnPoint, this.scene);
    cam.attachControl(this.scene.getEngine().getRenderingCanvas());
    // creates a bubble around the camera for collision-detection
    cam.ellipsoid = new BABYLON.Vector3(2, this.height, 2);
    // Activate collisions
    cam.checkCollisions = true;
    // Activate gravity !
    cam.applyGravity = true;

    // Remap keys to move with WASD
    cam.keysUp = [87]; // W
    cam.keysDown = [83]; // S
    cam.keysLeft = [65]; // A
    cam.keysRight = [68]; // D
    cam.speed = this.speed;
    cam.inertia = this.inertia;
    cam.angularInertia = this.angularInertia;
    cam.angularSensibility = this.angularSensibility;
    cam.layerMasks = 2;
    return cam;
  },

  _initPointerLock: function() {
    // Request pointer lock
    var canvas = this.scene.getEngine().getRenderingCanvas();
    // On click event, request pointer lock
    canvas.addEventListener("click", function(evt) {
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
      if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
      }
    }, false);

    // Attach events to the document
    document.addEventListener("pointerlockchange", pointerlockchange.bind(this), false);
    document.addEventListener("mspointerlockchange", pointerlockchange.bind(this), false);
    document.addEventListener("mozpointerlockchange", pointerlockchange.bind(this), false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange.bind(this), false);
    
    // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    function pointerlockchange(event) {
      this.controlEnabled = (
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas ||
        document.msPointerLockElement === canvas ||
        document.pointerLockElement === canvas
      );
      // If the user is alreday locked
      if (!this.controlEnabled) {
        this.camera.detachControl(canvas);
      } else {
        this.camera.attachControl(canvas);
      }
    }
  }
};
