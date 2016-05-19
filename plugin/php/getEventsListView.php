<?php
/**
 * Created by PhpStorm.
 * User: cdub
 * Date: 5/18/2016
 * Time: 6:13 PM
 */
include 'connect.php';
$theType = $_GET["type"];
if(isset($theType)) {
    getAll();
}

function getAll() {
    $db = connect();

    //fetch table rows from mysql db
    $sql = "select * from event";
    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));

    //create an array
    $eventarray = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $eventarray[] = $row;
    }
    $jsonarray = json_encode($eventarray);
    //close the db connection
    mysqli_close($db);
    echo $jsonarray;
}
