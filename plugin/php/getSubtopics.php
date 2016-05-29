<?php

//returns an array of all 24 sub topics

function getSubtopics()
{
    $db = connect();

    //fetch table rows from main_topics view
    $sql = "SELECT DISTINCT `Subtopic` FROM full_topic_list";
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