
window.addEventListener("load", (event) => {
    console.log("teacherHomePage is fully loaded");

    let h1 = document.querySelector("h1");
    let user = JSON.parse(window.sessionStorage.getItem("user"));

    h1.innerHTML = `Welcome back ${user.fullName}`;

});