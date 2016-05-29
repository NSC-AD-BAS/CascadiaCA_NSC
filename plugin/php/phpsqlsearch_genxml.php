<?php

 include 'connect.php';
// Get parameters from URL
$center_lat = $_GET["lat"];
$center_lng = $_GET["lng"];
$radius = $_GET["radius"];

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
//$db_selected = mysql_select_db('cascadia_climate_action', $connection);
//if (!$db_selected) {
//  die ("Can\'t use db : " . mysql_error());
//}

// Search the rows in the markers table
$query = sprintf("SELECT street_address, city, state, zip, lat, lng, ( 3959 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance FROM address HAVING distance < '%s' ORDER BY distance LIMIT 0 , 20",
 $center_lat= mysqli_real_escape_string($connection, $center_lat),
 $center_lng=  mysqli_real_escape_string($connection, $center_lng),
 $center_lat= mysqli_real_escape_string($connection, $center_lat),
 $radius= mysqli_real_escape_string($connection, $radius));
//echo $query;

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
 // $newnode->setAttribute("name", $row['name']);
  $newnode->setAttribute("street_address", $row['street_address']);
  $newnode->setAttribute("lat", $row['lat']);
  $newnode->setAttribute("lng", $row['lng']);
  $newnode->setAttribute("distance", $row['distance']);
}

echo $dom->saveXML();


?>
