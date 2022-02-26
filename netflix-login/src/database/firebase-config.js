/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";

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

export const auth = getAuth(app);
const db = getFirestore();

const usersRef = collection(db, "users");

export async function getUserMailByPhoneNumber(phoneNumber) {
    let mail;
    const q = query(usersRef, where("phone", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(doc.data().email);
      mail = doc.data().email;
    });
    return mail;
}

//export async function loginWithFacebookProvider() {
//    const provider = new FacebookAuthProvider();
//    signInWithPopup(auth, provider)
//      .then((result) => {
//        // The signed-in user info.
//        const user = result.user;
//
//        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//        const credential = FacebookAuthProvider.credentialFromResult(result);
//        const isNewUser = credential.additionalUserInfo.isNewUser;
//        if (isNewUser) {
//            auth.currentUser.delete();
//            // The following error will be handled in your catch statement
//            throw new Error("Girilen Facebook kullanıcı kayıtlarda bulunamadı."
//                                     + "Netflix email ve şifrenizle girmeyi tekrar deneyin.");
//        }
//        // Otherwise, handle login normally
//        return user;
//    }).catch( (err) => {
//        if(err.code === 'auth/account-exists-with-different-credential') {
//            throw new Error("Kullanıcının giriş yöntemi Facebook olarak seçilmemiş."
//             + "Lütfen email ve şifrenizle girmeyi tekrar deneyin.");
//        }
//        throw new Error("Girilen Facebook kullanıcı kayıtlarda bulunamadı."
//         + "Netflix email ve şifrenizle girmeyi tekrar deneyin.");
//    });
//}


//const signInWithFacebook = () => {
  //  const provider = new FacebookAuthProvider();
  //  signInWithPopup(auth, provider)
  //      .then((re) => {
  //          console.log(re);
  //          setErrorMessage("Successful login.");
  //      })
  //      .catch((error) => {
  //          console.log(error.message());
  //          setErrorMessage("Kullanıcı bulunamadı. Error: " + error.message());
  //      });
//}

*/