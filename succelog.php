<?php
session_start();
if(isset($_SESSION['login'])){
    header("location:index.html");
}
<h1>YOUR DATA HAD BEEN SUBMITTED </h1>
<h2>WE WILL CONTACT YOU SHORTLY</h2>



?>