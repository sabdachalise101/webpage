<?php
session_start();
$connection = mysqli_connect('localhost', 'websitesabda', 'From2062@1', 'websitesabda') or die('SORRY FAILED');

$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];
$gender = $_POST['gender'];

$sql = "SELECT * FROM `form` WHERE email='chalisesabda4@gmail.com'";
$qry = mysqli_query($connection, $sql);
$res = mysqli_fetch_assoc($qry);

$d_email = $res['email'];
$d_password = $res['password'];
$d_gender = $res['gender'];

if ($email == $d_email) {
    if ($password == $d_password) {
        $_SESSION['login'] = $email;
        header("location:succelog.php");
        echo "WRONG PASSWORD";
    } else {
        echo "Email not found";
    }
}
?>
