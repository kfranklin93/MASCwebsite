// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const sgMail = require("@sendgrid/mail");

// const app = express();

// // ✅ Allow requests from your frontend
// app.use(cors({
//   origin: "http://mommy-angels-test.web.app/", // Change this to match your frontend URL
//   methods: "POST",
//   allowedHeaders: "Content-Type"
// }));

// app.use(bodyParser.json());

// // sgMail.setApiKey('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');

// require('dotenv').config(); // Load environment variables

// sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Use API key from .env file

// app.post("/send-email", async (req, res) => {
//     console.log('Received request body:', req.body); // Log the request body
  
//     const { parentName, childName, age, dob, email, phone, insuranceProvider, behaviorsOfConcern } = req.body;
  
//     const msg = {
//       to: "kfranklin93@gmail.com", // Change to your receiving email
//       from: "kfranklin93@gmail.com", // Must be verified in SendGrid
//       subject: "New Contact Form Submission",
//       text: `
//         Parent Name: ${parentName}
//         Child Name: ${childName}
//         Age: ${age}
//         Date of Birth: ${dob}
//         Email: ${email}
//         Phone: ${phone}
//         Insurance Provider: ${insuranceProvider ? insuranceProvider : "Not provided"}
//         Behaviors of Concern: ${behaviorsOfConcern}
//       `
//     };
  
//     try {
//       await sgMail.send(msg);
//       res.json({ success: true, message: "Email sent successfully!" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ success: false, message: "Email sending failed." });
//     }
//   });

// // Start the server
// const PORT = 5007;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



require("dotenv").config(); // ✅ Load environment variables first

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

const app = express();

// // ✅ Allow requests from your frontend (ensure correct HTTPS)
// app.use(cors({
//   origin: "https://mommy-angels-test.web.app", // ✅ Corrected HTTPS URL
//   methods: "POST",
//   allowedHeaders: "Content-Type"
// }));

app.use(cors({
    origin: ["https://mommy-angels-test.web.app", "http://localhost:62584"], // ✅ Allow both Firebase & Localhost
    methods: "POST",
    allowedHeaders: "Content-Type"
  }));
  

app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // ✅ Load API Key securely

app.post("/send-email", async (req, res) => {
    console.log("📩 Received request body:", req.body); // ✅ Log the request body
    console.log("🔑 SendGrid API Key Loaded:", process.env.SENDGRID_API_KEY ? "Yes" : "No"); // ✅ Check if API key is loaded

    const { parentName, childName, age, dob, email, phone, insuranceProvider, behaviorsOfConcern } = req.body;

    if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ success: false, message: "SendGrid API Key is missing" });
    }

    const msg = {
      to: "harlemorchid@gmail.com",
      from: "kfranklin93@gmail.com", // ✅ Must be verified in SendGrid
      subject: "New Contact Form Submission",
      text: `
        Parent Name: ${parentName}
        Child Name: ${childName}
        Age: ${age}
        Date of Birth: ${dob}
        Email: ${email}
        Phone: ${phone}
        Insurance Provider: ${insuranceProvider?.label || "Not provided"}  
        Behaviors of Concern: ${behaviorsOfConcern}
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("✅ Email sent successfully");
      res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("❌ Error sending email:", error.response?.body || error);
      res.status(500).json({ success: false, message: "Email sending failed.", error: error.response?.body });
    }
});

// app.post("/send-email", async (req, res) => {
//     console.log('Received request body:', req.body); // ✅ Log for debugging
  
//     const { parentName, childName, age, dob, email, phone, insuranceProvider, behaviorsOfConcern } = req.body;
  
//     const msg = {
//       to: "harlemorchid@gmail.com", // ✅ Change to your receiving email
//       from: "kfranklin93@gmail.com", // ✅ Must be a verified SendGrid email
//       subject: "New Contact Form Submission",
//       text: `
//         Parent Name: ${parentName}
//         Child Name: ${childName}
//         Age: ${age}
//         Date of Birth: ${dob}
//         Email: ${email}
//         Phone: ${phone}
//         Insurance Provider: ${insuranceProvider?.label || "Not provided"}  // ✅ Fix object issue
//         Behaviors of Concern: ${behaviorsOfConcern}
//       `
//     };
  
//     try {
//       await sgMail.send(msg);
//       console.log("✅ Email sent successfully");
//       res.json({ success: true, message: "Email sent successfully!" });
//     } catch (error) {
//       console.error("❌ Error sending email:", error);
//       res.status(500).json({ success: false, message: "Email sending failed." });
//     }
//   });

// Start the server
const PORT = 5007;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
console.log("🔑 SendGrid API Key Loaded:", process.env.SENDGRID_API_KEY ? "Yes" : "No");