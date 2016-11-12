angular
  .module('spLab2016')
  .controller("ProductoAltaCtrl", function($scope, $auth, $state, $http, jwtHelper, FileUploader, FactoryProducto, FactoryRutas) {
	if ($auth.isAuthenticated())
	{
		$scope.usuario = jwtHelper.decodeToken($auth.getToken());
		$scope.usuario.logeado = true;
	}
	else
	{
		$state.go("inicio");
	}
	
	$scope.uploader = new FileUploader({url: FactoryRutas.UrlArchivos});
	$scope.uploader.queueLimit = 10; // indico cuantos archivos permito cargar
				
	/* Si quiero restringir los archivos a imagenes añado este filtro */
	$scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

	$scope.producto={};
    $scope.producto.nombre = "Producto 1";
    $scope.producto.descripcion = "Producto 1";
    $scope.producto.precio = "15";

	$scope.Guardar = function(){
		$scope.uploader.uploadAll();
		for (var i = 0; i < $scope.uploader.queue.length; i++) {
			$scope.foto = $scope.uploader.queue[i];
			if (i==0)
				$scope.producto.foto = $scope.foto.file.name;
			else
				$scope.producto.foto = $scope.usuario.foto + ';' + $scope.foto.file.name;
		};

		FactoryProducto.Guardar("producto", $scope.producto).then(
			function(respuesta) {     	
		    	console.log(respuesta);
			},function(error) {
				console.log(error);
		 });
	};
  })
  .controller("ProductosCtrl", function($scope, $http, $state, $auth, jwtHelper, FactoryProducto) {
		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			$scope.logeado = true;
		}
		else
		{
			$scope.logeado = false;
			$state.go("inicio");
		}

	 	FactoryProducto.BuscarTodos('productos').then(
	 		function(respuesta) {     	
      			$scope.ListadoProductos = respuesta;
	    	},function(error) {
     			$scope.ListadoProductos= [];
	 	});
	});


  ;// cierra modulo
