<?php

include 'connect.php';
getAll();

function getAll()
{
    $db = connect();

    //fetch table rows from mysql db
    $sql = "select * from event_list";
    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));

    //create an array
    $eventarray = array();
    $count = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $eventarray[] = $row;
    }
    $jsonarray = json_encode($eventarray);
    //close the db connection
    mysqli_close($db);
    echo $jsonarray;
}

?>