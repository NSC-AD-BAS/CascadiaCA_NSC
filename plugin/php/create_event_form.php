<!DOCTYPE html>
<html>
    <head>
        <title>Create New Event</title>
        <link rel="stylesheet" type="text/css" href="../css/base.css">
        <script src="../js/FormSubmit.js" type="javascript"></script>
    </head>
    <body>
        <h1>New Event Form</h1>
        <form action="create_new_event.php" method="post" enctype="multipart/form-data" id="eventForm">
            <div class="formSpan">
            <label for="titleField">Title*:</label><input type="text" name="title" required id="titleField">
                </div><br>
            <div class="formSpan">
            <label for="typeField">Type*:</label>&nbsp;<input type="text" name="type" required id="typeField">
                </div><br>
            <label for="topicField">Topic*:</label>&nbsp;<textarea name="topic" id="topicField" rows="1" cols="50" required></textarea><br>
            <label for="descriptionField">Event Description*:</label>&nbsp;<textarea name="description" id="descriptionField" rows="5" cols="50" required></textarea><br>
            <!-- calendar input for date-->
            <label for="startDate">Start Date*:</label>&nbsp;<input type="date" name="start_date" id="startDate" required value="mm/dd/yyyy">
            <label for="endDate">End Date*:</label>&nbsp;<input type="date" name="end_date" id="endDate" required value="mm/dd/yyyy">
            <label for="startTime">Start Time*:</label>&nbsp;<input type="time" name="start_time" id="startTime" value="--:-- --"><br>
            <label for="buildingField">Building*:</label>&nbsp;<input type="text" name="building" id="buildingField" required><br>
            <label for="streetAddress">Address*:</label>&nbsp;<input type="text" name="street_address" id="streetAddress" required><br>
            <label for="cityField">City*:</label>&nbsp;<input type="text" name="city" id="cityField" required><br>
            <label for="stateField">State*:</label>&nbsp;<input type="text" name="state" id="stateField" required><br>
            <label for="zipField">Zip*:</label>&nbsp;<input type="text" name="zip" id="zipField" required><br>
            
            <h3>Organization</h3><br>
            <label for="orgName">Organization Name:</label>&nbsp;<input type="text" name="organization_name" id="orgName"><br>
            <label for="orgWebsite">Organization Website:</label>&nbsp;<input type="text" name="organization_website" id="orgWebsite"><br>
            <label for="orgAddress">Organization Address:</label>&nbsp;<input type="text" name="organization_address" id="orgAddress"><br>
            <label for="orgCity">Organization City:</label>&nbsp;<input type="text" name="organization_city" id="orgCity"><br>
            <label for="orgZip">Organization Zip:</label>&nbsp;<input type="text" name="organization_zip" id="orgZip"><br>

            <h3>Contact Info</h3><br>
                <label for="firstNameField">First Name*:</label>&nbsp;<input type="text" name="first_name" id="firstNameField" required><br>
                <label for="lastNameField">Last Name*:</label>&nbsp;<input type="text" name="last_name" id="lastNameField" required><br>
                <label for="emailField">e-mail*:</label>&nbsp;<input type="text" name="email" id="emailField" required><br>
                <label for="phoneField">Phone Number*:</label>&nbsp;<input type="text" name="phone_number" id="phoneField" required><br>
                <h4>Select image to upload:</h4>&nbsp;
                <input type="file" name="fileToUpload" id="fileToUpload"><br>
                <input type="submit" value="Submit New Event" id="submitForm">
            </form>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    </body>
</html>