angular
  .module('spLab2016')
  .factory('FactoryRutas', function () {
    var objeto = {};
    objeto.Nombre = "Factory Rutas";
    objeto.UrlWebService = "http://localhost:8080/Mirotta.SPLab42016/SPLab42016WebService";

    return objeto;
  })//Cierra Fatory Rutas
