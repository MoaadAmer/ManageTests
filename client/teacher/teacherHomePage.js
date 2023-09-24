window.addEventListener("load", async (event) => {
    console.log("teacherHomePage is fully loaded");
    let user = JSON.parse(window.sessionStorage.getItem("user"));

    showWelcomeMessage(user);

    let newExamBtn = document.querySelector("#newExamBtn");

    newExamBtn.addEventListener('click', function () {
        window.location.href = "addExam.html";
    });

    let exams = await getAllExams();
    exams = exams.filter(exam => exam.teacherId == user.id);
    renderDataInTheTable(exams);

});

function renderDataInTheTable(data) {

    const tbodyRef = document.getElementById('examsTable').getElementsByTagName('tbody')[0];
    columns = ["id", "name", "date", "startTime", "totalTime", "isRandom", "grade"];
    data.forEach(rowData => {

        let newRow = document.createElement("tr");

        columns.forEach((column) => {
            let cell;
            if (column == "id") {
                cell = document.createElement("th");
                cell.setAttribute("scope", "row");

            }
            else {
                cell = document.createElement("td");
            }
            cell.innerText = rowData[column];
            newRow.appendChild(cell);

        });

        tbodyRef.appendChild(newRow);

    });
    document.getElementById('totalExamsValue').innerText = data.length;
}

function showWelcomeMessage(user) {
    let h1 = document.querySelector("h1");


    h1.innerHTML = `Welcome back ${user.fullName}`;
}


async function getAllExams() {

    const response = await fetch("http://localhost:5001/api/exams");
    const responseAsJson = await response.json();
    return responseAsJson.data;
}