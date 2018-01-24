<?php
if(isset($_GET['name'],$_GET['cid'],$_GET['sid'],$_GET['league'])){
  $name = $_GET['name'];
  $cid = $_GET['cid'];
  $sid = $_GET['sid'];
  $league = $_GET['league'];

  $servername = "";
$username = "";
$password = "";
$database = "";
// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//Check Table
$result = $conn->query("SELECT * FROM tournaments WHERE tournament_id='cup$league'");
if($result->num_rows == 0){
  $r = $conn->query("INSERT INTO tournaments VALUES (NULL,'cup$league');");
}
$result = $conn->query("CREATE TABLE IF NOT EXISTS cup$league (user_id INT PRIMARY KEY,support_id INT,name VARCHAR(32));");
//Check User and Add User
$result = $conn->query("SELECT * FROM cup$league WHERE user_id='$cid'");
  if($result->num_rows == 0){
    $row_cnt = $result->num_rows;
    $result = $conn->query("INSERT INTO cup$league VALUES ($cid,$sid,'$name');");
  } else {
    echo "User already in :)";
  }
}
?>
