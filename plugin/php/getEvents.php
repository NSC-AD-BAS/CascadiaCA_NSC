<?php
/**
 * Created by PhpStorm.
 * User: james_000
 * Date: 5/8/2016 modified 5/14/16 by Michael Gorsuch
 * Time: 4:20 PM
 */
    include 'connect.php';

function getEvents($startDate= NULL, $endDate=NULL, 
$eventType=NULL, $topics=NULL, $state=NULL, $city=NULL, $zip=NULL)
{
    	$db = connect();	
 	//$now = new DateTime();
	//echo $now->getTimestamp();
	date_default_timezone_set('America/Los_Angeles');
    	$now = date('Y-m-d h:i:s');
	echo $now;

        unset($sql); // make sure the array is empty every time we call this

        if($startDate==NULL)
        {
	$startDate=$now;
	echo "Start Date Filter ".$startDate;
        }

        if($endDate==NULL)
{
	$endDate=date('Y-m-d', strtotime("+1 months", strtotime($startDate))); 
	echo "End Date Filter ".$endDate; 
	
    }

    if($eventType)
    {
        $sql[] = " MAIN_TYPE = '$eventType' ";
	echo "MAIN_TYPE ".$eventType;
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
    $query = "SELECT * FROM event_list";

    //use implode to append filter parameters to query
     if(!empty($sql)) {
        $query .= ' WHERE Start_Time BETWEEN '."'".$startDate."'".' AND '."'".$endDate."'".' AND '.implode(' AND ', $sql);
	
	//for troubleshooting, can take out when combined 
	//with other code
	echo $query;
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
//testing for events in california
//echo getEvents(NULL, NULL,NULL,NULL, 'California', NULL, NULL);

//testing for dates
//echo getEvents('2016-02-01','2016-04-30', NULL, NULL, NULL, NULL, //NULL); 

//test with no args passed
echo getEvents();

//test with maintype
//echo getEvents('2016-03-01','2016-03-30',"Get //Informed",NULL,NULL,NULL,NULL);

//testing for filtering for city "Kasson"
//echo getEvents(NULL, NULL, NULL, NULL, NULL, 'Kasson', NULL);

//testing for "Kasson" and dates
//echo getEvents('2016-01-01','2016-04-30',NULL,NULL, NULL, 'Kasson', NULL);

//testing for filtering for city "Kasson" and MainTopic "Transport"
//echo getEvents(NULL, NULL,NULL,"Transport", NULL, 'Kasson', NULL);

//testing for filtering for city "Kasson" and state "california"
//echo getEvents(NULL, NULL,NULL,NULL, "California", 'Kasson', NULL);


