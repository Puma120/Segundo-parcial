import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { doc, getDoc } from "firebase/firestore";
  
  import { db } from "./firebaseConfig";
  
  const auth = getAuth();
  
  // Register a new user
  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered: ", userCredential.user.uid);
      return { user: userCredential.user, error: null };
    } catch (error) {
      console.error("Error registering user: ", error.message);
      return { user: null, error: error.message };
    }
  };
  
  // Login a user
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in: ", userCredential.user.uid);
  
      // Obtener el documento del usuario desde Firestore
      const userDocRef = doc(db, "Users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data: ", userData);
  
        // Retorna el usuario y su rol
        return { user: userCredential.user, role: userData.role, error: null };
      } else {
        throw new Error("No se encontraron datos para este usuario.");
      }
    } catch (error) {
      console.error("Error logging in user: ", error.message);
      return { user: null, role: null, error: error.message };
    }
  };
  
  // Logout a user
  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      return { user: null, error: null };
    } catch (error) {
      console.error("Error logging out user: ", error.message);
      return { error: error.message };
    }
  };
  
  
  export { registerUser, loginUser, logoutUser };