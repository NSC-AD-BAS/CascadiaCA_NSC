<?php
/* Change values below as needed */
$db_host = "localhost";
$db_username = "root";
$db_pass = "root";
$db_name = "cascadia_climate_action";
/*for security purposes we should turn off detailed error reporting.
To do this, change to: error_reporting(0)
This line should go in an ini file later to apply globally */
error_reporting(E_ALL);
$db = new mysqli("$db_host","$db_username","$db_pass","$db_name");
if($db->connect_errno){
	die('Database connection unavailable: '.mysqli_connect_error());
}

$address = "INSERT INTO address (building_name, street_address, city, state, 
	zip) VALUES ('$_POST["building"]', $_POST["street_address"]', $_POST["city"],
	$_POST["state"], $_POST["zip"])";

if ($db->query($address) === TRUE) {
    echo "New address created successfully";
} else {
    echo "Error: " . $address . "<br>" . $db->error;
}

$addressID = SELECT address_id FROM address WHERE street_address = $_POST["street_address"];

$event = "INSERT INTO event (event_title, event_type, event_description,
	start_date_time, end_date_time, address_id
) VALUES (('$_POST["title"]', $_POST["type"], $_POST["description"],
	$_POST["start_date"], $_POST["end_date"], '$addressID' " ;

if ($db->query($event) === TRUE) {
    echo "New event created successfully";
} else {
    echo "Error: " . $event . "<br>" . $db->error;
}

$organization = "INSERT INTO organization (org_name, org_website) 
VALUES ($_POST["organization_name"], $_POST["organization_website"])";

if ($db->query($organization) === TRUE) {
    echo "New oragnization created successfully";
} else {
    echo "Error: " . $organization . "<br>" . $db->error;
}

mysqli_close($db);
?>