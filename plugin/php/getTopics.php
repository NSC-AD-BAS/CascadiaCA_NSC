<?php

//returns array of all 5 main topics

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

    //fetch table rows from main_topics view
    $sql = "SELECT DISTINCT `Main Topic` FROM full_topic_list";

    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));

    //create an array
    $eventarray = array();
    while ($row = mysqli_fetch_assoc($result)) {
        //$eventarray[] = $row;
        array_push($eventarray, $row);

    }
    $jsonarray = json_encode($eventarray);

    //close the db connection
    mysqli_close($db);

    echo $jsonarray;
}


?>