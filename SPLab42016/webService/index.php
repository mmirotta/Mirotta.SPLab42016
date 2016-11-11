<?php

require 'vendor/autoload.php';
require 'clases/usuario.php';
require 'clases/producto.php'; 

$app = new Slim\App();

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

/*BUSCAR*/

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $listado=Usuario::Buscar();
    $response->write(json_encode($listado));
    
    return $response;
});

$app->get('/usuariosPorPerfil/{perfil}', function ($request, $response, $args) {
    $listado=Usuario::BuscarPorPerfil($args['perfil']);
    $response->write(json_encode($listado));
    
    return $response;
});

$app->get('/productos[/]', function ($request, $response, $args) {
    $datos=Producto::Buscar();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});


/*CARGAR*/

$app->get('/usuario/{id}', function ($request, $response, $args) {
    $usuario=Usuario::Cargar($args['id']);
    $response->write(json_encode($usuario));
    return $response;
});

$app->get('/producto/{id}', function ($request, $response, $args) {
    $producto=Producto::Cargar($args['id']);
    $response->write(json_encode($producto));
    return $response;
});

/* POST: Para crear recursos GUARDAR*/
$app->post('/usuario/{usuario}', function ($request, $response, $args) {
    $usuario=json_decode($args['usuario']);
    $usuario->foto=explode(';',$usuario->foto);
    $arrayFoto = array();
    if(count($usuario->foto) > 0){
        for ($i = 0; $i < count($usuario->foto); $i++ ){
            $rutaVieja="fotos/".$usuario->foto[$i];
            $rutaNueva=$usuario->correo. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]=$rutaNueva;
        } 
        $usuario->foto=json_encode($arrayFoto); 
    }

    
    return $response->write(Usuario::Guardar($usuario));
});

$app->post('/producto/{producto}', function ($request, $response, $args) {
    $producto=json_decode($args['producto']);
    $producto->foto=explode(';',$producto->foto);
    $arrayFoto = array();
    if(count($producto->foto) > 0){
        for ($i = 0; $i < count($producto->foto); $i++ ){
            $rutaVieja="fotos/".$producto->foto[$i];
            $rutaNueva=$producto->nombre. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]=$rutaNueva;
        } 
        $producto->foto=json_encode($arrayFoto); 
    }

    return $response->write(Producto::Guardar($producto));
});


// /* PUT: Para editar recursos MODIFICAR*/
$app->put('/usuario/{usuario}', function ($request, $response, $args) {
    Usuario::Editar(json_decode($args['usuario']));
    return $response;
});

$app->put('/producto/{producto}', function ($request, $response, $args) {
    Producto::Editar(json_decode($args['producto']));
    return $response;
});


// /* DELETE: Para eliminar recursos ELIMINAR*/
$app->delete('/usuario/{id}', function ($request, $response, $args) {
    Usuario::Borrar($args['id']);
    return $response;
});

$app->delete('/producto/{id}', function ($request, $response, $args) {
    Producto::Borrar($args['id']);
    return $response;
});

/*Archivos*/
$app->post('/archivos', function ($request, $response, $args) {
    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = "fotos" . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'Archivo Cargado!!' );
    $json = json_encode( $answer );
} else {
    echo 'Sin Archivos';
}
    return $response;
});

$app->run();
