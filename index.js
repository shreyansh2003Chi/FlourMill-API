
const express = require("express");
const cors = require("cors"); 
const app = express();

const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const customerController = require("./Controller/customers");
const providerController = require("./Controller/providers");

// Initialize Firebase Admin SDK
const databaseURL =
  process.env.DATABASE_URL ||
  "https://flourmill-f9b29-default-rtdb.firebaseio.com";
const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

// Pass Firebase app instance to the router
app.set("firebase", firebaseApp);

// Middleware to parse JSON bodies
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Use the router
app.use("/customers", customerController);
app.use("/providers", providerController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
