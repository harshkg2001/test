import AuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";
import {auth} from '../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On mount, subscribe to auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }
    , []);

    // Auth functions
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    
    const logOut = () => {
        return signOut(auth);
    };
    
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };
    
    const verifyEmail = () => {
        if(!user) return Promise.reject('No user found');
        return sendEmailVerification(user);
    };

    const updateUser = (name, image) => {
        if(!user) return Promise.reject('No user found');
        return updateProfile(user, {displayName: name, photoURL: image});
    };

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

  
    const value = {
        user,
        setUser,
        signUp,
        signIn,
        logOut,
        resetPassword,
        verifyEmail,
        updateUser,
        googleSignIn,
    };
    
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;