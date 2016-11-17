var miApp = angular.module('spLab2016', ['ui.router', 'angularFileUpload','satellizer', 'angular-jwt']);

miApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	//proveedor de autentificacion.
	$authProvider.loginUrl = 'http://localhost:8080/Mirotta.SPLab42016/SPLab42016WebService/jwt/php/auth.php';
	$authProvider.tokenName = 'segundoparcial';
	$authProvider.tokenPrefix = 'Aplicacion';
	//$authProvider.authReader = 'data';

	//aca se genera el ruteo atravez de estados

	$stateProvider
		.state(
			"inicio",
			{
				url:"/inicio",
				cache:false,
				templateUrl:"vistas/inicio.html",
				controller:"InicioCtrl"
			}
		)

		.state(
			"login",
			{
				url:"/login",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/usuario/abstractaLogin.html"
			}
		)

		.state(
			"login.login",
			{
				url:"/login",
				cache:false,
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
				cache:false,
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
				cache:false,
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
				url:"/usuarios",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/usuarios.html",
					controller:"UsuariosCtrl"
					}
				}
			}
		)

		.state(
			"login.usuariosDirectiva",
			{
				url:"/usuariosDirectiva",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/usuariosConDirectiva.html",
					controller:"UsuariosCtrl"
					}
				}
			}
		)

		.state(
			"producto",
			{
				url:"/producto",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/producto/abstractaProducto.html"
			}
		)

		.state(
			"producto.alta",
			{
				url:"/alta",
				cache:false,
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
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/productos.html",
					controller:"ProductosCtrl"
					}
				}
			}
		)

		.state(
			"producto.productosDirectiva",
			{
				url:"/productos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/productosConDirectiva.html",
					controller:"ProductosCtrl"
					}
				}
			}
		)

		.state(
			"menu",
			{
				url:"/menu",
				cache:false,
				templateUrl:"vistas/menu.html",
				controller:"MenuCtrl"
			}
		)

	$urlRouterProvider.otherwise("/inicio");
});




