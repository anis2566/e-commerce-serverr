import firebase from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./config/firebase.json", "utf8")
);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  //   databaseURL: 'https://<your-project-id>.firebaseio.com',
  storageBucket: "gs://e-commerce-bd7d3.appspot.com/",
});

export const db = firebase.firestore();

export default firebase;
