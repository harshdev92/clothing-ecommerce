import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDJ0AUIfvNpkc2mroN_OuwvjJJafGDZxCY",
  authDomain: "crwn-db-b551e.firebaseapp.com",
  databaseURL: "https://crwn-db-b551e.firebaseio.com",
  projectId: "crwn-db-b551e",
  storageBucket: "crwn-db-b551e.appspot.com",
  messagingSenderId: "695572842054",
  appId: "1:695572842054:web:b5663c17464153eeaf6c47"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
