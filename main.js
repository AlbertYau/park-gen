var scene = new THREE.Scene();

var aspect = window.innerWidth / window.innerHeight;
var d = 80;
var zOffset = 40;
camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d + zOffset, 1, 1000 );
camera.position.set( 100, 60, 100 ); // all components equal
camera.lookAt( scene.position ); // or the origin

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// ambient
scene.add( new THREE.AmbientLight( 0x444444 ) );

// light
var light = new THREE.PointLight( 0xffffff, 0.8 );
light.position.set( 200, 150, 50 );
scene.add( light );

// axes
scene.add( new THREE.AxisHelper( 80 ) );

// controls
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
//controls.enableRotate = false;
controls.addEventListener( 'change', render );
controls.enableZoom = false;
controls.enablePan = false;

console.log(camera);
console.log(controls);

var worldY = controls.getWorldDirection().y * (Math.PI/180);
console.log(controls.getWorldDirection());

controls.minPolarAngle = worldY; // radians
controls.maxPolarAngle = worldY; // radians

controls.minAzimuthAngle = - Infinity; // radians
controls.maxAzimuthAngle = Infinity; // radians

// grid
var geometry = new THREE.PlaneBufferGeometry( 300, 300, 30, 30 );
var material = new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.5, transparent: true } );
var grid = new THREE.Mesh( geometry, material );
grid.rotation.order = 'YXZ';
grid.rotation.y = - Math.PI / 2;
grid.rotation.x = - Math.PI / 2;
scene.add( grid );

// ground
var groundZ = 3;
var geometry = new THREE.BoxGeometry( 100, 100, groundZ );
var material = new THREE.MeshLambertMaterial( {color: 0xffffff});
var ground = new THREE.Mesh( geometry, material );
ground.rotation.order = 'YXZ';
ground.rotation.y = - Math.PI / 2;
ground.rotation.x = - Math.PI / 2;
//console.log(ground.scale);
ground.position.z = groundZ;
scene.add( ground );

/*
var egh = new THREE.EdgesHelper( ground, 0x00000 );
egh.material.linewidth = 1;
scene.add( egh );
*/

generateSlabs(10);

function generateSlabs (n) {
	for (var i=0; i<n; i++) {
		var s = new Slab (Math.floor(Math.random()*20+1), Math.floor(Math.random()*20+1), Math.floor(Math.random()*15+1), Math.round(Math.random()*70-35), Math.round(Math.random()*70-35));
	}
}

function Slab (width, height, depth, x, z) {
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.x = x;
	this.z = z;

	var geometry = new THREE.BoxGeometry( width, height, depth );
	var material = new THREE.MeshLambertMaterial( {color: 0xffffff});
	var slab = new THREE.Mesh( geometry, material );
	slab.rotation.order = 'YXZ';
	slab.rotation.y = - Math.PI / 2;
	slab.rotation.x = - Math.PI / 2;
	slab.position.x = x;
	slab.position.y = depth/2;
	slab.position.z = z;
	scene.add( slab );
}

//camera.position.z = 5;

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );

}
render();