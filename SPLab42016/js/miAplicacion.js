var miApp = angular.module('spLab2016', ['ui.router', 'angularFileUpload','satellizer', 'angular-jwt']);

miApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	//proveedor de autentificacion.
	$authProvider.loginUrl = 'http://localhost:8080/Mirotta.SPLab42016/webService/jwt/php/auth.php';
	$authProvider.tokenName = 'MiTokenGeneradoEnPHP';
	$authProvider.tokenPrefix = 'Aplicacion';
	//$authProvider.authReader = 'data';

	//aca se genera el ruteo atravez de estados

	$stateProvider
		.state(
			"inicio",
			{
				url:"/inicio",
				templateUrl:"vistas/inicio.html",
				controller:"InicioCtrl"
			}
		)

		.state(
			"login",
			{
				url:"/login",
				abstract:true, 
				templateUrl:"vistas/usuario/abstractaLogin.html"
			}
		)

		.state(
			"login.login",
			{
				url:"/login",
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/login.html",
					controller:"LoginCtrl"
					}
				}
			}
		)

		.state(
			"login.registro",
			{
				url:"/registro",
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/registro.html",
					controller:"RegistroCtrl"
					}
				}
			}
		)

		.state(
			"login.usuario",
			{
				url:"/usuario/:usuario",
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/modificarUsuario.html",
					controller:"UsuarioModificarCtrl"
					}
				}
			}
		)

		.state(
			"login.usuarios",
			{
				url:"/usuarios/:perfil",
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/usuarios.html",
					controller:"UsuariosCtrl"
					}
				}
			}
		)

		.state(
			"producto",
			{
				url:"/producto",
				abstract:true, 
				templateUrl:"vistas/producto/abstractaProducto.html"
			}
		)

		.state(
			"producto.alta",
			{
				url:"/alta",
				views:{
					"contenido": {
					templateUrl:"vistas/producto/altaProducto.html",
					controller:"ProductoAltaCtrl"
					}
				}
			}
		)

		.state(
			"producto.productos",
			{
				url:"/productos",
				views:{
					"contenido": {
					templateUrl:"vistas/producto/productos.html",
					controller:"ProductosCtrl"
					}
				}
			}
		)

	$urlRouterProvider.otherwise("/inicio");
});




