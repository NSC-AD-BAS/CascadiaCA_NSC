<?php

include "connect.php";
include "geocode.php";
//$startDate, $endDate, $eventTypes, $topics
function submitFormToDB() {
    $db = connect();
    if ($db->connect_errno) {
        die('Database connection unavailable: ' . mysqli_connect_error());
    }
    if (isset($_POST['submit_event'])) {
        //address variables
        //subtypes into an array as well
        $allOrgNameArray = $_POST['organization_name'];
        $allOrgWebsiteArray = $_POST['organization_website'];
        $allSubtopicArray = $_POST['subtopic'];
        $allSubtypeArray = $_POST['subtype'];
//        $orgImageArray = $_FILES['orgImage'];
        //maybe number the images so that we know which correspond to which
//        echo count($allSubtopicArray);
//        echo count($allSubtypeArray);
//        foreach ($allSubtopicArray as $checkbox) {
//            echo $checkbox . ' ';
//        }
        //$organizationNameArray = array();
        //$organizationWebsiteArray = array();
        $buildingName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'building'));
        $streetAddress = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'street_address'));
        $city = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'city'));
        $state = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'state'));
        $zip = (int) mysqli_real_escape_string($db, filter_input(INPUT_POST, 'zip'));
        //event info variables
        $startDate = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'start_date'));
        $endDate = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'end_date'));
        //need to combine starttime and end time to get a datetime
        $startTime = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'start_time'));
        $endTime = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'end_time'));
        $startDate .= " " . $startTime;
        $endDate .= " " . $endTime;
        $title = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'title'));
        $type = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'type'));
        $topic = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'type'));
        $description = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'description'));
        //organization variables
        //$orgName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_name'));
        //$orgWebsite = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_website'));
        //$orgBuilding = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_building'));
        //$orgAddress = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_address'));
        //$orgCity = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_city'));
        //$orgZip = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_zip'));
        //$orgState = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_state'));
        //contact info variables
        $firstName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'first_name'));
        $lastName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'last_name'));
        $email = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'email'));
        $phoneNumber = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'phone_number'));
        //inserts all the necessary data before events and organizations
        //need to check for duplicates before insertions
//        $addressCheck = mysqli_query($db, "SELECT * FROM address WHERE" .
//                "street_address = $streetAddress");
        //if ($result = mysqli_query($db, "SELECT * FROM address WHERE" .
        //     "street_address = $streetAddress")) {
        // if (mysqli_num_rows($result) <= 0) {
			
		$geoAddress = $buildingName . " " . $streetAddress . " " . $city . " " . $state . " " . $zip;
		$geoCoordinates = geocode($geoAddress);
		$lat = $geoCoordinates[0];
		$lng = $geoCoordinates[1];
		
			
        $insertAddress = "INSERT INTO address"
                . "(building_name, street_address, city, state, zip, lat, lng) VALUES"
                . "('$buildingName', '$streetAddress', '$city', '$state', '$zip', '$lat', '$lng');";
        $insertAddressQuery = mysqli_query($db, $insertAddress);
        if ($insertAddressQuery === TRUE) {
            echo "New address created successfully";
        } else {
            echo "Error: 0" . $insertAddressQuery . "<br>" . $db->error;
        }
        // }
        //}
        //$orgAddressCheck = mysqli_query($db, "SELECT * FROM address WHERE" .
        //        "street_address = $orgAddress");
        //   if ($result = mysqli_query($db, "SELECT * FROM address WHERE" .
        //         "street_address = $orgAddress")) {
        //     if (mysqli_num_rows($result) <= 0) {
