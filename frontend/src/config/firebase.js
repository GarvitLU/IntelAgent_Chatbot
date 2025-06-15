import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB764mYj98L8WK8rCKdqoPjGTkv73SlJy8",
  authDomain: "qredifiq.firebaseapp.com",
  projectId: "qredifiq",
  storageBucket: "qredifiq.appspot.com",
  messagingSenderId: "107223449385445748481",
  appId: "1:347248380096:web:7e7ed3332237b2d7bcc525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const linkedinProvider = new OAuthProvider('linkedin.com');

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    return idToken;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signInWithLinkedIn = async () => {
  try {
    const result = await signInWithPopup(auth, linkedinProvider);
    const idToken = await result.user.getIdToken();
    return idToken;
  } catch (error) {
    console.error("Error signing in with LinkedIn:", error);
    throw error;
  }
};

export { auth }; 