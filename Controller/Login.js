const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require("./path/to/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await admin
      .auth()
      .signInWithEmailAndPassword(email, password);
    res.json({ success: true, user: userCredential.user });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
