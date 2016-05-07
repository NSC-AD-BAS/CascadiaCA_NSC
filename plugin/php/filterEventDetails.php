<?php
include 'connect.php';

function filterEventDetail($startDate = null, $endDate = null,
    $eventType =null, $topics = null, $state =null, $city = null,
    $zip = null)
{
    $db = connect();

    //fetch table rows from mysql db
    $sql = "SELECT * FROM event_detail WHERE Type = '{$eventType}' and    
    Main_Topic = '{$topics}'";
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

echo filterEventDetail(NULL,"1","orci","nisl. Maecenas", "1","1","1");
?>