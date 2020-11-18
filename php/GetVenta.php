<?php
// $Content = Array();
    $dataVenta= file_get_contents("../js/Venta.json");
    print_r ($dataVenta);
    $dataVenta=json_decode($dataVenta);
?>