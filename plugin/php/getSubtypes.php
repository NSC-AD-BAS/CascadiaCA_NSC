<?php

//returns an array of all 18 subtypes

function getSubtypes()
{
    $db = connect();

    //fetch table rows from mysql db
    $sql = "SELECT DISTINCT `Subtype` FROM full_type_list";
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

?>