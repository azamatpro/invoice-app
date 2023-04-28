import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAphTOYW3gnGztQQlmDxEcnN5xxpd0X57M",
  authDomain: "invoice-app-387ea.firebaseapp.com",
  projectId: "invoice-app-387ea",
  storageBucket: "invoice-app-387ea.appspot.com",
  messagingSenderId: "490144274314",
  appId: "1:490144274314:web:c73c0d2cc4469737b8da73",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(`Error creating the user ${error}`);
    }
  }
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// UPLOADING INVOICES INTO DB
export const addCollectionAndDocs = async function (
  collectionKey,
  objectToAdd
) {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  const docRef = doc(collectionRef, objectToAdd.id.toLowerCase());
  batch.set(docRef, objectToAdd);
  await batch.commit();
};
// DOWNLOADING INVOICES FROM DB
export const getInvoicesAndDocs = async function () {
  const collectionRef = collection(db, "invoices");
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  const result = querySnapShot.docs.reduce((sum, doc) => {
    const invoice = doc.data();
    if (!sum[invoice.userId]) {
      sum[invoice.userId] = [invoice];
    } else {
      sum[invoice.userId].push(invoice);
    }
    return sum;
  }, {});

  return result;
};
// Getting single document
export const getDocument = async function(docName) {
  const docRef = doc(db,"invoices", docName.toLowerCase())
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}
// Deleting a Doc
export const deleteDocument = async (docToDelete) => {
  await deleteDoc(doc(db, "invoices", docToDelete ))
}