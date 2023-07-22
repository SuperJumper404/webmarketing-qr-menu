const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    console.log("try send mail");
    console.log(event.body);

    const message = event.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: "niconico83@icloud.com", // Replace with the address of the recipient
      subject: "New Scan Eat Client",
      text: message,
    };
    const mailOptions1 = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME, // Replace with the address of the recipient
      subject: "New Scan Eat Client",
      text: message,
    };
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions1);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "E-mail envoyé avec succès!" }),
    };
  } catch (error) {
    console.error("Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Une erreur est survenue lors de l'envoi de l'e-mail.",
      }),
    };
  }
};
