<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
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

if(isset($_GET['cup'])){
  $cup = $_GET['cup'];
  $back = array();
  $result = $conn->query("SELECT * FROM cup$cup;");
  if ($result) {
      while($row = $result->fetch_assoc()) {
        $obj->user_id = $row['user_id'];
        $obj->name = $row['name'];
        array_push($back,$obj);
      }
  }
  $json = json_encode($back);
  echo $json;

}
?>
