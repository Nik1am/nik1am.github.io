
window.onload = function() {
	/*
	var ctrl = document.getElementById('control')
    var cameraposy = document.getElementById('input_y')
    var cameraposz = document.getElementById('input_z')
	ctrl.onchange = function() {
		camera.position.set(0,cameraposy.value,cameraposz.value);
	}
	*/
	const position = new THREE.Vector3();
	const clock = new THREE.Clock()
	var loader = new THREE.GLTFLoader();
	var width = window.innerWidth;
	var height = window.innerHeight;
	if ((width/height)>=1) {
	var canvas = document.getElementById('canvas');
	canvas.setAttribute('width',width);
	canvas.setAttribute('height',height);
	
	var renderer = new THREE.WebGLRenderer({canvas: canvas,antialias: true,alpha: true});
	
renderer.shadowMap.enabled = true;
	
	
	var scene = new THREE.Scene();
	
	var camera = new THREE.PerspectiveCamera( 30, width / height, 0.1, 5000 );
	camera.position.set(0,1,0.8,0.6);

	
	var light = new THREE.PointLight( 0xEEEEEE, 1, 1000 );
	light.position.set( -1, 2, 1 );
	scene.add( light );
	
	var ambient_light = new THREE.AmbientLight(0x555555);
	scene.add(ambient_light)
	var model;
	loader.load( 'mdl/yoimiya/yoimiya_anim.glb', function ( gltf ) {
		model = gltf.scene;
		gltf.scene.traverse( function( object ) { object.frustumCulled = false; } ); 
		mixer = new THREE.AnimationMixer( model );
		mixer.clipAction( gltf.animations[ 0 ] ).play();

		animate();
		
		scene.add(gltf.scene);
		renderer.render(scene,camera);
	});
	function animate() {
				requestAnimationFrame( animate );

				const delta = clock.getDelta();

				mixer.update( delta );

				renderer.render( scene, camera );

			}
}
	else {
		document.write('Turn your phone and reload a page')
	}
}
