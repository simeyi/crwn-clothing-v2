import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    email:'',
    password:''
}

const SignInForm = () => {
    const[formFields, setFormFields] = useState(defaultFormFields);
    const{ email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        // await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const{user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        }catch(e){
            switch(e.code){
                case 'auth/wrong-password': alert('wrong password'); break;
                case 'auth/user-not-found': alert('user not found'); break;
            }
            console.log(e)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});   //... => spread object
    }
    
    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <h1>Sign in with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                <Button buttonType='default' type="submit">Sign In</Button>
                <Button buttonType='google' type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;