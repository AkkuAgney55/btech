require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Load people data
const loadPeople = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data.json:', err);
        return [];
    }
};

// API Endpoint to get people
app.get('/api/people', (req, res) => {
    const people = loadPeople();
    res.json(people);
});

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Scheduled Task (6 PM Daily)
cron.schedule('0 18 * * *', () => {
    console.log('Running scheduled birthday check...');
    checkAndSendEmails();
});

// Function to check and send emails
const checkAndSendEmails = async () => {
    const people = loadPeople();
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    
    // We only care about matching month and day of tomorrow
    const tomMonth = tomorrow.getMonth() + 1;
    const tomDay = tomorrow.getDate();

    console.log(`Checking for birthdays on: ${tomDay}/${tomMonth}`);

    for (const person of people) {
        const [dayStr, monthStr] = person.dob.split('/');
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);

        if (day === tomDay && month === tomMonth) {
            console.log(`Found birthday: ${person.name}`);
            await sendEmail(person);
        }
    }
};

// Send Email Function
const sendEmail = async (person) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to yourself as per request
        subject: 'Birthday Reminder!',
        text: `Don't forget to wish ${person.name} a Happy Birthday tomorrow (${person.dob})!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent for ${person.name}`);
    } catch (error) {
        console.error(`Error sending email for ${person.name}:`, error);
    }
};

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
