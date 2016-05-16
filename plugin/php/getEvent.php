<?php

	/**
	 * function that returns the events as $json data
	 */
    include 'connect.php';

    // based upon the type of query, php will call different functions to return those mysql views
    //  other functions can be called here as well
    $filter = $_GET['type'];

	switch($filter) {
		case 'all':
			$strAll = getAllEvents();
            echo "$strAll";
			break;
		case 'range':
            $var1 = $_GET['value1'];
            $var2 = $_GET['value2'];
			$strRange = getEventsByDateRange($var1, $var2);
            echo "$strRange";
			break;
		case 'month':
            $var1 = $_GET['value1'];
			$strMonth = getSQLViewInfo($var1);
            echo $strMonth;
            break;
        case 'topicList':
            $strTopic = getSQLViewInfo('event_topic_list');
            echo $strTopic;
            break;
        case 'typeList':
            $strType = getSQLViewInfo('event_type_list');
            echo $strType;
            break;
        default:
            break;
	}

function getSQLViewInfo($sql_view) {
    header('Content-type: application/javascript');
    $db = connect();
    //fetch table rows from mysql db
    // fixed query to find range of values
    $sql = "select * from $sql_view";
    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
    $eventarray = array();
    while($row = mysqli_fetch_assoc($result)) {
        $eventarray[] = $row;
    }
    $jsonarray = json_encode($eventarray);
    //close connection
    mysqli_close($db);
    return $jsonarray;
}


    //TODO: before sending this json string, get the actual address instead of address id
    // added function for echoing all events for the javascript caller
    function getAllEvents() {
        header('Content-type: application/javascript');
        $db = connect();
        //fetch all from mysql db
        $sql = "select * from `event`";
        $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
        $eventarray = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $eventarray[] = $row;
        }
        $jsonarray = json_encode($eventarray);
        //close the db connection
        mysqli_close($db);
        return "$jsonarray";
    }

	//$startDate, $endDate, $eventTypes, $topics
	function getEventsByDateRange($startDate, $endDate){
		header('Content-type: application/javascript');
		$db = connect();        
		//fetch table rows from mysql db
        // fixed query to find range of values
		$sql = "select * from `event` where start_date_time between '$startDate' and '$endDate'
				and end_date_time between '$startDate' and '$endDate'";
		$result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
		$eventarray = array();
		while ($row = mysqli_fetch_assoc($result)) {
			$eventarray[] = $row;
		}
		$jsonarray = json_encode($eventarray);
		//close the db connection
		mysqli_close($db);        
		return $jsonarray;
	}

	function getEventsByMonth($valueMonth) {
        header('Content-type: application/javascript');
        $db = connect();
        //fetch table rows from mysql db
        // fixed query to find range of values
        $sql = "select * from event where MONTHNAME(start_date_time) = '$valueMonth'";
        $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
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


