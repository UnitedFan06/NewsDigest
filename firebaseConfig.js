import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiNWUtyu3YSfrDAs_VA7BmBkEjBcCV0aI",
  authDomain: "newsdigest-606c9.firebaseapp.com",
  projectId: "newsdigest-606c9",
  storageBucket: "newsdigest-606c9.appspot.com",
  messagingSenderId: "645310225083",
  appId: "1:645310225083:web:c2c664b6b64462a2eba79e",
  measurementId: "G-5EVFCJ8BK3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
