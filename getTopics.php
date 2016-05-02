<?php
/**
 * Created by PhpStorm.
 * User: james_000
 * Date: 4/29/2016
 * Time: 11:01 PM
 */

include "connect.php";

function getTopics()
{
    $db = connect();

    //fetch table rows from mysql db
    $sql = "select * from event_topic";
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
//display for testing purposes, can be removed.
echo getTopics();

?>