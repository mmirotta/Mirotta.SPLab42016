angular
  .module('spLab2016')
  .controller('InicioCtrl', function($scope, $state, $auth) {
    if ($auth.isAuthenticated())
    {
      $state.go('menuPrincipal');
    } 
  });
