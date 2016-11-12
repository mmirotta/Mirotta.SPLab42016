angular
  .module('spLab2016')
  .factory('FactoryProducto', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Producto";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Cargar = Cargar;

    function BuscarPor(entidad, parametro){
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(entidad){
      return Servicio.BuscarTodos(entidad);
    }

    function Cargar(entidad, parametro){
      return Servicio.Cargar(entidad, parametro);
    }

    function Guardar(entidad, parametro){
      return Servicio.Guardar(entidad, JSON.stringify(parametro));
    }

    return objeto;
  })//Cierra Factory Producto
