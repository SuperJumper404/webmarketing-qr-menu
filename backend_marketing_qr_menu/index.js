const dotenv = require("dotenv");
dotenv.config(); // Load the environment variables from the .env file

const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const url = require("url");
const PORT = 3000; // Vous pouvez changer le port si nécessaire

// Middleware pour permettre les requêtes cross-origin depuis votre application Vue.js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/send-email", async (req, res) => {
  try {
    // const { email, subject, message } = req.body;

    console.log("Request : ", req.body);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log("ENV Name", process.env.EMAIL_USERNAME);
    console.log("ENV Password", process.env.EMAIL_PASSWORD);
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: "ceciestuntest518@gmail.com", // Remplacez par l'adresse du destinataire
      subject: "New Scan Eat Client",
      text: req.body,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "E-mail envoyé avec succès!" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de l'envoi de l'e-mail.",
    });
  }
});

// Array to store endpoint information
const endpointsInfo = [];

// Print all available endpoints
const printEndpoints = (layer, prefix = "") => {
  if (layer.route) {
    layer.route.stack.forEach(
      printEndpoints.bind(null, layer.route, prefix + layer.route.path)
    );
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(
      printEndpoints.bind(null, layer.handle, prefix + layer.regexp)
    );
  } else if (layer.method) {
    const endpoint = url.parse(prefix, true);
    const endpointInfo = {
      method: layer.method.toUpperCase(),
      hostname: endpoint.hostname,
      port: endpoint.port,
      path: endpoint.pathname,
    };
    endpointsInfo.push(endpointInfo);
  }
};

app._router.stack.forEach(printEndpoints);

const server = app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);

  // Log the endpoint information after the server starts listening
  console.log("Available endpoints:");
  endpointsInfo.forEach((endpoint) => {
    console.log(
      endpoint.method + ":",
      "http://" + endpoint.hostname + ":" + endpoint.port + endpoint.path
    );
  });
});
