
window.addEventListener("load", (event) => {
    console.log("teacherHomePage is fully loaded");

    let h1 = document.querySelector("h1");
    let user = JSON.parse(window.sessionStorage.getItem("user"));

    h1.innerHTML = `Welcome back ${user.fullName}`;

});


window.addEventListener("load", async (event) => {
    console.log("teacherHomePage is fully loaded");
    let user = JSON.parse(window.sessionStorage.getItem("user"));

    showWelcomeMessage(user);

    let exams = await getAllExams();
    renderDataInTheTable(exams);

});

function renderDataInTheTable(data) {

    const tbodyRef = document.getElementById('examsTable').getElementsByTagName('tbody')[0];
    columns = ["id", "name", "date", "startTime", "totalTime", "isRandom", "grade", "start"];
    data.forEach(rowData => {

        let newRow = document.createElement("tr");

        columns.forEach((column) => {
            let cell;
            if (column == "id") {
                cell = document.createElement("th");
                cell.setAttribute("scope", "row");
                cell.innerText = rowData[column];

            }
            else if (column == "start") {
                cell = document.createElement("td");
                cell.innerHTML = `<button id="${rowData["id"]}">Start</button>`
            }
            else {
                cell = document.createElement("td");
                cell.innerText = rowData[column];
            }
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