import { useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setIsLoading(true);
    Cookies.remove("userInfo");
    queryClient.clear();
    setRole(null);
    setUser(null);
    return signOut(auth);
  };

  // 🔄 onAuthStateChanged listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      } else {
        setUser(null);
        setRole(null);
        Cookies.remove("userInfo");
        setIsLoading(false);
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    dbUser,
    isLoading,
    setIsLoading,
    createUser,
    signInUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
