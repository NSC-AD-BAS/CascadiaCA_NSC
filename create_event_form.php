<!DOCTYPE html>
<html>
	<head>
		<title>Create New Event</title>
	</head>
	<body>
		<h1>New Event Form</h1>
		<form action="create_new_event.php" method="post" enctype="multipart/form-data">
			Title<input type="text" name="title"><br>
			Type<input type="text" name="type"><br>
			<!-- calendar input for date-->
			Start Date<input type="text" name="start_time"><br>
			End Date<input type="text" name="end_time"><br>
			Address<input type="text" name="street_address"><br>
			City<input type="text" name="city"><br>
			Zip<input type="text" name="zip"><br>
			
			Organization<br>
			Organization Name<input type="text" name="organization_name"><br>
			Organization Website<input type="text" name="organization_website"><br>
			Organization Address<input type="text" name="organization_name"><br>
			Organization City<input type="text" name="organization_city"><br>
			Organization Zip<input type="text" name="organization_zip"><br>
			
			Contact Info<br>
			First Name<input type="text" name="first_name"><br>
			Last Name<input type="text" name="last_name"><br>
			e-mail<input type="text" name="email"><br>
			Phone Number<input type="text" name="phone_number"><br>
			
			<form action="upload.php" enctype="multipart/form-data">
			Select image to upload:
				<input type="file" name="fileToUpload" id="fileToUpload">
			<br>
			<!--perhaps have a different page to upload a image
			Event Photo
		
		-->
		<input type="submit" value="Submit New Event">
		</form>
			
			
		
		
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	</body>
</html>