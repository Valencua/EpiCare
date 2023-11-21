<?php
include("conexion.php");  

$data = array();

    if(($_POST['Nombre']=='')||($_POST['Apellido']=='')||($_POST['Email']=='')||($_POST['Usuario']=='')||($_POST['Contrasena']=='')){
        $data['status'] = 'camposvacios';
        $data['resultado'] = 'Completar todos los campos vacíos';
    }else{
            $queryID = "SELECT IDusuario FROM usuarios WHERE Usuario='".$_POST['Usuario']."'";
            $result = $mysqli->query($queryID);
    
            if(mysqli_num_rows($result)>0){
                $data['status']='nosepuede';
                $data['resultado']='Ya existe una cuenta con este Usuario';
            }else{
                $sql = "INSERT INTO usuarios (Nombre,Apellido,Mail,Usuario,Contrasenia) VALUES ('".$_POST['Nombre']."','".$_POST['Apellido']."','".$_POST['Email']."','".$_POST['Usuario']."','".$_POST['Contrasena']."')";
                $res = $mysqli->query($sql);

                $data['status'] = 'ok';
                $data['resultado'] = 'Se ha registrado al Usuario';
            }
    }

echo json_encode ($data);

$mysqli->close();
?>