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

    //fetch table rows from main_topics view
    $sql = "SELECT DISTINCT `Main Topic` FROM full_topic_list";

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
testAllEvents();
?>