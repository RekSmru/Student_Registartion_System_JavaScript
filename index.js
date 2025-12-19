const form = document.querySelector(".studentForm");
const tableBody = document.getElementById("tableBody");

let students = JSON.parse(localStorage.getItem("students")) || [];

/* Load students on page refresh */
window.addEventListener("DOMContentLoaded", () => {
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });
});

/* Form submit */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    error.textContent = "";

    // Regular Expressions
    const nameRegex = /^[A-Za-z\s]+$/;
    const idRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[0-9]{10,}$/;

    if (!name || !studentId || !email || !contact) {
        error.textContent = "All fields are required.";
        return;
    }

    if (!nameRegex.test(name)) {
        error.textContent = "Student name must contain only letters.";
        return;
    }

    if (!idRegex.test(studentId)) {
        error.textContent = "Student ID must contain only numbers.";
        return;
    }

    if (!emailRegex.test(email)) {
        error.textContent = "Please enter a valid email address.";
        return;
    }

    if (!contactRegex.test(contact)) {
        error.textContent = "Contact number must contain at least 10 digits.";
        return;
    }

addStudentToTable(name, studentId, email, contact);

    const student = { name, studentId, email, contact };
    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    addStudentToTable(student, students.length - 1);
    form.reset();
});

/* Add student to table */
function addStudentToTable(student, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
}

/* Delete student */
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    refreshTable();
}

/* Edit student */
function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    deleteStudent(index);
}

/* Refresh table */
function refreshTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });
}
