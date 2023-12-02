<?php
session_start();
$connection = mysqli_connect('localhost', 'root', 'From2062@1', 'websitesabda') or die('SORRY FAILED');

// Ensure that the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve form data
    $username = mysqli_real_escape_string($connection, $_POST['username']);
    $email = mysqli_real_escape_string($connection, $_POST['email']);
    $password = mysqli_real_escape_string($connection, $_POST['password']);
    $gender = mysqli_real_escape_string($connection, $_POST['gender']);

    // Hash the password using password_hash
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert data into the database
    $insert_query = "INSERT INTO `form` (username, email, password, gender) VALUES ('$username', '$email', '$hashed_password', '$gender')";
    $result = mysqli_query($connection, $insert_query);

    // Check if the query was successful
    if ($result) {
        // Check if a record was found
        $select_query = "SELECT * FROM `form` WHERE email='$email'";
        $select_result = mysqli_query($connection, $select_query);

        if ($select_result) {
            $record = mysqli_fetch_assoc($select_result);

            // Verify the password using password_verify
            if ($record && password_verify($password, $record['password'])) {
                // Record found and password verified
                $_SESSION['login'] = $email;
                header("location:succelog.php");
            } else {
                echo "Error: Unable to verify password";
            }
        } else {
            echo "Error: Unable to retrieve record";
        }
    } else {
        echo "Error: Unable to insert data";
    }
}

mysqli_close($connection);
?>

