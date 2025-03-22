import React, { useEffect, useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useFirebase } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Function to create default progress for a subject.
const createDefaultSubjectProgress = () => {
  const modules = [];
  for (let i = 1; i <= 10; i++) {
    modules.push({
      moduleId: i,
      completed: 0,
      total: 10,
    });
  }
  return modules;
};

// Initialize the user's progress in Firestore if it doesn't exist.
const initializeUserProgress = async (
  firestore: any,
  uid: string,
  username: string
) => {
  const userDocRef = doc(firestore, "Users", uid);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) {
    const userDoc = {
      uid,
      username,
      python: createDefaultSubjectProgress(),
      javascript: createDefaultSubjectProgress(),
      c: createDefaultSubjectProgress(),
      java: createDefaultSubjectProgress(),
    };
    await setDoc(userDocRef, userDoc);
  }
};

const SignUp: React.FC = () => {
  const {
    signInUserGoogle,
    signInUserGithub,
    signUpUser,
    user,
    firestore,
  } = useFirebase();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Retrieve custom username from query parameters if available.
  const queryUsername = searchParams.get("username") || "";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  // For Email/Password Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && firestore && !initialized) {
      const initUser = async () => {
        try {
          // Use the query username if provided, otherwise fall back.
          const finalUsername =
            queryUsername || user.displayName || user.email || "User";
          await initializeUserProgress(firestore, user.uid, finalUsername);
          setInitialized(true);
        //   navigate("/dashboard");
        } catch (err: any) {
          setError(err.message);
        }
      };
      initUser();
    }
  }, [user, firestore, initialized, navigate, queryUsername]);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInUserGoogle();
      // onAuthStateChanged in FirebaseProvider will update the user.
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      navigate("/Dashboard");
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInUserGithub();
      // onAuthStateChanged in FirebaseProvider will update the user.
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
     navigate("/Dashboard");
    }
  };

  // Email/Password Sign Up
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUpUser(email, password);
      // The onAuthStateChanged in FirebaseProvider will update the user.
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      navigate("/Dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ccddea]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            <FaGoogle className="mr-2" size={20} />
            Continue with Google
          </button>
          <button
            onClick={handleGithubSignIn}
            disabled={loading}
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            <FaGithub className="mr-2" size={20} />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-5 items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email/Password Sign Up Form */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email address *"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password *"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>

        {/* Additional links */}
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="text-center text-sm mt-2">
          Don&apos;t have an account?{" "}
          <a className="text-blue-600 hover:underline" href="/signup">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
