// script.js

let people = [
    { name: 'AAKASH RAJ S S', dob: '13/10/2006' },
    { name: 'AARON A GEORGE', dob: '10/12/2004' },
    { name: 'Aashin Nazeer', dob: '07/12/2005' },
    { name: 'ABHIMANYU MAHENDER', dob: '10/05/2006' },
    { name: 'ABHIRAG R NAIR', dob: '16/05/2006' },
    { name: 'Abhirami S M', dob: '25/08/2006' },
    { name: 'Abhishek D J', dob: '06/04/2004' },
    { name: 'Abhishek M', dob: '24/05/2005' },
    { name: 'ABHYUDAY', dob: '28/10/2006' },
    { name: 'Achuth Krishnan R', dob: '20/03/2006' },
    { name: 'Adarsh P Vinod', dob: '28/01/2006' },
    { name: 'ADARSH S', dob: '04/02/2006' },
    { name: 'ADITHYAN B', dob: '06/02/2005' },
    { name: 'Adithyan L', dob: '24/12/2005' },
    { name: 'Adithya Vardhan M S', dob: '08/06/2006' },
    { name: 'Aditya Manojkumar', dob: '04/06/2006' },
    { name: 'ADITYA MURALI', dob: '06/11/2006' },
    { name: 'ADWAITH S D', dob: '12/09/2006' },
    { name: 'Agney K', dob: '02/10/2005' },
    { name: 'AJAY KRISHNA S', dob: '15/10/2005' },
    { name: 'Akshai Krishna V S', dob: '20/06/2006' },
    { name: 'Akshay Ajeesh', dob: '10/04/2006' },
    { name: 'Akshay Ram M Pai', dob: '30/04/2006' },
    { name: 'Alaap Syama Krishnan', dob: '28/08/2006' },
    { name: 'Alin Ninan Jacob', dob: '06/12/2006' },
    { name: 'Amaldev M', dob: '03/07/2006' },
    { name: 'Ameen Shabir K', dob: '18/01/2005' },
    { name: 'Ameer Nizar', dob: '04/02/2005' },
    { name: 'ANAKHA P J', dob: '05/05/2005' },
    { name: 'ANAMIKA A L', dob: '12/02/2005' },
    { name: 'Anand S S', dob: '29/12/2005' },
    { name: 'ANANDU K G', dob: '05/07/2004' },
    { name: 'ANANTHA KRISHNAN A R', dob: '17/10/2006' },
    { name: 'Aneetta A S', dob: '28/03/2005' },
    { name: 'Anjali E V B', dob: '13/05/2005' },
    { name: 'ANJANA PRADEEP', dob: '05/12/2006' },
    { name: 'Anjuma Nazeeb K M', dob: '03/05/2005' },
    { name: 'Anoushka P S', dob: '20/08/2006' },
    { name: 'ANUGRAHA SUJITH', dob: '09/09/2005' },
    { name: 'ANURAG S NAIR', dob: '18/03/2005' },
    { name: 'Aradhana R V', dob: '21/02/2006' },
    { name: 'Aravind Sanjeev Nair', dob: '04/05/2006' },
    { name: 'Ardra Nair R H', dob: '02/02/2005' },
    { name: 'ARDRA S PILLAI', dob: '26/08/2006' },
    { name: 'Arif S', dob: '03/10/2006' },
    { name: 'ARJUN KRISHNA A', dob: '26/07/2006' },
    { name: 'ARJUN S M', dob: '08/11/2006' },
    { name: 'Ashin S S', dob: '16/10/2006' },
    { name: 'ASHISHNA SHAHUL S', dob: '25/11/2005' },
    { name: 'ASHISH PRASANTH', dob: '25/05/2005' },
    { name: 'ASLAM R S', dob: '07/10/2004' },
    { name: 'Athul Krishna S', dob: '18/11/2006' },
    { name: 'Ayisha Abdul Rezak Parayil', dob: '17/10/2006' },
    { name: 'AYSHA SENHA SUNEER', dob: '01/12/2005' },
    { name: 'Bhagath Sunand', dob: '21/10/2006' },
    { name: 'BHAGYA SREE A S', dob: '26/07/2005' },
    { name: 'C B BHAGATH', dob: '29/09/2006' },
    { name: 'CHANDANA SURESH', dob: '10/07/2006' },
    { name: 'Chinmayi B S', dob: '06/11/2006' },
    { name: 'DEEPAK UDAYAN', dob: '15/03/2006' },
    { name: 'Deva Nanda P', dob: '05/07/2006' },
    { name: 'DEVIKA A S', dob: '07/07/2006' },
    { name: 'DEVIKA A S', dob: '18/06/2006' },
    { name: 'Eavin John Eapen ', dob: '26/12/2005' },

    // Add more entries as needed
];

document.addEventListener('DOMContentLoaded', function () {
    updateAllPeopleTable();
    updateBirthdaysThisMonthTable();
    scheduleEmailNotifications();
});

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

function scheduleEmailNotifications() {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0); // Set the time to 6 PM

    for (const person of people) {
        const dob = new Date(currentDate.getFullYear(), parseInt(person.dob.split('/')[1], 10) - 1, parseInt(person.dob.split('/')[0], 10), 18, 0, 0, 0);

        if (dob.getTime() === tomorrow.getTime()) {
            sendEmailNotification(person);
        }
    }
}

function sendEmailNotification(person) {
    // Sendinblue API configuration
    const apiKey = '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';
    const senderEmail = 'akkuagneyanesh@gmail.com';
    const senderName = 'Birthday Alert';
    const recipientEmail = 'agneyanesh@gmail.com';

    // Email content
    const subject = 'Birthday Reminder';
    const body = `Don't forget to wish ${person.name} a Happy Birthday tomorrow!`;

    // Send email using Sendinblue API
    fetch('https://api.sendinblue.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        },
        body: JSON.stringify({
            sender: {
                name: senderName,
                email: senderEmail,
            },
            to: [
                {
                    email: recipientEmail,
                },
            ],
            subject: subject,
            htmlContent: body,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error sending email:', error));
}
