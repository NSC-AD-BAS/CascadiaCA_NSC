<?php

function eventsInRadius() {

 //include 'connect.php';
// Get parameters from URL
$center_lat = 47.667389; //$_GET["lat"];
$center_lng = -122.371819; //$_GET["lng"];
$radius = 5; //$_GET["radius"];


// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("address");
$parnode = $dom->appendChild($node);

// Opens a connection to a mySQL server
$connection=connect();
if (!$connection) {
  die("Not connected : " . mysql_error());
}

// Set the active mySQL database
$db_selected = mysqli_select_db($connection, 'cascadia_climate_action');
	if (!$db_selected) {
		die ("Can\'t use db : " . mysql_error());
	}

// Query for the rows within the given radius
$query = sprintf("SELECT Title, Street_Address, City, State, Zip, Lat, Lng, ( 3959 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance FROM event_list HAVING distance < '%s' ORDER BY distance LIMIT 0 , 20",
$center_lat= mysqli_real_escape_string($connection, $center_lat),
$center_lng=  mysqli_real_escape_string($connection, $center_lng),
$center_lat= mysqli_real_escape_string($connection, $center_lat),
$radius= mysqli_real_escape_string($connection, $radius));

$result = mysqli_query($connection, $query);
if (!$result) {
  die("Invalid query: " . mysql_error());
}

/*
$eventarray = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $eventarray[] = $row;
   }
   
//json encode return values
$jsonarray = json_encode($eventarray);

//  close the db connection
mysqli_close($connection);
echo $jsonarray;
*/


header("Content-type: text/xml");

//Iterate through the rows, adding XML nodes for each
while ($row = mysqli_fetch_assoc($result)){
  $node = $dom->createElement("address");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("Title", $row['Title']);
  $newnode->setAttribute("Street_Address", $row['Street_Address']);
  $newnode->setAttribute("Lat", $row['Lat']);
  $newnode->setAttribute("Lng", $row['Lng']);
  $newnode->setAttribute("distance", $row['distance']);
}

mysqli_close($connection);
echo $dom->saveXML();

}




?>
