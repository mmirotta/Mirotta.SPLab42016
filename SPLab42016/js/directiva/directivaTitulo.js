angular
  .module('app')
  .directive('utnTitulo', function() {
    return {
      scope:{
        mititulo: '@miparametro'
      },
      replace: true,
      restrict: "E", 
      templateUrl: "templates/titulo.html"
    };
  })
  ;//cierra modulo