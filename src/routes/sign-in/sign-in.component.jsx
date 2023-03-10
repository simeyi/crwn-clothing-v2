import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } 
from "../../utils/firebase/firebase.utils";

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './sign-in.styles.scss';

const SignIn = () => {
    useEffect(async()=>{
        const response = await getRedirectResult(auth);
        if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    },[])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
            <button onClick={signInWithGoogleRedirect} hidden={true}>
                Sign in with Google Redirect
            </button>
        </div>
    )
}

export default SignIn;