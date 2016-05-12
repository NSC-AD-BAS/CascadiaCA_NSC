<?php

	/**
	 * function that returns the events as $json data
	 */
    include 'connect.php';    
	//$startDate, $endDate, $eventTypes, $topics
	function getEvents($startDate, $endDate){        
		header('Content-type: application/javascript');
		$db = connect();        
		//fetch table rows from mysql db
		$sql = "select * from `event` where start_date_time between '$startDate' and '$endDate'";
		$result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
		$eventarray = array();
		while ($row = mysqli_fetch_assoc($result)) {
			$eventarray[] = $row;
		}
		$jsonarray = json_encode($eventarray);
		//close the db connection
		mysqli_close($db);
        echo "$jsonarray";
		return $jsonarray;
	}
?>


