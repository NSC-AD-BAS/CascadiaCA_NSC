<?php

include "connect.php";

//$startDate, $endDate, $eventTypes, $topics
function submitFormToDB() {
    $db = connect();
    if ($db->connect_errno) {
        die('Database connection unavailable: ' . mysqli_connect_error());
    }

    if (isset($_POST['submit'])) {
        //address variables
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
        $orgName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_name'));
        $orgWebsite = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_website'));
        $orgBuilding = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_building'));
        $orgAddress = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_address'));
        $orgCity = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_city'));
        $orgZip = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_zip'));
        $orgState = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_state'));

        //contact info variables
        $firstName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'first_name'));
        $lastName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'last_name'));
        $email = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'email'));
        $phoneNumber = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'phone_number'));
        //inserts all the necessary data before events and organizations
        //need to check for duplicates before insertions
        $addressCheck = mysqli_query($db, "SELECT * FROM address WHERE" .
                "street_address = $streetAddress");
        //if ($result = mysqli_query($db, "SELECT * FROM address WHERE" .
        //     "street_address = $streetAddress")) {
        // if (mysqli_num_rows($result) <= 0) {
        $insertAddress = "INSERT INTO address"
                . "(building_name, street_address, city, state, zip) VALUES"
                . "('$buildingName', '$streetAddress', '$city', '$state', '$zip');";
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
        $insertOrgAddress = "INSERT INTO address"
                . "(building_name, street_address, city, state, zip) VALUES"
                . "('$orgBuilding', '$orgAddress', '$orgCity', '$orgState', '$orgZip');";
        $insertOrgAddressQuery = mysqli_query($db, $insertOrgAddress);
        if ($insertOrgAddressQuery === TRUE) {
            echo "New oragnization address created successfully";
        } else {
            echo "Error: 1" . $insertAddressQuery . "<br>" . $db->error;
        }
        //  }
        //  }

        $insertTopic = "INSERT INTO event_topic (event_topic) VALUES ('$topic');";
        $insertTopicQuery = mysqli_query($db, $insertTopic);
        if ($insertTopicQuery === TRUE) {
            echo "New oragnization created successfully";
        } else {
            echo "Error:2 " . $insertTopicQuery . "<br>" . $db->error;
        }

        $insertType = "INSERT INTO event_type (event_type) VALUES ('$type');";
        $insertTypeQuery = mysqli_query($db, $insertType);
        if ($insertTypeQuery === TRUE) {
            echo "New type created successfully";
        } else {
            echo "Error: 3" . $insertTypeQuery . "<br>" . $db->error;
        }

        //get the ids for insertion
        $addressIdQuery = "SELECT address_id FROM address "
                . "WHERE street_address = '$streetAddress'";
        $addressIdRow = mysqli_query($db, $addressIdQuery);
        $addressId = mysqli_fetch_assoc($addressIdRow)['address_id'];

        $orgAddressIdQuery = "SELECT address_id FROM address "
                . "WHERE street_address = '$orgAddress'";
        $orgAddressIdRow = mysqli_query($db, $orgAddressIdQuery);
        $orgAddressId = mysqli_fetch_assoc($orgAddressIdRow)['address_id'];

        $topicIdQuery = "SELECT event_topic_id FROM event_topic "
                . "WHERE event_topic = '$topic'";
        $topicIdRow = mysqli_query($db, $topicIdQuery);
        $topicId = mysqli_fetch_assoc($topicIdRow)['event_topic_id'];

        $typeIdQuery = "SELECT event_type_id FROM event_type "
                . "WHERE event_type = '$type'";
        $typeIdRow = mysqli_query($db, $typeIdQuery);
        $typeId = mysqli_fetch_assoc($typeIdRow)['event_type_id'];

        $orgCheck = mysqli_query($db, "SELECT * FROM organization WHERE" .
                "org_name = '$orgName'");
//        if ($result = mysqli_query($db, "SELECT * FROM organization WHERE" .
//                "org_name = '$orgName'")) {
//            if (mysqli_num_rows($result) <= 0) {
        $insertOrg = "INSERT INTO organization (org_name, org_website, org_address_id)"
                . "VALUES ('$orgName', '$orgWebsite', '$orgAddressId');";
        $insertOrgQuery = mysqli_query($db, $insertOrg);
        if ($insertOrgQuery === TRUE) {
            echo "New oragnization created successfully";
        } else {
            echo "Error: 4" . $insertOrgQuery . "<br>" . $db->error;
        }
//            }
//        }

        $orgIdQuery = "SELECT org_id FROM organization WHERE org_name = '$orgName'";
        $orgIdRow = mysqli_query($db, $orgIdQuery);
        $orgId = mysqli_fetch_assoc($orgIdRow)['org_id'];

        $contactCheck = mysqli_query($db, "SELECT * FROM contact WHERE" .
                "email = '$email'");
        //precheck to see ife contact is already in the databse
//        if ($result = mysqli_query($db, "SELECT * FROM contact WHERE" .
//                "email = '$email'")) {
//            if (mysqli_num_rows($result) <= 0) {
        $insertContact = "INSERT INTO contact (first_name, last_name, email, phone, "
                . "org_id) VALUES ('$firstName', '$lastName', '$email', "
                . "'$phoneNumber', '$orgId')";
        $insertContactQuery = mysqli_query($db, $insertContact);
        if ($insertContactQuery === TRUE) {
            echo "New contact created successfully";
        } else {
            echo "Error: 5" . $insertContactQuery . "<br>" . $db->error;
        }
//            }
//        }


        $contactIdQuery = "SELECT contact_id FROM contact "
                . "WHERE email = '$email'";
        $contactIdRow = mysqli_query($db, $contactIdQuery);
        $contactId = mysqli_fetch_assoc($contactIdRow)['contact_id'];

//        $insertEvent = "INSERT INTO event (event_title, event_type, "
//                . "event_description, start_date_time, end_date_time, address_id, "
//                . "main_topic_id, main_event_org_id) VALUES ('$title', '$typeId', "
//                . "'$description', '$startDate', $endDate', '$addressId', '$topicId', '$orgId')";
        $insertEvent = "INSERT INTO event (event_title, event_type, "
                . "event_description, start_date_time, end_date_time, "
                . "address_id, main_topic_id, main_event_org_id) VALUES "
                . "('$title', '$typeId', '$description', '$startDate', "
                . "'$endDate', '$addressId', '$topicId', '$orgId')";
        $insertEventQuery = mysqli_query($db, $insertEvent);
        if ($insertEventQuery === TRUE) {
            echo "New event created successfully";
        } else {
            echo nl2br("Error: 6" . $insertEventQuery . "<br>" . $db->error);
        }
    }
    mysqli_close($db);
}

submitFormToDB();
