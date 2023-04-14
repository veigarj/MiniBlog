import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBtkv6rdbFRvd4bpMlu1qEGzuV6LX96aFc",
  authDomain: "mini-blog-b5850.firebaseapp.com",
  projectId: "mini-blog-b5850",
  storageBucket: "mini-blog-b5850.appspot.com",
  messagingSenderId: "995654273970",
  appId: "1:995654273970:web:db5b75e54d0953b7f532ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };