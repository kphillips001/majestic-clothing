import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth'; 

const config = {
    apiKey: "AIzaSyDT3EzLGimxwI6K2fssWQBko2nheO6pt_o",
    authDomain: "estore-db-f9492.firebaseapp.com",
    databaseURL: "https://estore-db-f9492.firebaseio.com",
    projectId: "estore-db-f9492",
    storageBucket: "",
    messagingSenderId: "900203592250",
    appId: "1:900203592250:web:a9f73190c18a904b"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
     const userRef = firestore.doc(`users/${userAuth.uid}`);

     const snapShot = await userRef.get();

     console.log(snapShot);

     if(!snapShot.exists) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user, error.message');
      }
    }

    return userRef;
  };

firebase.initializeApp(config); 

export const auth = firebase.auth(); 
export const firestore = firebase.firestore(); 
  
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
export default firebase; 