var head;

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
	canvas.setAttribute('width',width/2);
	canvas.setAttribute('height',height);
	
	var renderer = new THREE.WebGLRenderer({canvas: canvas,antialias: true,alpha: true});
	
	var scene = new THREE.Scene();
	
	var camera = new THREE.PerspectiveCamera( 45, width / 2 / height, 0.1, 5000 );
	camera.position.set(0,1,1,0.6);
	
	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light)
	var model;
	loader.load( 'mdl/yoimiya/yoimiya_anim.glb', function ( gltf ) {
		model = gltf.scene;
		gltf.scene.traverse( function( object ) { object.frustumCulled = false; } ); 
		mixer = new THREE.AnimationMixer( model );
				mixer.clipAction( gltf.animations[ 0 ] ).play();

				animate();
				
		model.traverse(o => {
          // Reference the neck and waist bones
          if (o.isBone && o.name === 'ValveBipedBip01_Head1') { 
            head = o;
          }
        });
		
		scene.add(gltf.scene);
		renderer.render(scene,camera);
	});
	document.addEventListener('mousemove', function(e) {
    var mousecoords = getMousePos(e);
      if (head) {
        moveJoint(mousecoords, head, 30);
      }
	});
	function getMousePos(e) {
		return { x: e.clientX, y: e.clientY };
	}
	function moveJoint(mouse, joint, degreeLimit) {
		let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
		joint.rotation.x = THREE.Math.degToRad(degrees.x);
		joint.rotation.z = -1*THREE.Math.degToRad(degrees.y);
    }
	function getMouseDegrees(x, y, degreeLimit) {
    let dx = 0,
        dy = 0,
        xdiff,
        xPercentage,
        ydiff,
        yPercentage;

    let w = { x: window.innerWidth+canvas.clientWidth, y: window.innerHeight };

    // Left (Rotates neck left between 0 and -degreeLimit)
     // 1. If cursor is in the left half of screen
    if (x <= w.x / 2) {
     // 2. Get the difference between middle of screen and cursor position
      xdiff = w.x / 2 - x; 
      // 3. Find the percentage of that difference (percentage toward edge of screen)
      xPercentage = (xdiff / (w.x / 2)) * 100; 
      // 4. Convert that to a percentage of the maximum rotation we allow for the neck
      dx = ((degreeLimit * xPercentage) / 100) * -1; 
    }
    
    // Right (Rotates neck right between 0 and degreeLimit)
    if (x >= w.x / 2) {
      xdiff = x - w.x / 2;
      xPercentage = (xdiff / (w.x / 2)) * 100;
      dx = (degreeLimit * xPercentage) / 100;
    }
    // Up (Rotates neck up between 0 and -degreeLimit)
    if (y <= w.y / 2) {
      ydiff = w.y / 2 - y;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      // Note that I cut degreeLimit in half when she looks up
      dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
    }
    // Down (Rotates neck down between 0 and degreeLimit)
    if (y >= w.y / 2) {
      ydiff = y - w.y / 2;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      dy = (degreeLimit * yPercentage) / 100;
    }
    return { x: dx, y: dy };
  }
	renderer.render(scene,camera);
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
