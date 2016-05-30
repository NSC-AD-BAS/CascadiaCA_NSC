<?php

//returns an array of 3 main types
include "connect.php";

function getTypes()
{
    $db = connect();

    //fetch table rows from mysql db
    $sql = "SELECT DISTINCT `Main_Type` FROM full_type_list";
    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));

    //create an array
    $eventarray = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $eventarray[] = $row;

    }
    $jsonarray = json_encode($eventarray);

    //close the db connection
    mysqli_close($db);

    return $jsonarray;
}

echo getTypes();

?>