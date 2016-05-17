<!DOCTYPE html>
<html>
    <head>
        <title>Create New Event</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
        <script src="../js/create_new_event.js"></script>
<<<<<<< HEAD
        <script src="../js/jonthornton-jquery-timepicker-18fd09d/jquery.timepicker.js" type="text/javascript"></script>
        <script src="../js/Datepair.js-master/dist/datepair.js" type="text/javascript"></script>
        <script src="../js/Datepair.js-master/dist/jquery.datepair.js" type="text/javascript"></script>
        <!--<link href="../css/base.css" rel="stylesheet">-->
        <link href="../js/jonthornton-jquery-timepicker-18fd09d/jquery.timepicker.css" rel="stylesheet">
        <link href="../css/create_event_form.css" rel="stylesheet">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script src="../js/AjaxFunctions.js" type="text/javascript"></script>
        <script src="../js/EventList.js" type="text/javascript"></script>
        <script src="../js/Filter.js" type="text/javascript"></script>
        <script src="../js/city-state.js" type="text/javascript"></script>
        <script src="../js/jonthornton-jquery-timepicker-18fd09d/jquery.timepicker.js" type="text/javascript"></script>
        <script src="../js/Datepair.js-master/dist/datepair.js" type="text/javascript"></script>
        <script src="../js/Datepair.js-master/dist/jquery.datepair.js" type="text/javascript"></script>
        <link href="../js/jonthornton-jquery-timepicker-18fd09d/jquery.timepicker.css" rel="stylesheet">
        <link href="../js/jquery-ui-1.12.0-rc.2.custom/jquery-ui.css" rel="stylesheet">
=======
        <link href="../css/create_event_form.css" rel="stylesheet">
>>>>>>> e8604ab836e8f7d97c0da7363f99999ea3b22192
    </head>
    <body>
        <h1>New Event Form</h1>
        <form action="../php/createEvent.php" method="post" enctype="multipart/form-data">

            <h3>Event Info</h3>
            Title*: <input type="text" name="title" required><br>
            Type*:<select id="type" name="type" required>
                <option selected disabled hidden style='display: none' value=''></option>
                <option value="Action">Action</option>
                <option value="Knowledge">Knowledge</option>
                <option value="Involvement">Involvement</option>
            </select><br>
            <!--an empty div class that gets dynamically written to for subtypes-->
            <div class="subtype"></div>
            Topic*:<select id="topic" name="topic" required>
                <option selected disabled hidden style='display: none' value=''></option>
                <option value="fossil">Fossil Fuel</option>
                <option value="legislative">Legislative/Regulatory</option>
                <option value="transport">Transport</option>
                <option value="energy">Alternate Energy</option>
                <option value="other">Other</option>
            </select><br>
            <!--an empty div class that gets dynamically written to for subtypes-->
            <div class="subtopic"></div>
            <label for="description">Event Description*:</label>
            <textarea name="description" id="description" rows="5" cols="50" required></textarea><br>
<<<<<<< HEAD

            <!-- calendar input for date-->
            <div id="filterSideBar">
                <form id="formFilterField">
                    <label for="dateStartFilterField">Start Date/Time</label><br>
                    <span id="dateStartFilterField">
                        <input type="text" name="start_date" id="dateStart" class="filterDate" value="Start Date">
                        <input type="text" name="start_time" id="timeStart" class="filterDate" value="Start Time">
                    </span><br>
                    <label for="dateEndFilterField">End Date/Time</label><br>
                    <span id="dateEndFilterField">
                        <input type="text" name="end_date" id="dateEnd" class="filterDate" value="End Date">
                        <input type="text" name="end_time" id="timeEnd" class="filterDate" value="End Time">
                    </span><br>
                </form>
            </div>
           
=======
            <!-- calendar input for date-->
            <label for="start_date">Start Date*:</label>
            <input type="date" name="start_date" required value="mm/dd/yyyy">
            <label for="end_date">End Date*:</label>
            <input type="date" name="end_date" required value="mm/dd/yyyy">
            <label for="start_time">Start Time*:</label>
            <input type="time" name="start_time" value="--:-- --">
            <label for="end_time">End Time*:</label>
            <input type="time" name="end_time" value="--:--:-- --"><br>
>>>>>>> e8604ab836e8f7d97c0da7363f99999ea3b22192
            <label for="building">Building*:</label>
            <input type="text" name="building" required><br>
            <label for="street_address">Address*:</label>
            <input type="text" name="street_address" required><br>
            <label for="city">City*:</label>
            <input type="text" name="city" required><br>
            <label for="state">State*:</label>
            <input type="text" name="state" required><br>
            <label for="zip">Zip*:</label>
            <input type="text" name="zip" required><br>

            <h3>Organization</h3>
<<<<<<< HEAD
            <input type="button" id="more_sponsors" value="Add More Sponsors" />
            <div id="sponsors">
                <div>
                    <div class='label'>Sponsor 1: </div>
                    <div class="content">
                        <span>Organization Name*:<input type="text" name="organization_name[]" required></span>
                        <span>Organization Website*:<input type="text" name="organization_website[]" required></span>
                    </div>
                </div>
            </div>
            <!--adds more fields on button click-->
            <!--            <button id="addMore">Add another sponsor</button><br><br>-->
=======
            <ul id="fieldList">
                <li>
                    <label for="organization_name[]">Organization Name*:</label>
                    <input type="text" name="organization_name[]" required><br>
                </li>
                <li>
                    <label for="organization_website[]">Organization Website*:</label>
                    <input type="text" name="organization_website[]" required><br>
                </li>
            </ul>
            <!--adds more fields on button click-->
            <button id="addMore">Add another sponsor</button><br><br>
>>>>>>> e8604ab836e8f7d97c0da7363f99999ea3b22192

            <h3>Contact Info</h3>
            <label for="first_name">First Name*:</label>
            <input type="text" name="first_name" required><br>
            <label for="last_name">Last Name*:</label>
            <input type="text" name="last_name" required><br>
            <label for="email">E-Mail*:</label>
            <input type="text" name="email" required><br>
            <label for="phone_number">Phone Number*:</label>
            <input type="text" name="phone_number" required><br>
            <label for="fileToUpload">Select image to upload:</label>
            <input type="file" name="fileToUpload" id="fileToUpload"><br>
            <input type="submit" name="submit" value="Submit New Event">
        </form>
    </body>
</html>