<?php
// $Content = Array();
    $data= file_get_contents("../js/Informacion.json");
    print_r ($data);
    $data=json_decode($data);
?>