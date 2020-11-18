<?php

$nameFile=($_GET["NameFile"]);
$obj=($_GET["Informacion"]);
$obj=json_decode($obj);

    if($nameFile=="Informacion.json"){
        include('GetData.php');
        $obj->ID= count($data);

        array_push($data,$obj);
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($data));

    }else if ($nameFile=="Encuesta.json"){
        include('GetEncuesta.php');
        $obj->ID= count($dataEncuesta);
        array_push($dataEncuesta,$obj); 
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
        fwrite($fd,json_encode($dataEncuesta));

    }else if($nameFile=="Venta.json"){ 
        include('GetVenta.php'); 
        $obj->ID= count($dataVenta);
        array_push($dataVenta,$obj); 
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($dataVenta));

    }else if($nameFile=="Clientes.json"){  
        include('GetDataUsuario.php');
        $obj->ID= count($dataUsu);
        array_push($dataUsu,$obj); 
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($dataUsu));

    }

?>