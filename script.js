// JavaScript function to add glow effect when button is clicked
function addGlowEffect() {
    var button = document.getElementById("submitButton");
    button.classList.add("glow");

    // Remove glow effect after a short delay
    setTimeout(function () {
        button.classList.remove("glow");
    }, 500);
}

// JavaScript function to handle form submission
function submitForm() {
    // Get form element
    var form = document.getElementById("myForm");

    var username = form.elements["username"].value;
    var email = form.elements["email"].value;

    // For radio buttons, check which one is selected
    var gender;
    if (form.elements["gender"].value === "male") {
        gender = "Male";
    } else {
        gender = "Female";
    }

    // Log the submitted data to the console
    console.log("Submitted Data:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Gender:", gender);
}
