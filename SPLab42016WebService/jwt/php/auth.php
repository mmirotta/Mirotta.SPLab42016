<?php
include_once '../vendor/autoload.php';
include_once '../../clases/usuario.php';
use \Firebase\JWT\JWT;


$DatosDelModelPorPost = file_get_contents('php://input');
$user = json_decode($DatosDelModelPorPost);

$usuarioBuscado = Usuario::Verificar($user->correo, $user->clave, $user->nombre);

if ($usuarioBuscado != null)
{
	$ClaveDeEncriptacion="estaeslaclave";
	$token["usuario"] = $usuarioBuscado->nombre;
	$token["perfil"] = $usuarioBuscado->tipo;
	$token["iat"] = time();
	$token["exp"] = time()+30000;

	$jwt = JWT::encode($token, $ClaveDeEncriptacion);
}
else
{
	$jwt = false;
}

$ArrayConToken["segundoparcial"] = $jwt; 
echo json_encode($ArrayConToken); 

?>