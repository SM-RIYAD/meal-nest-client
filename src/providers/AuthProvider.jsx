import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getAuth, updateProfile } from "firebase/auth";

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [theme,setTheme]=useState("light");

    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const [user,setUser]=useState(null);

  
    
 

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (name,photo) => {
        setLoading(true);
     return  updateProfile(auth.currentUser, {
        displayName: name, 
        photoURL: photo
    });
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn=()=>{
        setLoading(true);
return  signInWithPopup(auth,provider)


    }
    const authInfo = { 
        user,createUser,
        logOut,signIn,theme,googleSignIn,loading,updateUser,setTheme
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            
            console.log('user in the auth state changed', currentUser);
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            setLoading(false);
              // if user exists then issue a token
              if (currentUser) {
                axios.post('https://job-sphere-server.vercel.app/jwt', loggedUser,{
                    withCredentials: true
                }  )
                    .then(res => {
                        console.log('token response', res.data);
                    })
            }
            else {
                axios.post('https://job-sphere-server.vercel.app/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
                return;
            }
           
        });
        return () => {
            unSubscribe();
        }
    }, [ ]);
  
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;