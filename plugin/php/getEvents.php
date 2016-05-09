<?php
/**
 * Created by PhpStorm.
 * User: james_000
 * Date: 5/8/2016
 * Time: 4:20 PM
 */
    include 'connect.php';

function getEvents($startDate = null, $endDate = null,
                           $eventType = null, $topics = null, $state = null, $city = null,
                           $zip = null)
{
    $db = connect();
    $now = date('m-d-Y h:i:s');
    unset($sql); // make sure the array is empty every time we call this

    if($startDate)
    {
        $sql[] = " START_TIME = '$startDate' ";
    }
    if($endDate)
    {
        $sql[] = " END_TIME = '$endDate' ";
    }
    if($eventType)
    {
        $sql[] = " TYPE = '$eventType' ";
    }
    if($topics)
    {
        $sql[] = " MAIN_TOPIC = '$topics' ";
    }
    if($state)
    {
        $sql[] = " STATE = '$state' ";
    }
    if($city)
    {
        $sql[] = " CITY = '$city' ";
    }
    if($zip)
    {
        $sql[] = " ZIP = '$zip' ";
    }
    //basic select statement to get all events
    $query = "SELECT * FROM event_detail";

    //use implode to append filter parameters to query
     if(!empty($sql)) {
        $query .= ' WHERE ' . implode(' AND ', $sql);
     }
    //get results array from database
    $result = mysqli_query($db, $query) or die("Error in Selecting " . mysqli_error($db));
    $eventarray = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $eventarray[] = $row;

    }
    //json encode return values
    $jsonarray = json_encode($eventarray);

    //close the db connection
    mysqli_close($db);

    return $jsonarray;

}

echo getEvents(); //test with no args passed
