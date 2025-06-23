import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext({
  currentUser: null,
  signup: (email, password, username) => Promise.resolve(),
  login: (email, password) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const createUserProfile = (user, username) => {
  return setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    username: username,
    createdAt: new Date(),
    isAdmin: false,
    learningProgress: {
      currentLevel: 1,
      completedLessons: [],
      vocabularyMastered: []
    }
  });
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username
    });

    return createUserProfile(user, username);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const getUserData = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userData = await getUserData(user.uid);

        if (!userData) {
          console.log(`User document for ${user.uid} not found. Backfilling profile.`);
          const username = user.displayName || (user.email ? user.email.split('@')[0] : 'New User');
          await createUserProfile(user, username);
          userData = await getUserData(user.uid);
        }

        setCurrentUser({ ...user, ...userData });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 