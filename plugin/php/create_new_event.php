<!DOCTYPE html>
<html>
    <head>
        <title>Create New Event</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
        <script src="../js/create_new_event.js"></script>
        <link href="../css/create_event_form.css" rel="stylesheet">
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
            <!-- calendar input for date-->
            <label for="start_date">Start Date*:</label>
            <input type="date" name="start_date" required value="mm/dd/yyyy">
            <label for="end_date">End Date*:</label>
            <input type="date" name="end_date" required value="mm/dd/yyyy">
            <label for="start_time">Start Time*:</label>
            <input type="time" name="start_time" value="--:-- --">
            <label for="end_time">End Time*:</label>
            <input type="time" name="end_time" value="--:--:-- --"><br>
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