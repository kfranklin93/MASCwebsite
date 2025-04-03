// require("dotenv").config(); // ✅ Load environment variables first
require("dotenv").config({ path: "./.env" });


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(express.json());
// app.use(cors({
//     origin: ["http://www.mommyangelsspecialtycare.com", "http://localhost:62584"], // ✅ Allow both Firebase & Localhost
//     methods: "POST",
//     allowedHeaders: "Content-Type"
//   }));
app.use(cors({
    origin: "*", // 🔥 TEMP FIX: Allows all origins. Change later for security.
    methods: "POST",
    allowedHeaders: "Content-Type"
}));

app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // ✅ Load API Key securely

// app.post("/send-email", async (req, res) => {
    // console.log("📩 Received request body:", req.body); // ✅ Log the request body
    // console.log("🔑 SendGrid API Key Loaded:", process.env.SENDGRID_API_KEY ? "Yes" : "No"); // ✅ Check if API key is loaded

    // const { parentName, childName, age, dob, email, phone, insuranceProvider, behaviorsOfConcern } = req.body;

    // if (!process.env.SENDGRID_API_KEY) {
    //     return res.status(500).json({ success: false, message: "SendGrid API Key is missing" });
    // }
   app.post("/send-email", async (req, res) => {
        console.log("📩 Received request headers:", req.headers); // ✅ Check headers
        console.log("📩 Received request body:", req.body); // ✅ Check request body
        console.log("🔑 SendGrid API Key Loaded:", process.env.SENDGRID_API_KEY ? "Yes" : "No"); // ✅ Check if API key is loaded
    
        if (!req.body || Object.keys(req.body).length === 0) {
            console.error("❌ ERROR: Request body is empty or undefined.");
            return res.status(400).json({ success: false, message: "Request body is empty." });
        }
    
        const { parentName, childName, age, dob, email, phone, insuranceProvider, behaviorsOfConcern } = req.body;
    
        if (!process.env.SENDGRID_API_KEY) {
            return res.status(500).json({ success: false, message: "SendGrid API Key is missing" });
        }
    
        res.json({ success: true, message: "Data received!" });
   
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



// Start the server
const PORT = 5007;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
console.log("🔑 SendGrid API Key Loaded:", process.env.SENDGRID_API_KEY ? "Yes" : "No");