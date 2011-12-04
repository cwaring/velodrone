      var container, stats;
      var cube;
      var camera, scene, renderer;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      //init();
      //animate();

      THREE.Mesh.prototype.changeSize = function(factor)
      {
        this.scale.y=factor;
        this.scale.x=factor;
        this.scale.z=factor;
        
        return true;
      }

      function createCube(player_id, width, height) {

        container = document.createElement( 'div' );
        container.id = "cube-" + player_id;
        document.body.appendChild( container );

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
        camera.position.y = 150;
        camera.position.z = 900;
        scene.add( camera );
        
        width = width || window.innerWidth;
        height= height || window.innerHeight;
        

        // Cube

        var materials = [];

        for ( var i = 0; i < 6; i ++ ) {

          materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );

        }

        cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
        cube.position.y = 150;
        cube.overdraw = true;
        scene.add( cube );

        // Plane

        plane = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
        plane.rotation.x = - 90 * ( Math.PI / 180 );
        plane.overdraw = true;
        scene.add( plane );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( width, height );

        container.appendChild( renderer.domElement );
        
        return cube;
      }

      //


      function animate() {

        requestAnimationFrame( animate );

        render();
        //stats.update();

      }

      function render() {

        cube.rotation.x = Math.sin( new Date().getTime() * 0.0007 ) * 0.5;
        cube.rotation.y = Math.sin( new Date().getTime() * 0.0003 ) * 0.5;
        cube.rotation.z = Math.sin( new Date().getTime() * 0.0002 ) * 0.5;
        
        renderer.render( scene, camera );

      }
