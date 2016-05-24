<?php
	/**
	 * function that returns the events as $json data
	 */

	//$startDate, $endDate, $eventTypes, $topics
	function getEvents($startDate, $endDate){
		header('Content-type: application/javascript');
		$db = connect();

		//fetch table rows from mysql db
		$sql = "SELECT * FROM event_list WHERE `Start Time` BETWEEN '$startDate' AND '$endDate'";
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