//                $insertOrgAddress = "INSERT INTO address (building_name, street_address, city, state, zip) "
//                        . "VALUES ('$orgBuilding', $orgAddress', '$orgCity', '$orgState', $orgZip');";
//        $insertOrgAddress = "INSERT INTO address"
//                . "(building_name, street_address, city, state, zip) VALUES"
//                . "('$orgBuilding', '$orgAddress', '$orgCity', '$orgState', '$orgZip');";
//        $insertOrgAddressQuery = mysqli_query($db, $insertOrgAddress);
//        if ($insertOrgAddressQuery === TRUE) {
//            echo "New oragnization address created successfully";
//        } else {
//            echo "Error: 1" . $insertAddressQuery . "<br>" . $db->error;
//        }
        //  }
        //  }
        $insertTopic = "INSERT INTO main_topic (main_topic) VALUES ('$topic');";
        $insertTopicQuery = mysqli_query($db, $insertTopic);
        if ($insertTopicQuery === TRUE) {
            echo "New oragnization created successfully";
        } else {
            echo "Error: 2" . $insertTopicQuery . "<br>" . $db->error;
        }
        $insertType = "INSERT INTO main_type (main_type) VALUES ('$type');";
        $insertTypeQuery = mysqli_query($db, $insertType);
        if ($insertTypeQuery === TRUE) {
            echo "New type created successfully";
        } else {
            echo nl2br("Error: 3" . $insertTypeQuery . "<br>" . $db->error);
        }
        //get the ids for insertion
        $addressIdQuery = "SELECT address_id FROM address "
                . "WHERE street_address = '$streetAddress'";
        $addressIdRow = mysqli_query($db, $addressIdQuery);
        $addressId = mysqli_fetch_assoc($addressIdRow)['address_id'];
//        $orgAddressIdQuery = "SELECT address_id FROM address "
//                . "WHERE street_address = '$orgAddress'";
//        $orgAddressIdRow = mysqli_query($db, $orgAddressIdQuery);
//        $orgAddressId = mysqli_fetch_assoc($orgAddressIdRow)['address_id'];
        $topicIdQuery = "SELECT main_topic_id FROM main_topic "
                . "WHERE main_topic = '$topic'";
        $topicIdRow = mysqli_query($db, $topicIdQuery);
        $topicId = mysqli_fetch_assoc($topicIdRow)['main_topic_id'];
        $typeIdQuery = "SELECT main_type_id FROM main_type "
                . "WHERE main_type = '$type'";
        $typeIdRow = mysqli_query($db, $typeIdQuery);
        $typeId = mysqli_fetch_assoc($typeIdRow)['main_type_id'];
        //first organization is what we need
        $orgMainName = mysqli_real_escape_string($db, $allOrgNameArray[0]);
        $orgMainWebsite = mysqli_real_escape_string($db, $allOrgWebsiteArray[0]);
        $orgMainCheck = mysqli_query($db, "SELECT * FROM organization WHERE" .
                "org_name = '$orgMainName'");
//        if ($result = mysqli_query($db, "SELECT * FROM organization WHERE" .
//                "org_name = '$orgName'")) {
//            if (mysqli_num_rows($result) <= 0) {
        $insertMainOrg = "INSERT INTO organization (org_name, org_website, org_address_id)"
                . "VALUES ('$orgMainName', '$orgMainWebsite', 1);";
        $insertMainOrgQuery = mysqli_query($db, $insertMainOrg);
        if ($insertMainOrgQuery === TRUE) {
            echo "New oragnization created successfully";
        } else {
            echo nl2br("Error: 4" . $insertMainOrgQuery . "<br>" . $db->error);
        }
//            }
//        }
        $orgMainIdQuery = "SELECT org_id FROM organization WHERE org_name = '$orgMainName'";
        $orgMainIdRow = mysqli_query($db, $orgMainIdQuery);
        $orgMainId = mysqli_fetch_assoc($orgMainIdRow)['org_id'];
        $contactCheck = mysqli_query($db, "SELECT * FROM contact WHERE" .
                "email = '$email'");
        //precheck to see ife contact is already in the databse
//        if ($result = mysqli_query($db, "SELECT * FROM contact WHERE" .
//                "email = '$email'")) {
//            if (mysqli_num_rows($result) <= 0) {
        //not working
        $insertMainContact = "INSERT INTO contact (first_name, last_name, email, phone, "
                . "org_id) VALUES ('$firstName', '$lastName', '$email', "
                . "'$phoneNumber', '$orgMainId')";
        $insertMainContactQuery = mysqli_query($db, $insertMainContact);
        if ($insertMainContactQuery === TRUE) {
            echo "New contact created successfully";
        } else {
            echo nl2br("Error: 5" . $insertMainContactQuery . "<br>" . $db->error);
        }
