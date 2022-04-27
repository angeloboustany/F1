<?php

$total = 0;
$round_id = 0;
$dates = ' ';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

function getResults($url){
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $response = curl_exec($ch);
  curl_close($ch);
  return $response;
}

function getData($round_id) {
  $url = 'ergast.com/api/f1/current.json';

  $response = getResults($url);

  $data = json_decode($response,true);

  $GLOBALS['total'] = $data['MRData']['total'];

  $date = $data['MRData']['RaceTable']['Races'][$round_id]['date'];
  $time = $data['MRData']['RaceTable']['Races'][$round_id]['time'];

 $GLOBALS['dates'] =  $date . " " . $time;
}

function getTime($date){
  $birthday = strtotime($date);

  $secondsLeft = $birthday - time();

  if($secondsLeft < 0){
    $secondsLeft = 0;
  }

  return $secondsLeft;
}

getData($round_id);

while(getTime($dates) == 0 && $round_id < $total){
  $round_id++;
  getData($round_id);
  getTime($dates);
}
echo json_encode(array('round_id' => $round_id));
