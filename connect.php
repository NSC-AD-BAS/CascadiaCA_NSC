<?php
/*sets connection to database */
function connect(){

    /* Change values below as needed */
    $db_host = "localhost";
    $db_username = "root";
    $db_pass = "";
    $db_name = "cascadia_climate_action";

    /*for security purposes we should turn off detailed error reporting.
    To do this, change to: error_reporting(0)
    This line should go in an ini file later to apply globally */
    error_reporting(E_ALL);

    $db= new mysqli("$db_host","$db_username","$db_pass","$db_name");

    if($db->connect_errno){
    die('Database connection unavailable: '.mysqli_connect_error());
    }

    /* take this else statement out later. It is here for development purposes */
    else{
    echo 'Database is connected';
    }
    return $db;
}
?>