<?php


$nameFile=($_GET["NameFile"]);

    if($nameFile=="Informacion.json"){
        include('GetData.php');
        $nombres= [" Andrea ","Nike","Zara","Bershka","Mary Kay"," Forever 21","Cklass ","Adidas ", "C&A","Aéropostale ",
        " Louis vuitton ","American Eagle"," Flexi"," Old Navy","Gucci"," Puma","Converse ","Mango ", "Calvin Klein","Capa de Ozono ",
        " Levis ","Chanel","Lob","Burberry","Hugo Boss","Cuadra","Nine West ","Tiffany ", "Andre Badi"," Mac Cosmetics ",
        " TOUS ","Shasa","Rolex","Cartier","Prada"," Versace","Salvatore Ferragamo ","Skechers ", "Yves Saint Laurent","Loreal ",
        " Oscar de la Renta ","Marc Jacobs"," Victorias Secret","Dior","Giorgio Armani"," H&M","Alexander Macquen ","Dolce and gabbana ", "Givenchy","Adolfo Dominguez "];
        $obj = (object) [
            'ID' => 0,
            'Nombre'=>"",
            'Cost'=> 0,
             'Venta'=> 0,
        ];  
        for($i = 0; $i < count($data); $i++){
        $obj->ID = $i;
        $obj->Nombre=$nombres[mt_rand(0,49)];
        $obj->Cost=mt_rand(0,999999);
        $obj->Venta=mt_rand(0,99999);
        $data[$i]=clone $obj; 
        }
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($data));

    }else if ($nameFile=="Encuesta.json"){
        include('GetEncuesta.php');
        $objE = (object) [
            'ID' => 0,
            'Grado'=> 0,
            'Fecha'=> "",
        ];  
        for($i = 0; $i < count($dataEncuesta); $i++){
        $objE->ID = $i;
        $objE->Grado=mt_rand(0,10);
        $objE->Fecha=mt_rand(0,30)."/".mt_rand(0,12)."/".mt_rand(1900,2020);
        $dataEncuesta[$i]=clone $objE; 
        }
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
        fwrite($fd,json_encode($dataEncuesta));

    }else if($nameFile=="Venta.json"){
        include('GetVenta.php');
        $objV = (object) [
            'ID' => 0,
            'IDCliente'=> 0,
            'IDArtirculo'=> 0,
            'Cost'=> 0,
            'Venta'=> 0,
        ];  
        for($i = 0; $i < 5000; $i++){
        $objV->ID = $i;
        $objV->IDCliente=mt_rand(0,5000);
        $objV->IDArtirculo=mt_rand(0,9999);
        $objV->Cost=mt_rand(0,999999);
        $objV->Venta=mt_rand(0,99999);
        $dataVenta[$i]= clone $objV; 
        }
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($dataVenta));


    }else if($nameFile=="Clientes.json"){
        include('GetDataUsuario.php');
        $nombres= [" Andrea ","Nike","Zara","Bershka","Mary Kay"," Forever 21","Cklass ","Adidas ", "C&A","Aéropostale ",
        " Louis vuitton ","American Eagle"," Flexi"," Old Navy","Gucci"," Puma","Converse ","Mango ", "Calvin Klein","Capa de Ozono ",
        " Levis ","Chanel","Lob","Burberry","Hugo Boss","Cuadra","Nine West ","Tiffany ", "Andre Badi"," Mac Cosmetics ",
        " TOUS ","Shasa","Rolex","Cartier","Prada"," Versace","Salvatore Ferragamo ","Skechers ", "Yves Saint Laurent","Loreal ",
        " Oscar de la Renta ","Marc Jacobs"," Victorias Secret","Dior","Giorgio Armani"," H&M","Alexander Macquen ","Dolce and gabbana ", "Givenchy","Adolfo Dominguez "];
        $obju = (object) [
            'ID' => 0,
            'Nombre'=>"",
        ];  
        for($i = 0; $i < count($dataUsu); $i++){
        $obju->ID = $i;
        $obju->Nombre=$nombres[mt_rand(0,49)];
        $dataUsu[$i]=clone $obju; 
        }
        $fd=fopen("../js/".$nameFile,"w+") or die ("no se logro abrir o crear");
         fwrite($fd,json_encode($dataUsu));

    }

?>