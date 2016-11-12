angular
  .module('spLab2016')
  .service('Servicio', function ($http, FactoryRutas) {
    this.Nombre = "Servicio";
    this.BuscarTodos = BuscarTodos;
    this.BuscarPor = BuscarPor;
    this.Cargar = Cargar;
    this.Guardar = Guardar;
    this.Editar = Editar;
    var url = FactoryRutas.UrlWebService;

    function TraerUrl(metodo, parametro){
        return url + "/" + metodo + "/" + parametro;
    }

    function BuscarTodos(entidad){
      switch(entidad)
      {
        case "usuario":
          return $http.get(TraerUrl('usuarios')).then(
          function (respuesta){
            return respuesta.data;
          },
          function (error){
            return error;
          }
          );
          break;
      }
    }

    function BuscarPor(entidad, parametro){
      switch(entidad)
      {
        case "usuario":
          return $http.get(TraerUrl('usuariosPorPerfil', parametro)).then(
          function (respuesta){
            return respuesta.data;
          },
          function (error){
            return error;
          }
          );
          break;
      }
    }

    function Cargar(entidad, parametro){
      switch(entidad)
      {
        case "usuario":
          return $http.get(TraerUrl('usuarios', parametro)).then(
          function (respuesta){
            return respuesta.data;
          },
          function (error){
            return error;
          }
          );
          break;
      }
    }

    function Guardar(entidad, parametro){
      return $http.post(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta;
        },
        function (error){
          return error;
        }
      );
    }

    function Editar(entidad, parametro){
      switch(entidad)
      {
        case "usuario":
          return $http.put(TraerUrl('usuario', parametro)).then(
          function (respuesta){
            return respuesta.data;
          },
          function (error){
            return error;
          }
          );
          break;
      }
    }

  })//Cierra Servicio
