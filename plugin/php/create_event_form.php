<!DOCTYPE html>
<html>
    <head>
        <title>Create New Event</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
        <script>
            $(function () {
                $("#addMore").click(function (e) {
                    e.preventDefault();
                    $("#fieldList").append("<li>&nbsp;</li>");
                    $("#fieldList").append(
                            "<li>Organization Name*:<input type='text' name=\n\
                            'organization_name' required></li>");
                    $("#fieldList").append(
                            "<li>Organization Website*:<input type='text' name=\n\
                            'organization_website'></li>");
                });
            });
        </script>
        <style>
            ul {
                padding: 0;
                margin: 0;
            }

            ul li {
                list-style: none;
            }
        </style>
    </head>
    <body>
        <h1>New Event Form</h1>
        <form action="createEvent.php" method="post" enctype="multipart/form-data">

            <h3>Event Info</h3>
            Title*: <input type="text" name="title" required><br>
            Type*: <input type="text" name="type" required><br>
            <label for="topic">Topic*:</label>
            <textarea name="topic" id="topic" rows="1" cols="50" required></textarea><br>
            <label for="description">Event Description*:</label>
            <textarea name="description" id="description" rows="5" cols="50" required></textarea><br>
            <!-- calendar input for date-->
            Start Date*:<input type="date" name="start_date" required value="mm/dd/yyyy">
            End Date*:<input type="date" name="end_date" required value="mm/dd/yyyy">
            Start Time*:<input type="time" name="start_time" value="--:-- --">
            End Time*:<input type="time" name="end_time" value="--:-- --"><br>
            Building*:<input type="text" name="building" required><br>
            Address*:<input type="text" name="street_address" required><br>
            City*:<input type="text" name="city" required><br>
            State*:<input type="text" name="state" required><br>
            Zip*:<input type="text" name="zip" required><br>

            <h3>Organization</h3>
            <ul id="fieldList">
                <li>
                    Organization Name*:<input type="text" name="organization_name" required><br>
                </li>
                <li>
                    Organization Website*:<input type="text" name="organization_website"><br>
                </li>
            </ul>
            <!--adds more fields on button click-->
            <button id="addMore">Add another sponsor</button><br><br>

            <h3>Contact Info</h3>
            First Name*:<input type="text" name="first_name" required><br>
            Last Name*:<input type="text" name="last_name" required><br>
            e-mail*:<input type="text" name="email" required><br> <!--add some asynch to check if email already exists-->
            Phone Number*:<input type="text" name="phone_number" required><br>
            Select image to upload:
            <input type="file" name="fileToUpload" id="fileToUpload"><br>
            <input type="submit" name="submit" value="Submit New Event">
        </form>
    </body>
</html>
