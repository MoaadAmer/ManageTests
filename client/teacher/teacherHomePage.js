window.addEventListener("load", async (event) => {
    console.log("teacherHomePage is fully loaded");
    let user = JSON.parse(window.sessionStorage.getItem("user"));

    showWelcomeMessage(user);

    let newExamBtn = document.querySelector("#newExamBtn");

    newExamBtn.addEventListener('click', function () {
        window.location.href = "addExam.html";
    });

    let examsTableBody = document.querySelector("#examsTable tbody");
    let exams = await getAllExams();

    exams = exams.filter(exam => exam.teacherId == user.id);

    // exams.forEach(exam => {
    //     examsTableBody.appendChild(`<tr>
    //     <th scope="row">${exam.id}</th>
    //     <td>${exam.name}}</td>
    //     <td>${exam.date}</td>
    //     <td>${exam.startTime}</td>
    //     <td>${exam.totalTime}</td>
    //     <td>${exam.isRandom}</td>
    //     <td>${exam.grade}</td>
    // </tr>`)
    // });

    // for (let i = 0; i < exams.length; i++) {
    //     const tr = examsTableBody.insertRow();
    //     for (let j = 0; j < exams[0].length; j++) {
    //         if (j == 0) {

    //             let th = document.createElement('th');
    //             th.innerHTML = "Second";
    //         }
    //     }

    //     examsTableBody.appendChild(tr);
    // }


});

function showWelcomeMessage(user) {
    let h1 = document.querySelector("h1");


    h1.innerHTML = `Welcome back ${user.fullName}`;
}


async function getAllExams() {

    const response = await fetch("http://localhost:5001/api/exams");
    const responseAsJson = await response.json();
    return responseAsJson.data;
}