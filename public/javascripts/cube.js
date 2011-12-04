      var container, stats;

      var camera, scene, renderer;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      //init();
      //animate();

      $(document).ready(function() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 70, 1, 1, 1000 );
        camera.position.y = 150;
        camera.position.z = 900;
        scene.add( camera );
        console.log(scene);
      });

      Cube = function(player_id, width, height) {
      this.cube;
      this.plane;
      this.player_id = player_id;
      this.width = width;
      this.height = height;
      this.renderer;
      
          this.createCube = function() {

            container = document.createElement( 'div' );
            container.id = "cube-" + this.player_id;
            document.body.appendChild( container );

            // Cube

            var materials = [];

            for ( var i = 0; i < 6; i ++ ) {

              materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );

            }

            this.cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
            this.cube.position.y = 150;
            this.cube.overdraw = true;
            console.log(camera);
            console.log(scene);
            scene.add( this.cube );

            // Plane

            this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
            this.plane.rotation.x = - 90 * ( Math.PI / 180 );
            this.plane.overdraw = true;
            scene.add( this.plane );

            this.renderer = new THREE.CanvasRenderer();
            this.renderer.setSize( this.width, this.height );

            container.appendChild( this.renderer.domElement );

            return this.cube;
          }

          this.changeSize = function(factor)
          {
            this.cube.scale.y=factor;
            this.cube.scale.x=factor;
            this.cube.scale.z=factor;

            return true;
          }


          this.animate = function() {
          
          var that = this;

            window.setTimeout( this.animate, 1000 / 60 );

            this.render();
            //stats.update();

          }

          this.render = function() {

            this.cube.rotation.x = Math.sin( new Date().getTime() * 0.0007 ) * 0.5;
            this.cube.rotation.y = Math.sin( new Date().getTime() * 0.0003 ) * 0.5;
            this.cube.rotation.z = Math.sin( new Date().getTime() * 0.0002 ) * 0.5;
            console.log(this.renderer);
            this.renderer.render( scene, camera );

          }
      }
