<?php

include "php/connect.php";

include "php/getEvent.php";
include "php/getEventTypes.php";
include "php/getSubtopics.php";
include "php/getSubtypes.php";

echo getEventTypes();
echo "<br>";
echo "<br>";

echo getEvent(`2016-01-01 12:00:00`, `2016-01-01 14:00:01`);
echo "<br>";
echo "<br>";

echo getSubtopics();
echo "<br>";
echo "<br>";

echo getSubtypes();
echo "<br>";
echo "<br>";

?>