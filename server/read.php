<?php

$data = json_decode(file_get_contents("data.json"), true);

$contract = json_decode(file_get_contents('php://input'));
$fulfillment = array();

foreach ($contract as $entity_name => $value) {
	$entities = $data[$entity_name];
	$fulfillment[$entity_name] = array();

	foreach ($entities as $entity) {
		$result = array();

		foreach ($value->props as $prop => $type) {
			$result[$prop] = $entity[$prop];
		}

		$fulfillment[$entity_name][] = $result;
	}
}

/* echo "<pre>"; */
/* print_r($fulfillment); */


header("Content-Type: application/json");
echo json_encode($fulfillment);
