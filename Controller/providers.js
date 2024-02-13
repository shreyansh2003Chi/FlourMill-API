// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const firebase = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// const app = express();
// const port = process.env.PORT || 3000;

// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseURL: "https://flourmill-f9b29-default-rtdb.firebaseio.com",
// });
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/signupprovider", async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     const userRecord = await firebase.auth().createUser({
//       email: email,
//       password: password,
//       displayName: name,
//     });

//     const customToken = await firebase.auth().createCustomToken(userRecord.uid); // this will set to Authantication

//     await firebase.database().ref(`users/${userRecord.uid}`).set({
//       // this will set to Realtime database
//       name: name,
//       email: email,
//     });

//     res.status(200).json({ token: customToken });
//   } catch (error) {
//     console.error("Error signing up:", error);
//     res.status(500).json({ error: "FAILED to signup" });
//   }
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// module.exports = app;

const express = require("express");
const router = express.Router();

router.post("/signupprovider", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Access Firebase app instance passed from index.js
    const firebaseApp = req.app.get("firebase");
    const firebaseAuth = firebaseApp.auth();
    const firebaseDatabase = firebaseApp.database();

    // Create user in Firebase Authentication
    const userRecord = await firebaseAuth.createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // Generate custom token for client authentication
    const customToken = await firebaseAuth.createCustomToken(userRecord.uid);

    // Save user details to Realtime Database
    await firebaseDatabase.ref(`provider/${userRecord.uid}`).set({
      name: name,
      email: email,
    });

    // Respond with custom token
    res.status(200).json({ token: customToken });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Failed to signup" });
  }
});

module.exports = router;
