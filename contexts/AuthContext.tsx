'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
      if (firebaseUser) {
        console.log('Loading user data for:', firebaseUser.uid);
        await loadUserData(firebaseUser);
      } else {
        console.log('No user, clearing user state');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function loadUserData(firebaseUser: FirebaseUser) {
    try {
      console.log('📄 Loading user data for:', firebaseUser.uid);
      console.log('📧 User email:', firebaseUser.email);
      console.log('👤 User display name:', firebaseUser.displayName);

      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      console.log('📋 User doc exists:', userDoc.exists());

      if (userDoc.exists()) {
        console.log('📦 Loading existing user data');
        const userData = userDoc.data();
        console.log('📊 User data from Firestore:', userData);

        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || userData.displayName || userData.name || '',
          displayName: firebaseUser.displayName || userData.displayName || '',
          photoURL: firebaseUser.photoURL || undefined,
          createdAt: userData.createdAt?.toDate() || new Date(),
          subscription: userData.subscription || userData.plan || 'free',
          plan: userData.plan || 'free',
        };

        console.log('✅ User object created:', user);
        setUser(user);
      } else {
        console.log('🆕 Creating new user document');
        // Create new user document
        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || undefined,
          createdAt: new Date(),
          subscription: 'free',
          plan: 'free',
        };

        console.log('💾 Saving new user to Firestore:', newUser);
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          ...newUser,
          createdAt: new Date(),
        });

        console.log('✅ New user document created');
        setUser(newUser);
      }
    } catch (error) {
      console.error('❌ Error loading user data:', error);

      // Type assertion to handle unknown error type
      const firebaseError = error as any;
      console.error('Error details:', firebaseError.code, firebaseError.message);

      // Don't set user to null on error - let auth continue
      // Set a basic user object to prevent auth failures
      const basicUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        subscription: 'free',
        plan: 'free',
      };

      console.log('🔧 Using basic user object due to Firestore error:', basicUser);
      setUser(basicUser);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      console.log('🔐 Attempting sign in with email:', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Sign in successful!');
      console.log('👤 User ID:', result.user.uid);
      console.log('📧 User Email:', result.user.email);
      console.log('👁️ User Email Verified:', result.user.emailVerified);
      console.log('🎭 Display Name:', result.user.displayName);

      // The user state will be updated by the onAuthStateChanged listener
      return result;
    } catch (error) {
      console.error('❌ Sign in error:', error);

      // Type assertion to handle unknown error type
      const firebaseError = error as any;
      console.error('Error code:', firebaseError.code);
      console.error('Error message:', firebaseError.message);

      // Provide more detailed error information
      if (firebaseError.code === 'auth/configuration-not-found') {
        console.error('🚨 CRITICAL: Firebase Authentication is not configured properly!');
        console.error('Please go to Firebase Console > Authentication > Sign-in method');
        console.error('and enable Email/Password authentication');
      }

      throw error;
    }
  }

  async function signUp(email: string, password: string, displayName: string) {
    try {
      console.log('🆕 Attempting to create user with email:', email);
      console.log('👤 Display name:', displayName);

      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User creation successful!');
      console.log('👤 User ID:', result.user.uid);
      console.log('📧 User Email:', result.user.email);

      // Update the user's display name
      if (displayName && result.user) {
        console.log('🏷️ Updating display name to:', displayName);
        // Type assertion to handle Firebase User object
        const firebaseUser = result.user as any;
        await firebaseUser.updateProfile({ displayName });
      }

      console.log('💾 Creating user document in Firestore...');
      // Create user document
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        displayName,
        createdAt: new Date(),
        plan: 'free',
        language: 'en',
      });
      console.log('✅ User document created successfully');

      return result;
    } catch (error) {
      console.error('❌ Sign up error:', error);

      // Type assertion to handle unknown error type
      const firebaseError = error as any;
      console.error('Error code:', firebaseError.code);
      console.error('Error message:', firebaseError.message);

      if (firebaseError.code === 'auth/configuration-not-found') {
        console.error('🚨 CRITICAL: Firebase Authentication is not configured properly!');
        console.error('Please go to Firebase Console > Authentication > Sign-in method');
        console.error('and enable Email/Password authentication');
      }

      throw error;
    }
  }

  async function signInWithGoogle() {
    console.log('🔐 Starting Google sign-in...');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('✅ Google sign in successful!');
    console.log('👤 User ID:', result.user.uid);
    console.log('📧 User Email:', result.user.email);
    console.log('👁️ User Email Verified:', result.user.emailVerified);
    console.log('🎭 Display Name:', result.user.displayName);
    return result;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
