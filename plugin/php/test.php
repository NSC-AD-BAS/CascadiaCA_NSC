<?php
/**
 * Created by PhpStorm.
 * User: cdub
 * Date: 5/11/2016
 * Time: 3:57 PM
 */
include 'getEvent.php';
$start = '2015-01-01 00:00:07';
$end = '2015-09-09 23:00:45';
$json = getEventsByDateRange($start, $end);
//echo "$json";
$json = getAllEvents();
echo "$json";
?>