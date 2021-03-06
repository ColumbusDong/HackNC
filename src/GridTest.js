init();

function init() {
  var width = window.innerWidth * 0.7;
  var height = window.innerHeight;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor (0xFFFFFF, 1);
  document.getElementById("gridId").appendChild( renderer.domElement );

  //Grid Dimensions
  var size = 40;
  var step = size*.1; //Note this is Partitions per size;

  //Initial Camera Position
  camera.position.x = size;
  camera.position.y = size;
  camera.position.z = size;

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);

  //XY
  var gridXY = new THREE.GridHelper(size, step*2, 0x000000, 0xd9dde2);

  //XZ
  var gridXZ = new THREE.GridHelper(size, step*2, 0x000000, 0xd9dde2);
  gridXZ.rotation.x = Math.PI/2;

  //YZ
  var gridYZ = new THREE.GridHelper(size, step*2, 0x000000, 0xd9dde2);
  gridYZ.rotation.z = Math.PI/2;

  //Add Grid
  scene.add(gridXZ);
  scene.add(gridXY);
  scene.add(gridYZ);

  //Make Arrows
  var origin = new THREE.Vector3(0,0,0);
  var xhex = 0xff0000;
  var yhex = 0x00ff00;
  var zhex = 0x0000ff;

  var xPosArrow = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), origin, size*1.09, xhex, size *.09, size *.09);
  //var xNegArrow = new THREE.ArrowHelper(new THREE.Vector3(-1,0,0), origin, size + 2.5*step, xhex );
  var yPosArrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), origin, size*1.09, yhex, size *.09, size *.09);
  //var yNegArrow = new THREE.ArrowHelper(new THREE.Vector3(0,-1,0), origin, size + 2.5*step, yhex );
  var zPosArrow = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), origin, size*1.09, zhex, size *.09, size *.09);
  //var zNegArrow = new THREE.ArrowHelper(new THREE.Vector3(0,0,-1), origin, size + 2.5*step, zhex );

  //Add Arrows
  scene.add(xPosArrow);
  //scene.add(xNegArrow);
  scene.add(yPosArrow);
  //scene.add(yNegArrow);
  scene.add(zPosArrow);
  //scene.add(zNegArrow);

  //Add Thicker X Axes
  var xAxes = makeCylinder(.125, 2*size, 0xFF0000);
  xAxes.rotation.x = Math.PI/2;
  xAxes.rotation.z = Math.PI/2;
  scene.add(xAxes);

  //Add Thicker Y Axes
  var yAxes = makeCylinder(.125, 2*size, 0x0000FF);
  yAxes.rotation.x = Math.PI/2;
  yAxes.rotation.y = Math.PI/2;
  scene.add(yAxes);

  //Add Thicker Z Axes
  var zAxes = makeCylinder(.125, 2*size, 0x00FF00);
  scene.add(zAxes);

  /*
  //Add Labels
  var xLabel = makeTextSprite("X-Axis");
  xLabel.position.set(size, 0, 0);
  scene.add(xLabel);

  var zLabel = makeTextSprite("Z-Axis");
  zLabel.position.set(0, size, 0);
  scene.add(zLabel);

  var yLabel = makeTextSprite("Y-Axis");
  yLabel.position.set(0, 0, size);
  scene.add(yLabel);
  */

  var render = function () {
      requestAnimationFrame( render );
      renderer.render(scene, camera);
  };

  render();
}
