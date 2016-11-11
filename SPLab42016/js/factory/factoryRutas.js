angular
  .module('spLab2016')
  .factory('FactoryRutas', function ($http) {
    var objeto = {};
    objeto.Nombre = "Factory Rutas";
    objeto.UrlWebService = UrlWebService;

    function UrlWebService(){
      return "http://localhost:8080/Mirotta.SPLab42016/webService/";
    }
  })//Cierra Servicio
