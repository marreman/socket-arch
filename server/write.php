<?php

$data = json_decode(file_get_contents("data.json"));
$requests = json_decode(file_get_contents('php://input'));
header("Content-Type: application/json");

foreach ($requests as $entity_name => $changes) {
	$entities = $data->$entity_name;

	foreach ($entities as $entity) {
		foreach ($changes as $change) {
			if ($entity->id == $change->id) {
				foreach ($change as $prop => $value) {
					$entity->$prop = $value;
				}
			}
		}
	}
}

echo json_encode($data);
file_put_contents("data.json", json_encode($data));

