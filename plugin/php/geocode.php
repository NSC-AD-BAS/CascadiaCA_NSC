<?php

function geocode($address){
 
    // url encode the address
    $address = urlencode($address);
     
    // google map geocode api url
    $url = "http://maps.google.com/maps/api/geocode/json?address={$address}";
 
    // get the json response
    $resp_json = file_get_contents($url);
     
    // decode the json
    $resp = json_decode($resp_json, true);
 
    // response status will be 'OK', if able to geocode given address 
    if($resp['status']=='OK'){
 
        // get the important data
        $lati = $resp['results'][0]['geometry']['location']['lat'];
        $longi = $resp['results'][0]['geometry']['location']['lng'];
         
        // verify if data is complete
        if($lati && $longi ) { //&& $formatted_address){
			//echo "latitude " . $lati . " longitude " . $longi;
			$geoArray = array($lati, $longi);
			//echo $geoArray[0] . " " . $geoArray[1];
			return $geoArray;
    } else {
        return false;
    }
	}
}

//geocode('85 s washington st seattle wa 98117');			
?>