angular
  .module('spLab2016')
  .controller('MenuCtrl', function($scope, $state, $auth, jwtHelper) {
  	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		console.info($scope.usuarioLogeado.perfil);
		if ($scope.usuarioLogeado.perfil != "comprador")
		{
			console.info($scope.usuarioLogeado.perfil);
			$scope.nuevoProducto = true;
		}
		else
		{
			$scope.nuevoProducto = false;
		}

		if ($scope.usuarioLogeado.perfil == "admin")
			$scope.admin = true;
		else
			$scope.admin = false;
	}

	$scope.Salir = function(){
		$auth.logout();
		$state.go("inicio");
	};
  });
