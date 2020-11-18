<?php


$nameFile=($_GET["NameFile"]);
$obj=($_GET["Informacion"]);
$obj=json_decode($obj);

    if($nameFile=="Informacion.json"){
        include('GetData.php');
        $objI = (object) [
            'ID' => $obj->ID,
            'Nombre'=>$obj->Nombre,
            'Cost'=> $obj->Cost,
             'Venta'=> $obj->Venta,
        ];  
        $data[$objI->ID]=clone $objI; 
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($data));

    }else if ($nameFile=="Encuesta.json"){
        include('GetEncuesta.php');
        $objE = (object) [
            'ID' => $obj->ID,
            'Grado'=> $obj->Grado,
            'Fecha'=> $obj->Fecha,
        ]; 
        $dataEncuesta[$objE->ID]=clone $objE; 
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
        fwrite($fd,json_encode($dataEncuesta));

    }else if($nameFile=="Venta.json"){ 
        include('GetVenta.php'); 
        $objV = (object) [
            'ID' => $obj->ID,
            'IDCliente'=> $obj->IDCliente,
            'IDArtirculo'=> $obj->IDArtirculo,
            'Cost'=> $obj->Cost,
            'Venta'=> $obj->Venta,
        ];  
        $dataVenta[$objV->ID]= clone $objV; 
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($dataVenta));

    }else if($nameFile=="Clientes.json"){  
        include('GetDataUsuario.php');
        $obju = (object) [
            'ID' => $obj->ID,
            'Nombre'=>$obj->Nombre,
        ];   
        $dataUsu[$obju->ID]=clone $obju; 
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($dataUsu));

    }

?>