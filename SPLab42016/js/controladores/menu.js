angular
  .module('spLab2016')
  .controller('MenuCtrl', function($scope, $state, $auth, jwtHelper) {
  	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.admin = true;
		if ($scope.usuarioLogeado.perfil != 'comprador')
			$scope.nuevoProducto = true;
		else
			$scope.nuevoProducto = false;
	}

	$scope.Salir = function(){
		$auth.logout();
		$state.go("inicio");
	};
  });
