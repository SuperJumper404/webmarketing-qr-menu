const dotenv = require("dotenv");
dotenv.config(); // Load the environment variables from the .env file

const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000; // Vous pouvez changer le port si nécessaire
async function test() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "ns.ayness@gmail.coms",
      to: "ceciestuntest518@gmail.com", // Remplacez par l'adresse du destinataire
      subject: "New Scan Eat Client",
      text: "Contenu de l'e-mail",
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Resultat", result);
    res.status(200).json({ message: "E-mail envoyé avec succès!" });
  } catch (error) {
    console.log("Error", error);
    // error.status(500).json({
    //   message: "Une erreur est survenue lors de l'envoi de l'e-mail.",
    // });
  }
}
test();
// Middleware pour permettre les requêtes cross-origin depuis votre application Vue.js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route pour envoyer un e-mail
app.post("/send-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ceciestuntest518@gmail.com", // Remplacez par votre adresse Gmail
        pass: "Azertyuiop12'", // Remplacez par votre mot de passe Gmail
      },
    });

    const mailOptions = {
      from: "ceciestuntest518@gmail.com",
      to: "ceciestuntest518@gmail.com", // Remplacez par l'adresse du destinataire
      subject: "New Scan Eat Client",
      text: "Contenu de l'e-mail",
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "E-mail envoyé avec succès!" });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de l'envoi de l'e-mail.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
