<?php

include "connect.php";

//$startDate, $endDate, $eventTypes, $topics
function submitFormToDB() {
    $db = connect();
    if ($db->connect_errno) {
        die('Database connection unavailable: ' . mysqli_connect_error());
    }

    if (isset(filter_input(INPUT_POST, 'submit'))) {
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
        $title = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'title'));
        $type = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'type'));
        $topic = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'type'));
        $description = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'description'));

        //organization variables
        $orgName = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_name'));
        $orgWebsite = mysqli_real_escape_string($db, filter_input(INPUT_POST, 'organization_website'));
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
        if (!checkQueryTermExists($addressCheck)) {
            $insertAddress = "INSERT INTO address"
                    . "(building_name, street_address, city, state, zip) VALUES"
                    . "('$buildingName', '$streetAddress', '$city', '$state', '$zip');";
            $insertAddressQuery = mysqli_query($db, $insertAddress);
            if ($db->query($insertAddressQuery) === TRUE) {
                echo "New address created successfully";
            } else {
                echo "Error: " . $insertAddressQuery . "<br>" . $db->error;
            }
        }

        $orgAddressCheck = mysqli_query($db, "SELECT * FROM address WHERE" .
                "street_address = $orgAddress");
        if (!checkQueryTermExists($orgAddressCheck)) {
            $insertOrgAddress = "INSERT INTO address (street_address, city, state, zip)"
                    . "VALUES ('$orgAddress', '$orgCity', '$orgState', $orgZip');";
            $insertOrgAddressQuery = mysqli_query($db, $insertOrgAddress);
            if ($db->query($insertOrgAddressQuery) === TRUE) {
                echo "New oragnization address created successfully";
            } else {
                echo "Error: " . $insertAddressQuery . "<br>" . $db->error;
            }
        }

        $insertTopic = "INSERT INTO event_topic (event_topic) VALUES ('$topic');";
        $insertTopicQuery = mysqli_query($db, $insertTopic);
        if ($db->query($insertTopicQuery) === TRUE) {
            echo "New oragnization created successfully";
        } else {
            echo "Error: " . $insertTopicQuery . "<br>" . $db->error;
        }

        //get the ids for insertion
        $addressIdQuery = "SELECT address_id FROM address "
                . "WHERE street_address ='$streetAddress'";
        $addressId = mysqli_query($db, $addressIdQuery);

        $orgAddressIdQuery = "SELECT address_id FROM address "
                . "WHERE street_address ='$orgAddress'";
        $orgAddressId = mysqli_query($db, $orgAddressIdQuery);

        $topicIdQuery = "SELECT event_topic_id FROM event_topic "
                . "WHERE event_topic = '$topic'";
        $topicId = mysqli_query($db, $topicIdQuery);

        $orgCheck = mysqli_query($db, "SELECT * FROM organization WHERE" .
                "org_name = '$orgName'");
        if (!checkQueryTermExists($orgCheck)) {
            $insertOrg = "INSERT INTO organization (org_name, org_website, org_address_id)"
                    . "VALUES ('$orgName', '$orgWebsite', '$orgAddressId');";
            $insertOrgQuery = mysqli_query($db, $insertOrg);
            if ($db->query($insertOrgQuery) === TRUE) {
                echo "New oragnization created successfully";
            } else {
                echo "Error: " . $insertOrgQuery . "<br>" . $db->error;
            }
        }

        $orgIdQuery = "SELECT org_id FROM organization WHERE org_name = '$orgName'";
        $orgId = mysqli_query($db, $orgIdQuery);

        $contactCheck = mysqli_query($db, "SELECT * FROM contact WHERE" .
                "email = '$email'");
        if (!checkQueryTermExists($contactCheck)) {
            $insertContact = "INSERT INTO contact (first_name, last_name, email, phone, "
                    . "org_id VALUES ('$firstName', '$lastName', '$email', "
                    . "'$phoneNumber', '$orgId')";
            $insertContactQuery = mysqli_query($db, $insertContact);
            if ($db->query($insertContactQuery) === TRUE) {
                echo "New contact created successfully";
            } else {
                echo "Error: " . $insertContactQuery . "<br>" . $db->error;
            }
        }


        $contactIdQuery = "SELECT contact_id FROM contact "
                . "WHERE email = '$email'";
        $contactId = mysqli_query($db, $contactIdQuery);

        $insertEvent = "INSERT INTO event (event_title, event_type, event_description, "
                . "start_date_time, end_date_time, address_id, main_topic_id,"
                . "main_event_org_id) VALUES ('$title', '$type', '$description', "
                . "'$startDate', $endDate', '$addressId', '$topicId',"
                . "'$orgId');";
        $insertEventQuery = mysqli_query($db, $insertEvent);
        if ($db->query($insertEventQuery) === TRUE) {
            echo "New event created successfully";
        } else {
            echo "Error: " . $insertEventQuery . "<br>" . $db->error;
        }
    }
    mysqli_close($db);
}

function checkQueryTermExists($queryTerm) {
    if (mysql_num_rows($queryTerm) == 0) {
        // row not found, insert data
        return false;
    } else {
        //row found, get id
        return true;
    }
}
