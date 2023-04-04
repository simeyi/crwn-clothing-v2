import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ( {cartItem} ) => {
    const {id, name, quantity, imageUrl, price} = cartItem;
    const { addItemToCart, removeItemToCart, removeItem } = useContext(CartContext);
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='div-pointer' onClick={()=>removeItemToCart(cartItem)}>&#60;</div>
                <span className='value'>{quantity}</span>
                <div className='div-pointer' onClick={()=>addItemToCart(cartItem)}>&#62;</div>
            </span>
            <span className='price'>${price}</span>
            <div onClick={()=>removeItem(cartItem)} className='remove-button'>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;