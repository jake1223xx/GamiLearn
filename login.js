function signup() {
    const user = document.getElementById("newUser").value;
    const pass = document.getElementById("newPass").value;
    const error = document.getElementById("error");

    if (user === "" || pass === "") {
        error.innerHTML = "All fields are required!";
        return;
    }

    // Save to localStorage
    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    error.style.color = "green";
    error.innerHTML = "Account created! Redirecting...";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1200);
}

// LOGIN FUNCTION
function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    const error = document.getElementById("error");

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
    } else {
        error.innerHTML = "Incorrect username or password!";
    }
}

// AUTO-REDIRECT IF NOT LOGGED IN
if (location.pathname.includes("home.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    } else {
        document.getElementById("welcome").innerHTML =
            "Welcome, " + localStorage.getItem("username") + " 🎉";
    }
}

// LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}