<?php
/**
 * Created by PhpStorm.
 * User: cdub
 * Date: 5/11/2016
 * Time: 3:57 PM
 */

include 'connect.php';

function testAllEvents() {
    $db = connect();

    //fetch table rows from mysql db
    $sql = "select * from event";
    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));

    //create an array
    $eventarray = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $eventarray = $row;
    }
    print_r($eventarray);
    $jsonarray = json_encode($eventarray);

    //close the db connection
    mysqli_close($db);

    return $jsonarray;
}
testAllEvents();
?>