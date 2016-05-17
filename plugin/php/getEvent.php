<?php
	/**
	 * function that returns the events as $json data
	 */
	 
	include "connect.php";
	//$startDate, $endDate, $eventTypes, $topics
	function getEvents($startDate, $endDate){
		header('Content-type: application/javascript');
		$db = connect();
		//fetch table rows from mysql db
		$sql = "SELECT * FROM event_list between dateStart and dateEnd";
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