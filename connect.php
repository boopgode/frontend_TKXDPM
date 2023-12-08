<?php
$server='localhost';
$user='root';
$pass='';
$database='brancy';
$connect=mysqli_connect($server,$user,$pass,$database);
mysqli_query($connect,'set names "utf8"');
?>