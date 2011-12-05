      var container, stats;

      var camera, scene, renderer, container;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      $(document).ready(function() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 100, window.innerWidth /  window.innerHeight, 1, 1000 );
        camera.position.y = 150;
        camera.position.z = 900;
        scene.add( camera );
        container = document.createElement( 'div' );
        container.id = "cube-scene";
        document.body.appendChild( container );
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        if(!interval) {
          interval = setInterval(mainRender, 1000 / 60);
        };
      });

      var radius = 600;
      var theta = 0;

      function mainRender() {

        // Main render loop

        theta += 0.2;

        camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
        camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
        camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
        camera.lookAt( scene.position );

        renderer.render( scene, camera );
      }


      Cube = function(player_id, owidth, oheight) {
        this.cube;
        this.plane;
        this.player_id = player_id;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer;
        _this = {};
        that = this;

        this.createCube = function() {

          // Cube

          var materials = [];

          for ( var i = 0; i < 6; i ++ ) {

            materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );

          }

          this.cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1, materials ), new THREE.MeshFaceMaterial() );
          this.cube.position.y = Math.random() * this.height - (this.height / 2) - 100;
          this.cube.position.x = Math.random() * this.width - (this.width / 2 ) - 100;
          this.cube.overdraw = true;
          scene.add( this.cube );

          // Plane

          //this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
          //this.plane.rotation.x = - 90 * ( Math.PI / 180 );
          //this.plane.overdraw = true;
          //scene.add( this.plane );

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

          _this.t =  setTimeout(that.animate,1000 / 60);

          that.rotate();
        }

        this.rotate = function() {

          this.cube.rotation.x = Math.sin( new Date().getTime() * 0.0007 ) * 0.5;
          this.cube.rotation.y = Math.sin( new Date().getTime() * 0.0003 ) * 0.5;
          this.cube.rotation.z = Math.sin( new Date().getTime() * 0.0002 ) * 0.5;

        }

        this.destroy = function() {
          scene.remove(this.cube);
        }
      }
