import { createContext, useEffect, useReducer, useState } from "react";

const addCartItem = (cartItems, productToAdd) =>{
    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === productToAdd.id 
    );
    if (existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }
    return [...cartItems, { ...productToAdd, quantity: 1}];

}

const deleteItem = (cartItems, itemToRemove) =>{
    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === itemToRemove.id 
    );

    return cartItems.filter((cartItem)=>cartItem.id !== itemToRemove.id);

}

const removeCartItem = (cartItems, productToRemove) =>{
    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === productToRemove.id 
    );

    if (existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=>cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem)=>
        cartItem.id === productToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )
}

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart:() => {},
    removeItemToCart:() => {},
    removeItem:()=>{},
    cartCount:0,
    cartTotal:0
})

const INITAL_STATE = {
    isCartOpen:false,
    cartItems:[],
    cartCount:0,
    cartTotal:0    
}

const cartReducer = (state,action) =>{
    const{type,payload} = action;
    
    switch(type){
        case 'SET_CART_ITEMS':
            return{
                ...state,
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return{
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cart reducer`)
    }
}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(()=>{
    //     const newCartCount = cartItems.reduce((total,cartItem)=>total + cartItem.quantity,0)
    //     setCartCount(newCartCount);
    // },[cartItems])

    // useEffect(()=>{
    //     const newCartTotal = cartItems.reduce((total,cartItem)=>total + cartItem.quantity * cartItem.price,0)
    //     setCartTotal(newCartTotal);
    // },[cartItems])
    
    const [{isCartOpen, cartItems, cartCount, cartTotal},dispatch] = useReducer(cartReducer,INITAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total,cartItem)=>total + cartItem.quantity,0);
        const newCartTotal = newCartItems.reduce((total,cartItem)=>total + cartItem.quantity * cartItem.price,0);
        dispatch({type:'SET_CART_ITEMS',payload:{cartItems:newCartItems, cartCount:newCartCount, cartTotal:newCartTotal}});
    }
    
    const addItemToCart = (productToAdd)=>{
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (productToRemove)=>{
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const removeItem = (itemToRemove)=>{
        const newCartItems = deleteItem(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) =>{
        dispatch({type:'SET_IS_CART_OPEN',payload:bool})
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, removeItem, cartItems, cartCount, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}