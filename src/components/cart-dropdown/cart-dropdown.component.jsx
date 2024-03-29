import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';



const CartDropdown = () => {
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout',{state:{param1:'test'}});
    }

    const{cartItems} = useContext(CartContext);
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item)=>(
                    <CartItem key={item.id} cartItem={item} />
                ))}
            
            </div>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </div>
    )
}

export default CartDropdown;