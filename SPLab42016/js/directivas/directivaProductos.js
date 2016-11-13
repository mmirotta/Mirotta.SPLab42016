angular
  .module('spLab2016')
  .directive('utnListaProductos', function() {

    return {
      scope:{
        producto: '=producto'
      },
      replace: true,
      restrict: "EA", 
      templateUrl: "templates/listaProductos.html"
    };

  })
  ;//cierra modulo