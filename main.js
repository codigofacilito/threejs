(function(){
	
	// Creamos una escena, donde colocaremos los objetos
	let scene = new THREE.Scene();
	let mesh = null;
	// Field of view, Aspect Ratio, Near, Far
	// Field of View = VIEW_ANGLE
	const aspectRatio = window.innerWidth / window.innerHeight;
	// Optimize Near, Far for performance
	// Creamos una cámara, son nuestros ojos en la escena
	let camera = new THREE.PerspectiveCamera(75,aspectRatio,0.1,100);
	
  camera.position.z = 80;
  camera.position.y = 2;

	// Creamos el render, WebGLRenderer es uno de ellos, otros se usan para compatibilidad
	// El render es quien construye los gráficos
	let renderer = new THREE.WebGLRenderer();

	// Definir el tamaño, usualmente el tamaño de la vista
	// Tercer argumento define mitad resolución
	renderer.setSize(window.innerWidth,window.innerHeight);
	// Agregamos el canvas del renderer al body de la app
	document.body.appendChild(renderer.domElement);

	// Box Geometry para crear cubos
	// let geometry = new THREE.BoxGeometry( 1, 1, 1 );

	var groundMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222
  });

	let planeGeometry  = new THREE.PlaneGeometry(200, 900);
	planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2));
	plane = new THREE.Mesh(planeGeometry, groundMaterial);
  plane.receiveShadow = true;


	var loader = new THREE.TextureLoader();
	// Texture => http://planetpixelemporium.com/earth.html
	loader.load('texture.jpg', function ( texture ) {
		// SphereGeometry (esferas) => radio,segmentos ancho,segmentos alto,
		let geometry = new THREE.SphereGeometry(20,100,100);

		// Map nos permite definir una textura
	  let material = new THREE.MeshBasicMaterial({map: texture});
	  mesh = new THREE.Mesh(geometry, material);
	  mesh.position.y = 25;
	  mesh.castShadow = true;
	  
	  
	  // add to the scene
	  scene.add(mesh);
	});

	// create a point light
	var pointLight = new THREE.PointLight(0xdfebff);

	// set its position
	pointLight.position.y = 80;
	pointLight.castShadow = true;



	// Help us debug camera position by showing su tronco
	helper = new THREE.CameraHelper( pointLight.shadow.camera );
	scene.add( helper );

	// add to the scene
	scene.add(pointLight);
	scene.add(plane);
	scene.add(new THREE.AmbientLight( 0x404040 ));
	
	scene.background = new THREE.Color( 0xeeeeee );


	renderer.shadowMap.enabled = true;
	renderer.shadowMap.soft = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	loop();

	

	controls = new THREE.OrbitControls( camera, renderer.domElement );

	function loop(){
		requestAnimationFrame(loop);
		var timer = Date.now() * 0.0002;

		if(mesh != null)
			mesh.rotation.y += 0.01;
		renderer.render(scene,camera);
	}



})();