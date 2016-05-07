<!DOCTYPE html>
<html>
    <head>
        <title>Create New Event</title>
    </head>
    <body>
        <h1>New Event Form</h1>
        <form action="createEvent.php" method="post" enctype="multipart/form-data">
            Title*: <input type="text" name="title" required><br>
            Type*: <input type="text" name="type" required><br>
            <label for="topic">Topic*:</label>
            <textarea name="topic" id="topic" rows="1" cols="50" required></textarea><br>
            <label for="description">Event Description*:</label>
            <textarea name="description" id="description" rows="5" cols="50" required></textarea><br>
            <!-- calendar input for date-->
            Start Date*:<input type="date" name="start_date" required value="mm/dd/yyyy">
            End Date*:<input type="date" name="end_date" required value="mm/dd/yyyy">
            Start Time*:<input type="time" name="start_time" value="--:-- --"><br>
            Building*:<input type="text" name="building" required><br>
            Address*:<input type="text" name="street_address" required><br>
            City*:<input type="text" name="city" required><br>
            State*:<input type="text" name="state" required><br>
            Zip*:<input type="text" name="zip" required><br>
            
            Organization<br>
            Organization Name*:<input type="text" name="organization_name"><br>
            Organization Website:<input type="text" name="organization_website"><br>
            Organization Address:<input type="text" name="organization_address"><br>
            Organization City:<input type="text" name="organization_city"><br>
            Organization State:<input type="text" name="organization_state"><br>
            Organization Zip:<input type="text" name="organization_zip"><br>

            Contact Info<br>
            First Name*:<input type="text" name="first_name" required><br>
            Last Name*:<input type="text" name="last_name" required><br>
            e-mail*:<input type="text" name="email" required><br>
            Phone Number*:<input type="text" name="phone_number" required><br>
                Select image to upload:
                <input type="file" name="fileToUpload" id="fileToUpload"><br>
                <input type="submit" value="Submit New Event">
            </form>





            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    </body>
</html>