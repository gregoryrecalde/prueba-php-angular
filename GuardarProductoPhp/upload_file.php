<?php

if(isset($_POST['submit_image']))
{
    
    $nombre =  $_REQUEST['nombre'];
    $descripcion =  $_REQUEST['descripcion'];
    $precio =  $_REQUEST['precio'];
    
    // API URL
    $url = 'http://localhost:3000/api';

    // Create a new cURL resource
    $ch = curl_init($url);

    // Setup request to send json via POST
    $data = array(
        'nombre' => $nombre,
        'descripcion' => $descripcion,
        'precio' => $precio
    );
    $payload = json_encode(array("producto" => $data));

    // Attach encoded JSON string to the POST fields
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

    // Set the content type to application/json
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

    // Return response instead of outputting
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the POST request
    $result = curl_exec($ch);
    
    if($result==null) return;
    
    $resultObj = json_decode($result, true);
        
    $insertId = $resultObj['insertId'];
    $status = $resultObj['status'];
    echo $status;
    // Close cURL resource
    curl_close($ch);
    if($insertId != null) { 
        for($i=0;$i<count($_FILES["upload_file"]["name"]);$i++)
        {
            $uploadfile=$_FILES["upload_file"]["tmp_name"][$i];
            $folder="images/";
            
            move_uploaded_file($_FILES["upload_file"]["tmp_name"][$i], "$folder".$_FILES["upload_file"]["name"][$i]);
            rename ("$folder".$_FILES["upload_file"]["name"][$i], "$folder"."$insertId".".jpg");
            }
            exit();
        }
    }
    
?>