//            }
//        }
        $contactIdQuery = "SELECT contact_id FROM contact "
                . "WHERE email = '$email'";
        $contactIdRow = mysqli_query($db, $contactIdQuery);
        $contactId = mysqli_fetch_assoc($contactIdRow)['contact_id'];
//        $insertEvent = "INSERT INTO event (event_title, main_type, "
//                . "event_description, start_date_time, end_date_time, address_id, "
//                . "main_topic_id, main_event_org_id) VALUES ('$title', '$typeId', "
//                . "'$description', '$startDate', $endDate', '$addressId', '$topicId', '$orgId')";
        //uploads the event image
        if ($_FILES['eventImage']['tmp_name'] != "") {
            $imgData = addslashes(file_get_contents($_FILES['eventImage']['tmp_name']));
            $imageProperties = getimageSize($_FILES['eventImage']['tmp_name']);
            //change which table is uploaded to
            $insertImg = "INSERT INTO event_image(imageData) "
                    . "VALUES('{$imgData}')";
            $insertImgQuery = mysqli_query($db, $insertImg) or die("<b>Error:</b> Problem on Image Insert<br/>");
            $imgIdQuery = "SELECT event_image_id FROM event_image;";
            $insertImgId = mysqli_fetch_assoc($imgIdQuery)['event_image_id'];
            $insertImgRow = mysqli_query($db, $insertImgId);
            //gets the image id so we can insert it into the event database
            $eventImgId = mysqli_fetch_assoc($insertImgRow)['event_image_id'];
        }
        $insertEvent = "INSERT INTO event (event_title, main_event_type, main_event_subtype, "
                . "event_description, start_date_time, end_date_time, "
                . "address_id, event_main_topic_id, event_main_sponsor_id, main_contact_id) VALUES "
                . "('$title', '$typeId', 1, '$description', '$startDate', "
                . "'$endDate', '$addressId', '$topicId', '$orgMainId', '$contactId')";
        $insertEventQuery = mysqli_query($db, $insertEvent);
        if ($insertEventQuery === TRUE) {
            echo "New event created successfully";
        } else {
            echo nl2br("Error: 6" . $insertEventQuery . "<br>" . $db->error);
        }
        $eventIdQuery = "SELECT event_id FROM event WHERE event_title = '$title'";
        $eventIdRow = mysqli_query($db, $eventIdQuery);
        $eventId = mysqli_fetch_assoc($eventIdRow)['event_id'];
        //just insert the suborg and link them through event_sponsor table
        $subOrgCount = count($allOrgNameArray);
        //suborgs are all organizations not in the 0 portion
        for ($i = 1; $i < $subOrgCount; $i++) {
//            if (is_uploaded_file($_FILES['orgImage']['tmp_name'])) {
            $imgData = addslashes(file_get_contents($_FILES['orgImage']['tmp_name'][$i]));
            //checks if an image was uploaded by checking if the name is not blank
            if ($_FILES['orgImage']['tmp_name'][$i] != "") {
                $imageProperties = getimageSize($_FILES['orgImage']['tmp_name'][$i]);
                //change which table is uploaded to
                $insertImg = "INSERT INTO event_image(imageData) "
                        . "VALUES('{$imgData}')";
                $insertImgQuery = mysqli_query($db, $insertImg) or die("<b>Error:</b> Problem on Image Insert<br/>");
                $imgIdQuery = "SELECT event_image_id FROM event_image;";
                $insertImgId = mysqli_fetch_assoc($imgIdQuery)['event_image_id'];
                $insertImgRow = mysqli_query($db, $insertImgId);
                //gets the image id so we can insert it into the event database
                $imgId = mysqli_fetch_assoc($insertImgRow)['event_image_id'];
                //use this img id to link to the sponsor
//            if (isset($current_id)) {
//                header("Location: listImages.php");
//            }
            }
            $orgSubName = mysqli_real_escape_string($db, $allOrgNameArray[$i]);
            $orgSubWebsite = mysqli_real_escape_string($db, $allOrgWebsiteArray[$i]);
//            $orgSubCheck = mysqli_query($db, "SELECT * FROM organization WHERE" .
//                    "org_name = '$orgSubName'");
            $insertSubOrg = "INSERT INTO organization (org_name, org_website, org_address_id)"
                    . "VALUES ('$orgSubName', '$orgSubWebsite', 1);";
            $insertSubOrgQuery = mysqli_query($db, $insertSubOrg);
            if ($insertSubOrgQuery === TRUE) {
                echo "New oragnization created successfully";
            } else {
                echo nl2br("Error: 7" . $insertSubOrgQuery . "<br>" . $db->error);
            }
            $orgSubIdQuery = "SELECT org_id FROM organization WHERE org_name = '$orgSubName'";
            $orgSubIdRow = mysqli_query($db, $orgSubIdQuery);
            $orgSubId = mysqli_fetch_assoc($orgSubIdRow)['org_id'];
            $insertEventSubSponsor = "INSERT INTO event_sponsor (event_id, org_id) "
                    . "VALUES ('$eventId', '$orgSubId');";
            $insertEventSubSponsorQuery = mysqli_query($db, $insertEventSubSponsor);
            if ($insertEventSubSponsorQuery === TRUE) {
                echo "New subsponsor created successfully";
            } else {
                echo nl2br("Error: 8" . $insertEventSubSponsorQuery . "<br>" . $db->error);
            }
        }
        //$eventSubtype
        //insert event subtypes
        $subtopicCount = count($allSubtopicArray);
        for ($i = 0; $i < $subtopicCount; $i++) {
            $subtopic = mysqli_real_escape_string($db, $allSubtopicArray[$i]);
//            $insertSubTopic = ;
            $subtopicQuery = "INSERT INTO subtopics (main_topic_id, subtopic) "
                    . "VALUES ('$topicId', '$subtopic');";
            $insertSubtopicQuery = mysqli_query($db, $subtopicQuery);
            if ($insertSubtopicQuery === TRUE) {
                echo "New subtopic created successfully";
            } else {
                echo nl2br("Error: 7" . $insertSubOrgQuery . "<br>" . $db->error);
            }
            $subtopicIdQuery = "SELECT subtopic_id FROM subtopics WHERE subtopic = '$subtopic'";
            $subtopicIdRow = mysqli_query($db, $subtopicIdQuery);
            $subtopicId = mysqli_fetch_assoc($subtopicIdRow)['subtopic_id'];
            $event_subtopicsQuery = "INSERT INTO event_subtopics (es_event_id, es_subtopic_id) "
                    . "VALUES ('$eventId', '$subtopicId');";
            $insertEventSubtopicQuery = mysqli_query($db, $event_subtopicsQuery);
            if ($insertEventSubtopicQuery === TRUE) {
                echo "New subtopic link created successfully";
            } else {
                echo nl2br("Error: 8" . $insertEventSubtopicQuery . "<br>" . $db->error);
            }
        }
        $subtypeCount = count($allSubtypeArray);
        for ($i = 0; $i < $subtypeCount; $i++) {
            $subtype = mysqli_real_escape_string($db, $allSubtypeArray[$i]);
//            $insertSubTopic = ;
            $subtypeQuery = "INSERT INTO subtypes (main_type_id, subtype_type) "
                    . "VALUES ('$typeId', '$subtype');";
            $insertSubtypeQuery = mysqli_query($db, $subtypeQuery);
            if ($insertSubtypeQuery === TRUE) {
                echo "New subtype created successfully";
            } else {
                echo nl2br("Error: 7" . $insertSubtypeQuery . "<br>" . $db->error);
            }
            $subtypeIdQuery = "SELECT subtype_id FROM subtypes WHERE subtype_type = '$subtype'";
            $subtypeIdRow = mysqli_query($db, $subtypeIdQuery);
            $subtypeId = mysqli_fetch_assoc($subtypeIdRow)['subtype_id'];
            $event_subtypesQuery = "INSERT INTO event_subtype (estype_event_id, estype_subtype_id) "
                    . "VALUES ('$eventId', '$subtypeId');";
            $insertEventSubtypeQuery = mysqli_query($db, $event_subtypesQuery);
            if ($insertEventSubtypeQuery === TRUE) {
                echo "New subtype link created successfully";
            } else {
                echo nl2br("Error: 8" . $insertEventSubtypeQuery . "<br>" . $db->error);
            }
        }
        mysqli_close($db);
    }
}
submitFormToDB();