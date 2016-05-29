<?php

//add lat/lon values to database on existing addresses

function fillDB(){

	for ($i = 1; $i < 101; $i++ ) {
		echo "Current index value: " . $i . "<br><br>";
		
		//connect to db
		$db = connect();

		//get address to send to geocode function_exists
		$sql = "SELECT CONCAT(COALESCE(`building_name`, ''), ' ', `street_address`, ' ', `city`, ' ', `state`, ' ', `zip`)
					FROM address WHERE `address_id` = $i";
		$result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
		
		//create an array
		$address = implode(" ", mysqli_fetch_assoc($result) );

		echo $address . "<br><br>";
		
		
		$geoCoords = geocode($address);
		$lati = $geoCoords[0];
		$lngi = $geoCoords[1];
	
		//insert into mysql db
		$sql = "UPDATE address SET `lat` = '$lati', `lng` = '$lngi' WHERE `address_id` = '$i';";
		$result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
	
		//close the database connection
		mysqli_close($db);
	}
}