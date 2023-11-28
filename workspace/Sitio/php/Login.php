<?php
include("conexion.php");  

$data = array();


    if(($_POST['Usuario']=='')||($_POST['Contrasena']=='')){
        $data['status'] = 'camposvacios';
        $data['resultado'] = 'Llena los campos vacíos';
    }else{
        $sql = "SELECT Nombre,Apellido,IDusuario FROM usuarios WHERE Usuario='".$_POST['Usuario']."' AND Contrasenia='".$_POST['Contrasena']."'";
        $res = $mysqli->query($sql);

        if($res->num_rows > 0){
            $userData = $res->fetch_assoc();
            //echo 'has iniciado sesion correctamente';
            session_start();

            $_SESSION['NOMBRE']=$userData['NOMBRE'];
            $_SESSION['APELLIDO']=$userData['APELLIDO'];
            $_SESSION['idusuarios']=$userData['idusuarios'];

            $data['status'] = 'ok';
            $data['resultado'] = '';
        }else{
            $data['status'] = 'nohayusuario';
            $data['resultado'] = 'No se encontro una cuenta con ese usuario';
        }
    }

echo json_encode ($data);

$mysqli->close();
?>