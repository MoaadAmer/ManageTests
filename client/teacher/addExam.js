window.addEventListener("load", (event) => {

    let addBtn = document.querySelector('#AddExam');

    addBtn.addEventListener('click', addNewExam);


});


async function addNewExam() {

    let name = document.querySelector("#name").value;
    let selectedSubject = document.querySelector("option:checked").text.toLowerCase();
    let selectedSubjectGroup = document.querySelector("option:checked").parentElement.label;
    let date = document.querySelector("#date").value;
    let startTime = document.querySelector("#startTime").value;
    let totalTime = document.querySelector("#totalTime").value;
    let random = document.querySelector("#random").value;
    let grade = document.querySelector("#grade").value;

    if (name == "" || selectedSubject == "" || date == "" || startTime == ""
        || totalTime == "" || random == "", grade == "") {
        alert("Please provide all data for the exam");
        return;
    }
    let user = JSON.parse(sessionStorage.getItem("user"));
    let subjectsObj = await getAllsubjects();

    let subjectId = subjectsObj.find(s => s.name.toLowerCase() == selectedSubject).id;

    let examId = getNextId(await getAllExams());
    var questions;
    if (selectedSubjectGroup == "Other") {
        questions = await getOtherQuestions(selectedSubject);

    }
    else if (selectedSubjectGroup == "Code") {
        questions = await getCodeQuestions(selectedSubject);
    }


    let data = {
        "teacherId": user.id,
        "subjectId": subjectId,
        "id": examId,
        "name": name,
        "date": date,
        "startTime": startTime,
        "totalTime": totalTime,
        "isRandom": random,
        "grade": grade,
        "questions": [
            {
                "question": questions
            }
        ]
    };

    let res = await addExam(data);
    if (res.status == 201) {
        alert("Exam have been created successfully");
    }
    else {
        alert("Couldnt create exam");
    }

    window.location.href = "teacherHomePage.html";
}

async function getOtherQuestions(category) {
    try {

        const apiKey = "2LnRa9UQy80SwkgPadIfU9myPWLE4wS3BSeifX5H";
        const limit = 10;
        const difficulty = "Easy"

        const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${category}&difficulty=${difficulty}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

async function getCodeQuestions(tag) {
    try {

        const apiKey = "2LnRa9UQy80SwkgPadIfU9myPWLE4wS3BSeifX5H";
        const limit = 10;
        const difficulty = "Easy"
        const category = "Code";

        const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${category}&difficulty=${difficulty}&limit=${limit}&tags=${tag}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

async function addExam(data) {
    try {
        const response = await fetch("http://localhost:5001/api/exams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

async function getAllExams() {
    try {
        const response = await fetch("http://localhost:5001/api/exams", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        return result.data;
    } catch (error) {
        throw error;
    }
}

async function getAllsubjects() {
    try {
        const response = await fetch("http://localhost:5001/api/subjects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();
        return result.data;
    } catch (error) {
        throw error;
    }
}

function getNextId(obj) {
    return (Math.max.apply(Math, obj.map(function (o) {
        return o.id;
    })) + 1);
}

