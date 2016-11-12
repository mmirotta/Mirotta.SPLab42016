angular
  .module('spLab2016')
  .controller('InicioCtrl', function($scope, $state, $auth) {
  	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.admin = true;
	}

  	
  });
