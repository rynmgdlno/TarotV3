import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDlXL4tcxgbHSPS9SH_ETwVmH7KoFUN6Zw",
  authDomain: "tarot-270605.firebaseapp.com",
  projectId: "tarot-270605",
  storageBucket: "tarot-270605.appspot.com",
  messagingSenderId: "74547776064",
  appId: "1:74547776064:web:f422cb64e42723e7346da5",
  measurementId: "G-CRSFEK7EY9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error crating user', error.message)
    }
  }
  return userRef
}

export const createPaletteDocument = async (currentUser, palette, name) => {

  const nameCheck = firestore.collection(`users/${currentUser.id}/palettes`).where('name', '==', name)
  const snapShot = await nameCheck.get()

  if (!snapShot.size) {
    try {
      await firestore.collection(`users/${currentUser.id}/palettes`).add({
        name: name,
        palette: palette
      })
    } catch (error) {
    alert(error)
    }
  } else {
    alert('name already in use')
  }
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase