<?php
// $Content = Array();
    $dataUsu= file_get_contents("../js/Clientes.json");
    print_r ($dataUsu);
    $dataUsu=json_decode($dataUsu);
?>