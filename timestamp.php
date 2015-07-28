<?php
date_default_timezone_set('Europe/Brussels');

$dt = new DateTime();
$end = DateTime::createFromFormat("Y-m-d H:i:s", "2015-08-07 16:00:00");

echo json_encode(array('timestamp' => $dt->getTimestamp(), 'endOfSuffering'=>$end->getTimestamp()));