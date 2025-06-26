const admin = require("firebase-admin");
const emailjs = require("@emailjs/nodejs");
require("dotenv").config();

// Decode and parse service account key from environment variable
const serviceAccountKey = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(serviceAccountKey);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// EmailJS config
const EMAILJS_SERVICE_ID = "service_jitwsrj";
const EMAILJS_TEMPLATE_ID = "template_m0u22pm";
const EMAILJS_USER_ID = "qcbXaXrWGMaIRt6_o";
const EMAILJS_PRIVATE_KEY = "g1HH-DK2771AldTTDT3Tk";

async function sendEmail(toEmail, message, subject, fromname, toname, fileName, occasionvar) {
  try {
    console.log("Sending email to:", toEmail);

    emailjs.init(EMAILJS_USER_ID);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        message,
        subject,
        from_name: fromname,
        to_name: toname,
        from_email: "sikhsuae@gmail.com", // use your actual sender address
        email: toEmail,
        link: `https://taviarora.github.io/eventmarch2025/${occasionvar}/${fileName}`,
      },
      {
        publicKey: EMAILJS_USER_ID,
        privateKey: EMAILJS_PRIVATE_KEY
      }
    );

    console.log("✅ Email sent to", toEmail, response);
  } catch (error) {
    console.error("❌ Error sending email to", toEmail, error);
  }
}

async function sendEmails() {
  console.log("📨 Starting to send emails...");

  try {
    const snapshot = await db.collection("Event").get();

    if (snapshot.empty) {
      console.log("No event records found.");
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const toEmail = data.Email;
      const toname = data.Name;
      const message = data.Message || "You are invited!";
      const subject = data.Subject || "Welcome to Sikhs in UAE!";
      const fromname = "Sikhs in UAE Team";
      const fileName = data.FileName || "default.pdf";
      const occasionvar = data.Event || "default";

      if (toEmail && toname) {
        sendEmail(toEmail, message, subject, fromname, toname, fileName, occasionvar);
      } else {
        console.warn("Skipping record due to missing email or name:", doc.id);
      }
    });
  } catch (error) {
    console.error("🔥 Error loading records from Firestore:", error);
  }
}

// Run the script
sendEmails();
