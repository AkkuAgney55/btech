require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Root route (prevents "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Birthday Reminder Server is running 🚀");
});

// 🔹 Load people data
const loadPeople = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data.json:", err);
        return [];
    }
};

// 🔹 API to view people (optional)
app.get("/api/people", (req, res) => {
    res.json(loadPeople());
});

// 🔹 Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 🔹 Check birthdays & send emails
const checkAndSendEmails = async () => {
    const people = loadPeople();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tomDay = tomorrow.getDate();
    const tomMonth = tomorrow.getMonth() + 1;

    console.log(`Checking birthdays for ${tomDay}/${tomMonth}`);

    for (const person of people) {
        const [dayStr, monthStr] = person.dob.split("/");
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);

        if (day === tomDay && month === tomMonth) {
            await sendEmail(person);
        }
    }
};

// 🔹 Send email
const sendEmail = async (person) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // send to yourself
        subject: "🎉 Birthday Reminder",
        text: `Don't forget to wish ${person.name} a Happy Birthday tomorrow (${person.dob})!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent for ${person.name}`);
    } catch (err) {
        console.error("Email error:", err);
    }
};

// 🔹 CRON endpoint (Vercel calls this)
app.get("/api/run-birthday-check", async (req, res) => {
    try {
        await checkAndSendEmails();
        res.json({ success: true, message: "Birthday check completed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ REQUIRED for Vercel
module.exports = app;
