

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");

    document.querySelector("#loginBtn").addEventListener('click', login);
    document.querySelector("#signupBtn").addEventListener('click', signup);

});

async function login() {

    console.log("login function");

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    if (email == "" || password == "") {
        alert("Please provide user and password");
        return;
    }

    const responseAsJson = await getUserByEmail(email);
    const data = responseAsJson.data;

    if (data.length == 1) {
        let user = data[0];
        if (user.password == password) {
            alert("Login succeeded");
            window.sessionStorage.setItem("user", JSON.stringify(data[0]));

            if (user.isTeacher == true) {
                window.location.href = "teacher/teacherHomePage.html";
            }
            else {
                window.location.href = "student/studentHomePage.html";
            }
        }
        else {
            alert("Invalid Credentials");
        }
    }
    else {
        alert("Invalid Credentials");
    }
}

async function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;


    if (name == "" || email == "" || password == "") {
        alert("Please provide full name, user and password");
        return;
    }

    let response = await getUserByEmail(email);
    let data = response.data;

    if (data.length == 0) {

        response = await getAllUsers();
        data = response.data;

        let user = {
            "id": getNextId(data),
            "fullName": name,
            "email": email,
            "password": password,
            "isAdmin": false
        };

        try {
            await addUser(user)
            alert("User added successfuly, you may sign in now");
        }
        catch (error) {
            alert(`error : ${error}`);
        }
    }
    else {
        alert("There is already a registered account with this email, please provide another email");
    }

}


async function addUser(data) {
    try {
        const response = await fetch("http://localhost:5001/api/users", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
    } catch (error) {
        throw error;
    }
}


async function getAllUsers() {

    const response = await fetch("http://localhost:5001/api/users");
    const responseAsJson = await response.json();
    return responseAsJson;
}


async function getUserByEmail(email) {

    const URL = "http://localhost:5001/api/users/search?email=" + email;

    const response = await fetch(URL);
    const responseAsJson = await response.json();
    return responseAsJson;
}

function getNextId(obj) {
    return (Math.max.apply(Math, obj.map(function (o) {
        return o.id;
    })) + 1);
}