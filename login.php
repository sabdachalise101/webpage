<?php
session_start();
$connection = mysqli_connect('localhost', 'websitesabda', 'From2062@1', 'websitesabda') or die('SORRY FAILED');

$email = mysqli_real_escape_string($connection, $_POST['email']);
$username = mysqli_real_escape_string($connection, $_POST['username']);
$password = mysqli_real_escape_string($connection, $_POST['password']);
$gender = mysqli_real_escape_string($connection, $_POST['gender']);

$sql = "SELECT * FROM `form` WHERE email = '$email'";
$qry = mysqli_query($connection, $sql);

// Check if the query was successful
if (!$qry) {
    die('Query failed: ' . mysqli_error($connection));
}

// Check if a record was found
$res = mysqli_fetch_assoc($qry);
if (!$res) {
    echo "Email not found";
} else {
    $d_email = $res['email'];
    $d_password = $res['password'];
    $d_gender = $res['gender'];

    // Verify the password using password_verify
    if (password_verify($password, $d_password)) {
        $_SESSION['login'] = $email;
        header("location:succelog.php");
    } else {
        echo "Wrong password";
    }
}

mysqli_close($connection);
?>

