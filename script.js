// script.js

document.addEventListener('DOMContentLoaded', function () {
    fetchPeople();
});

function fetchPeople() {
    fetch('/api/people')
        .then(response => response.json())
        .then(data => {
            people = data;
            updateAllPeopleTable();
            updateBirthdaysThisMonthTable();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const tableBody = document.getElementById('birthdaysThisMonthList');
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 2;
            cell.textContent = 'Error loading data. Ensure Node.js server is running (npm start).';
            cell.style.color = 'red';
            cell.style.textAlign = 'center';
        });
}

let people = []; // Will be populated from API

function updateAllPeopleTable() {
    const tableBody = document.getElementById('allPeopleList');
    tableBody.innerHTML = '';

    for (const person of people) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = person.name;
        row.insertCell(1).textContent = person.dob;
    }
}

function updateBirthdaysThisMonthTable() {
    const tableBody = document.getElementById('birthdaysThisMonthList');
    tableBody.innerHTML = '';

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript

    const birthdaysThisMonth = people
        .filter(person => {
            const dobMonth = parseInt(person.dob.split('/')[1], 10);
            return dobMonth === currentMonth;
        })
        .sort((a, b) => {
            const dayA = parseInt(a.dob.split('/')[0], 10);
            const dayB = parseInt(b.dob.split('/')[0], 10);
            return dayA - dayB;
        });

    for (const person of birthdaysThisMonth) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = person.name;
        row.insertCell(1).textContent = person.dob;
    }
}

function searchPeople() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPeople = people.filter(person => person.name.toLowerCase().includes(searchInput));
    displaySearchResults(filteredPeople);
}

function displaySearchResults(results) {
    const tableBody = document.getElementById('allPeopleList');
    tableBody.innerHTML = '';

    for (const person of results) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = person.name;
        row.insertCell(1).textContent = person.dob;
    }
}

function goToBirthdaysThisMonthTable() {
    document.getElementById('birthdaysThisMonthTable').scrollIntoView({ behavior: 'smooth' });
}
