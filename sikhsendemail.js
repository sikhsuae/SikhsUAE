const emailjs = require("@emailjs/nodejs");

// EmailJS config
const EMAILJS_SERVICE_ID = "service_n17cw2u";
const EMAILJS_TEMPLATE_ID = "template_4eznr7w";
const EMAILJS_PUBLIC_KEY = "bR8jobS4ge96abRNK";
const EMAILJS_PRIVATE_KEY = "kcjoxRyDn2c6BAtBkV8A9";

// Function to send a test email
async function sendEmail() {
  const toEmail = "sikhsuae@gmail.com"; // Your email to receive the message
  const toname = "Sikhs in UAE";
  const fromname = "Your Website Visitor";
  const subject = "Test Invitation";
  const message = "This is a test invitation email sent via EmailJS Node.js SDK.";
  const fileName = "invite.pdf";
  const occasionvar = "event2025";

  try {
    console.log("📤 Sending email to:", toEmail);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        message,
        subject,
        from_name: fromname,
        to_name: toname,
        from_email: "someone@example.com", // sender's email
        email: toEmail,                    // your email
        link: `https://taviarora.github.io/eventmarch2025/${occasionvar}/${fileName}`,
      },
      {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
      }
    );

    console.log("✅ Email sent:", response.status, response.text);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

// Run it
sendEmail();
