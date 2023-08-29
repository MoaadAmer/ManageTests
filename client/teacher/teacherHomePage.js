window.addEventListener("load", async (event) => {
    console.log("teacherHomePage is fully loaded");

    let h1 = document.querySelector("h1");
    let user = JSON.parse(window.sessionStorage.getItem("user"));

    h1.innerHTML = `Welcome back ${user.fullName}`;


    let newExamBtn = document.querySelector("#newExamBtn");

    newExamBtn.addEventListener('click', function () {
        window.location.href = "addExam.html";
    });

    let examsTable = document.querySelector("#examsTable");
    let data = await getAllExams();
    console.log(data + "\r\n\r\n");
    data = data.filter(exam => exam.teacherId == user.id);

    console.log(data);

});



async function getAllExams() {

    const response = await fetch("http://localhost:5001/api/exams");
    const responseAsJson = await response.json();
    return responseAsJson.data;
}