import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAceWZXRVQGSOT5QslIl4oR9fRtQ8XODgY",
  authDomain: "crown-db-e0e73.firebaseapp.com",
  databaseURL: "https://crown-db-e0e73.firebaseio.com",
  projectId: "crown-db-e0e73",
  storageBucket: "crown-db-e0e73.appspot.com",
  messagingSenderId: "864525089514",
  appId: "1:864525089514:web:b9b45f985c8d42081b7593",
  measurementId: "G-VXRHDDYCBK"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
