import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAwT9F2m5Z170pvkpt0UhfwM5vVWoVdpdY",
  authDomain: "crud-web2-d7762.firebaseapp.com",
  projectId: "crud-web2-d7762",
  storageBucket: "crud-web2-d7762.appspot.com",
  messagingSenderId: "613597868036",
  appId: "1:613597868036:web:69404def3b5b1f2ac9c551",
};
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
