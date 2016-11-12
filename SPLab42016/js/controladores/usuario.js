angular
.module('spLab2016')
.controller('LoginCtrl', function($scope, $state, $auth, jwtHelper) {
	$scope.usuario = {};
	$scope.usuario.correo = "admin@utn.com";
	$scope.usuario.clave = "123456";

	$scope.Verificar = function(){
		$auth.login($scope.usuario)
			.then(function(response){
				if ($auth.isAuthenticated())
				{
					$state.go("menu");
				}
				
			}).catch(function(response){
				console.info("NO volvio bien", response);
			});
	}
})

.controller("RegistroCtrl", function($scope, $auth, $state, $http, jwtHelper, FileUploader, FactoryUsuario, FactoryRutas) {
	$scope.usuario={};
    $scope.usuario.nombre = "Comprador";
    $scope.usuario.correo = "comprador@gmail.com";
    $scope.usuario.clave = "123456";
    $scope.usuario.claveRepetida = "123456";
    $scope.usuario.perfil = "comprador";

	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.admin = true;
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

	$scope.Guardar = function(){
		$scope.uploader.uploadAll();
		for (var i = 0; i < $scope.uploader.queue.length; i++) {
			$scope.foto = $scope.uploader.queue[i];
			if (i==0)
				$scope.usuario.foto = $scope.foto.file.name;
			else
				$scope.usuario.foto = $scope.usuario.foto + ';' + $scope.foto.file.name;
		};

		FactoryUsuario.Guardar($scope.usuario).then(
			function(respuesta) { 
				console.log(respuesta);
			},function(error) {
				console.log(error);
	 	});
	};
})

.controller("UsuarioModificarCtrl", function($scope, $auth, $state, $stateParams, $http, jwtHelper, FileUploader) {
	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.usuario = JSON.parse($stateParams.usuario);
	}
	else
	{
		$state.go("inicio");
	}

	$scope.Guardar = function(){

		FactoryUsuario.Editar($scope.usuario).then(
			function(respuesta) {     	
		    	$state.go("inicio");
			},function(error) {
				console.log(error);
	 	});
	};
})

.controller("UsuariosCtrl", function($scope, $http, $state, $auth, jwtHelper, FactoryUsuario) {
	if ($auth.isAuthenticated())
	{
		$scope.usuario = jwtHelper.decodeToken($auth.getToken());
		$scope.usuario.logeado = true;
	    $scope.editar = false;
	}
	else
	{
		$state.go("inicio");
	}

 	FactoryUsuario.BuscarTodos().then(
 		function(respuesta) {     	
  			$scope.ListadoUsuarios = respuesta;
    	},function(error) {
 			$scope.ListadoUsuarios= [];
 	});

 	$scope.Modificar = function(usuario){
 		var param = JSON.stringify(usuario);
    	$state.go('login.usuario', {usuario:param});
 	}
});

;//Cierre modulo

