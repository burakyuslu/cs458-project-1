// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQrHB_NS7kyK-yE_MrY_H_OorqCSeC_Nw",
  authDomain: "netflix-login-931d9.firebaseapp.com",
  projectId: "netflix-login-931d9",
  storageBucket: "netflix-login-931d9.appspot.com",
  messagingSenderId: "983589309155",
  appId: "1:983589309155:web:684d23091c73ac79d5d3d6",
  measurementId: "G-4EWXSK1XXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Get a list of users from database
// async function getUsers(db) {
//   const usersCol = collection(db, 'users');
//   const usersSnapshot = await getDocs(usersCol);
//   const userList = usersSnapshot.docs.map(doc => doc.data());
//   return userList;
// }

export const auth = getAuth(app);

// signInWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
//  // Signed in
//  const user = userCredential.user;
//  // ...
// })
// .catch((error) => {
//  const errorCode = error.code;
//  const errorMessage = error.message;
// });

export default app;

