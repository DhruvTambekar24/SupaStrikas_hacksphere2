import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  User,
  UserCredential,
  Auth,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  Firestore,
} from "firebase/firestore";
import {
  getStorage,
  FirebaseStorage,
} from "firebase/storage";
import {
  getDatabase,
  ref as dbRef,
  update,
  Database,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCORaJCN8cXUwwiuIsIpEcQnSVfqE8Kg5M",
  authDomain: "r-gfg-86633.firebaseapp.com",
  databaseURL: "https://r-gfg-86633-default-rtdb.firebaseio.com",
  projectId: "r-gfg-86633",
  storageBucket: "r-gfg-86633.appspot.com",
  messagingSenderId: "1091682881949",
  appId: "1:1091682881949:web:88d7409563cf42f2ccdf74"
};

// Initialize Firebase App and Auth
export const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

// Define a context type for Firebase
interface FirebaseContextType {
  auth: Auth;
  user: User | null;
  signUpUser: (email: string, password: string) => Promise<UserCredential>;
  signInUser: (email: string, password: string) => Promise<UserCredential>;
  signInUserGoogle: () => Promise<UserCredential>;
  signInUserGithub: () => Promise<UserCredential>;
  signOutUser: () => Promise<void>;
  isLogin: boolean;
  firestore: Firestore;
  storage: FirebaseStorage;
  database: Database;
  addTeam: (uid: string, data: any) => Promise<void>;
  getTeamByUID: (uid: string) => Promise<any>;
  updateQuestionStatus: (id: string, isActive: boolean) => Promise<string>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else setUser(null);
    });
  }, []);

  const isLogin = !!user;

  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const database = getDatabase(app);

  function signUpUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInUserGoogle() {
    const googlePro = new GoogleAuthProvider();
    return signInWithPopup(auth, googlePro);
  }

  // New: Sign in with GitHub
  function signInUserGithub() {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  }

  function signOutUser() {
    return signOut(auth);
  }

  async function addTeam(uid: string, data: any) {
    const docRef = doc(firestore, "Teams", uid);
    return setDoc(docRef, data);
  }

  async function getTeamByUID(uid: string) {
    const docRef = doc(firestore, "Teams", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such team exists!");
    }
  }

  async function updateQuestionStatus(id: string, isActive: boolean) {
    try {
      const questionRef = dbRef(database, `Question4/${id}`);
      await update(questionRef, { isActive });
      return "Update successful!";
    } catch (error) {
      console.error("Error updating question:", error);
      throw new Error("Failed to update question");
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        user,
        signUpUser,
        signInUser,
        signInUserGoogle,
        signInUserGithub, // added to context
        signOutUser,
        isLogin,
        firestore,
        storage,
        database,
        addTeam,
        getTeamByUID,
        updateQuestionStatus,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
