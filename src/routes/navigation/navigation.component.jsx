import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from '../../store/user/user.selector';

const Navigation = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);
  const signOutHandler = async() =>{
    const res = await signOutUser();
    // setCurrentUser(null);
  }
    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <CrownLogo className='logo'/>
          </Link>            
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
              ):(
                <Link className="nav-link" to="/auth">
                  SIGN IN
                </Link>    
              )
            }
            <CartIcon></CartIcon>
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;