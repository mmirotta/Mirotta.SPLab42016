angular
.module('spLab2016')
.controller('UsuarioCtrl', function($scope, $state, $stateParams, $auth, $http, jwtHelper, FileUploader, FactoryUsuario) {

})
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

.controller("RegistroCtrl", function($scope, $auth, $state, $http, jwtHelper, FileUploader, FactoryUsuario) {
	$scope.usuario={};
    $scope.usuario.nombre = "Cliente";
    $scope.usuario.correo = "cliente@gmail.com";
    $scope.usuario.clave = "cliente123";
    $scope.usuario.claveRepetida = "cliente123";
    $scope.usuario.perfil = "comprador";

	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.admin = true;
	}

	$scope.uploader = new FileUploader({url: 'http://localhost:8080/Mirotta.SPLab42016/SPLab42016WebService/archivos'});
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

		$scope.usuario.fechaCreacion = new Date();
		$http.post('http://localhost:8080/Mirotta.SPLab42016/SPLab42016WebService/usuario/' + JSON.stringify($scope.usuario))
		.then(function(respuesta) {     	
		    $state.go("inicio");
		},function errorCallback(response) {
				console.log(response);
		 	});
/*		FactoryUsuario.Guardar("usuario", $scope.usuario).then(function(respuesta) { 
			if ($auth.isAuthenticated())
			{  
			  	$auth.login($scope.usuario)
				.then(function(response){
					if ($auth.isAuthenticated())
					{
						$state.go("inicio");
					}
					
				}).catch(function(response){
					console.info("NO volvio bien", response);
				});
			}
			else
			{
		    	$state.go("inicio");
		    }
		},function(error) {
			console.log(response);
	 	});*/
	};

	$scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);
	};
    $scope.uploader.onCompleteAll = function() {
        console.info('Se cargo con exito');
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

		$http.put('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuario/' + JSON.stringify($scope.usuario))
		.then(function(respuesta) {     	
		    $state.go("inicio");
		},function errorCallback(response) {
			console.log(response);
	 	});
	};
})

.controller("UsuariosCtrl", function($scope, $http, $state, $auth, $stateParams, jwtHelper) {
 	$scope.perfil = $stateParams.perfil;
	if ($auth.isAuthenticated())
	{
		$scope.usuario = jwtHelper.decodeToken($auth.getToken());
		$scope.usuario.logeado = true;
	    $scope.editar = false;

		switch($scope.usuario.perfil)
		{
			case "admin":
					$scope.editar = true;
				break;

			case "encargado":
					if ($scope.perfil == "vendedor")
						$scope.editar = true;
				break;
		}
	}
	else
	{
		$state.go("inicio");
	}

 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuariosPorPerfil/' + $scope.perfil)
 	.then(function(respuesta) {     	
      	 $scope.ListadoUsuarios = respuesta.data;
      	 console.log(respuesta);
    },function errorCallback(response) {
     		 $scope.ListadoUsuarios= [];
     		console.log(response);

 	 });

 	$scope.Modificar = function(usuario){
 		var param = JSON.stringify(usuario);
    	$state.go('login.usuario', {usuario:param});
 	}
});

;//Cierre modulo

