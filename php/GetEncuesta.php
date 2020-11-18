<?php
// $Content = Array();
    $dataEncuesta= file_get_contents("../js/Encuesta.json");
    print_r ($dataEncuesta);
    $dataEncuesta=json_decode($dataEncuesta);
?>