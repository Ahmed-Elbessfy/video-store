import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  doc,
  setDoc,
  getFirestore,
  onSnapshot,
  collection,
} from "firebase/firestore";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyB3737Th89FT55pDMMRpyv1g5lR8__kT-g",
  authDomain: "video-store-cf437.firebaseapp.com",
  projectId: "video-store-cf437",
  storageBucket: "video-store-cf437.appspot.com",
  messagingSenderId: "1031342056907",
  appId: "1:1031342056907:web:fb926eba9aec76a8f9024e",
});

// Firebase storage reference
const storage = getStorage(app);
// storage for accessing firbase storage
// getFirestore for accessing firbase firestore database
// doc and setDoc for creating new document in firestore database
// onSnapshot & collection for fetching data from firestore database documents
export { storage, getFirestore, doc, setDoc, onSnapshot, collection };
