import { createContext, useState, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES ={
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

export const INITIAL_STATE={
    currentUser: null
}

const userReducer = (state,action) =>{
    const {type, payload} = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,currentUser:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in user Reducer`)
    }

}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [ {currentUser}, dispatch] = useReducer(userReducer,INITIAL_STATE);
    // console.log(currentUser);
    const setCurrentUser = (user) =>{
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    }
    const value = {currentUser, setCurrentUser };

    useEffect(()=>{
        const unsubcribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubcribe
    },[]);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}