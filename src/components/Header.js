import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import "./Header.css";
import { useEffect } from 'react';

function Header(props) {
    let welcome = (<a id="login" href="#" onClick={props.gotoLogin}>Log in</a>); 

    if (props.userName != "") {
        welcome = (<p id="login">Hello, {props.userName}</p>);
    }

    const logout = () => {
        props.logoutFunction();
        props.gotoLogout();
    }

    return (
        <div className="header">
            <img
                src={logo}
                alt={"Bird+Bee Goods Logo"}
                onClick={props.gotoHome}
            />
            <h1 onClick={props.gotoHome}>Bird + Bee</h1>
            <h2 onClick={props.gotoHome}>HOME + HANDMADE GOODS</h2>
            {welcome}
            {props.userName ? <a id="logout" href="#" onClick={logout}>Log out</a> : null }
            <div className="cart" onClick={props.gotoShoppingCart}>
                <FontAwesomeIcon icon={faCartShopping} /><p>{props.cartQuantity}</p>
            </div>
        </div>
    );
}

export default Header;