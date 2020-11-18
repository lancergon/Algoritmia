<?php
     $dataInfo= file_get_contents("../js/Venta.json");
     $dataInfo=json_decode($dataInfo);
    $Ordenar=($_GET["Ordenar"]);
    
    function partition (&$dat, $low, $high,$campo)  
    {  
        $pivot = $dat[$high]; // pivot 
        $i = ($low-1); // Index of smaller element  
      
        for ($j = $low; $j <= $high-1; $j++)  
        {  
            // If current element is smaller than the pivot  
            if ($dat[$j]->$campo < $pivot->$campo)  
            {  
                $i++;
                $temp = $dat[$i]; 
                $dat[$i] = $dat[$j]; 
                $dat[$j] = $temp;  
            }  
        }
     
        $temp = $dat[$i + 1]; 
                $dat[$i + 1] = $dat[$high]; 
                $dat[$high] = $temp;     
        return ($i + 1);  
    }
    
    function quickSort(&$dat,$low, $high,$campo)  
    {  
        if ($low < $high)  
        {  
            /* pi is partitioning index, arr[p] is now  
            at right place */
            $pi = partition($dat,$low, $high,$campo);  
      
            // Separately sort elements before  
            // partition and after partition  
            quickSort($dat, $low, $pi - 1,$campo);  
            quickSort($dat, $pi + 1, $high,$campo);  
        }  
    }  
    quickSort($dataInfo,0,count($dataInfo)-1,$Ordenar);
    print_r(json_encode($dataInfo));
    return;
    
?>