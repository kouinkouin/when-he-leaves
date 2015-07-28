<?php
	$end = DateTime::createFromFormat("Y-m-d H:i:s", "2015-08-07 16:00:00");
	$duration = $end->diff(new DateTime(), true);
	if ($duration->invert === 0) {
		echo "In ".$duration->format("%d days, %H hours, %i minutes, %s seconds");
	} else {
		echo "Left !!";
	}
