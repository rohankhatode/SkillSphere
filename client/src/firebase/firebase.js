import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-kA700KBRSDx92aNEUHDkA6puWQ22GRo",
  authDomain: "skillsphere-67c7f.firebaseapp.com",
  projectId: "skillsphere-67c7f",
  storageBucket: "skillsphere-67c7f.firebasestorage.app",
  messagingSenderId: "914816250311",
  appId: "1:914816250311:web:ad971f801e5641f1a969e2",
  measurementId: "G-RPJKD81SKB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);