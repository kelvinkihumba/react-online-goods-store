import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from './components/Main';
import Login from './components/Login';
import ProductListing from './components/ProductListing';
import Question from './components/Question';
import SpecialOrder from './components/SpecialOrder';
import OrderConfirmation from './components/OrderConfirmation';
import AdminHome from './components/AdminHome';
import OwnerHome from './components/OwnerHome';
import CustomerRegistration from './components/CustomerRegistration';
import EditProduct from './components/EditProduct';
import AddItem from './components/AddItem';
import AddAdmin from './components/AddAdmin';
import RegistrationConfirmation from './components/RegistrationConfirmation';
import ShoppingCart from './components/ShoppingCart';
import LoginConfirmation from './components/LoginConfirmation';
import Logout from './components/Logout';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import $ from "jquery";
import "./App.css";
import AdminLogin from './components/AdminLogin';
import AdminLoginConfirmation from './components/AdminLoginConfirmation';



function App() {
    const [products, setProducts] = useState([]);
    const [orderResult, setOrderResult] = useState("");
    const [registerUserResult, setRegisterUserResult] = useState("");
    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState("");
    const [loginResult, setLoginResult] = useState("");
    const [adminLoginResult, setAdminLoginResult] = useState("");
    // Layout of cart:
    // {
    //     "email1@email.com": {
    //         productId1: qty1,
    //         productId2: qty2,
    //     },
    //     "email2@email.com": {
    //         productId: qty,
    //     },
    // }
    const [cart, setCart] = useState({});
    const [currentCartQuantity, setCurrentCartQuantity] = useState(0);
    const [currentCartSubtotal, setCurrentCartSubtotal] = useState(0);

    useEffect(() => {
        // fetch user from localStorage
        let localUser = localStorage.getItem('user');
        if (localUser) {
            setUser(localUser);
        }
        let localUserName = localStorage.getItem('userName');
        if (localUserName) {
            setUserName(localUserName);
        }
        // fetch the cart from localStorage
        let localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart) {
            if (!(localUser in localCart)) {
                localCart[localUser] = {};
                localStorage.setItem('cart', JSON.stringify(localCart));
            }
        } else {
            localCart = {};
            localCart[localUser] = {};
            localStorage.setItem('cart', JSON.stringify(localCart));
        }
        setCart(localCart);
        calculateCartQuantity(localCart);
        getProducts();
    }, []);

    // calculate the cart subtotal when products or cart are updated
    useEffect(() => {
        calculateCartSubtotal(cart);
    }, [products]);
    useEffect(() => {
        calculateCartSubtotal(cart);
    }, [cart]);

    useEffect(() => {
        calculateCartQuantity(cart);
    }, [user]);

    const addUserToCart = (userEmail) => {
        let cartCopy = cart;
        if (!(userEmail in cart)) {
            cartCopy[userEmail] = {};
            localStorage.setItem('cart', JSON.stringify(cartCopy));
            setCart(cartCopy);
        }
    }

    const getProducts = async() => {
        try{
            const url = "http://134.122.79.252/PHP/get_products.php";
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
        }
        catch(err) {
            console.error(err);
        }
    };

    const setUserWithLocalStorage = (u) => {
        setUser(u);
        localStorage.setItem('user', u);
    }

    const setUserNameWithLocalStorage = (u) => {
        setUserName(u);
        localStorage.setItem('userName', u);
    }

    const logoutFunction = () => {
        setUserWithLocalStorage("");
        setUserNameWithLocalStorage("");
        setLoginResult("");
    }

    const calculateCartQuantity = (cart) => {
        let cartItems = 0;
        if (Object.keys(cart).length > 0) {
            for (const productId in cart[user]) {
                cartItems += +cart[user][productId];
            }
        }
        setCurrentCartQuantity(cartItems);
    }

    const calculateCartSubtotal = (cart) => {
        let subtotal = 0;
        if (Object.keys(cart).length > 0) {
            for (const productId in cart[user]) {
                let product = products.find(p => p.product_id == productId);
                if (product) {
                    let price = +cart[user][productId] * +product.price;
                    subtotal += price;
                }
            }
        }
        setCurrentCartSubtotal(subtotal.toFixed(2));
    }

    const addProductToCart = (productId, quantity) => {
        // update the cart
        let cartCopy = cart;
        // check if productId is already in the cart. If so, just add the quantity
        if (user in cartCopy) {
            if (productId in cartCopy[user]) {
                let currQuantity = +cartCopy[user][productId];
                quantity = quantity + currQuantity;
            }
        }
        let product = products.find(p => p.product_id === productId);
        if (+product.quantity_applies && quantity > product.quantity_available) {
            quantity = product.quantity_available;
        }
        cartCopy[user][productId] = quantity;
        setCart(cartCopy);
        calculateCartQuantity(cartCopy);
        calculateCartSubtotal(cartCopy);
        localStorage.setItem('cart', JSON.stringify(cartCopy));
    }

    const editProductQuantityInCart = (productId, quantity) => {
        let cartCopy = cart;
        if (quantity == 0) {
            delete cartCopy[user][productId];
        } else {
            cartCopy[user][productId] = +quantity;
        }
        setCart(cartCopy);
        calculateCartQuantity(cartCopy);
        calculateCartSubtotal(cartCopy);
        localStorage.setItem('cart', JSON.stringify(cartCopy));
    }

    const clearUserShoppingCart = () => {
        let cartCopy = cart;
        cartCopy[user] = {};
        setCart(cartCopy);
        setCurrentCartQuantity(0);
        setCurrentCartSubtotal(0);
        localStorage.setItem('cart', JSON.stringify(cartCopy));

        // only gets called when a user checks out, so re-fetch the products to get updated quantities
        getProducts();
    }

    let navigate = useNavigate();
    const gotoQuestion = () => {
        navigate('/question');
    }
    const gotoSpecialOrder = () => {
        navigate('/special_order');
    }
    const gotoShoppingCart = () => {
        navigate('/shopping_cart');
    }
    const gotoHome = () => {
        navigate('/home');
    }
    const gotoLogin = () => {
        navigate('/login/');
    }
    const gotoCustomerRegistration = () => {
        navigate('/customer_registration');
    }
    const gotoOwner = () => {
        navigate('/owner_home');
    }
    const gotoAdmin = () => {
        navigate('/admin_home');
    }
    const gotoRegistrationConfirmation = () => {
        navigate('/registration_confirmation');
    }
    const gotoLoginConfirmation = () => {
        navigate('/login_confirmation');
    }
    const gotoLogout = () => {
        navigate('/logout');
    }
    const gotoAdminLogin = () => {
        navigate('/admin_login');
    }
    const gotoAdminLoginConfirmation = () => {
        navigate('/admin_login_confirmation');
    }


    return (
        <div className="App">
            <Header gotoHome={gotoHome}
                gotoLogin={gotoLogin}
                gotoShoppingCart={gotoShoppingCart}
                cartQuantity={currentCartQuantity}
                loginResult={loginResult}
                userName={userName}
                userType={userType}
                setUserType={setUserType}
                logoutFunction={logoutFunction}
                gotoLogout={gotoLogout}
            />
            <Routes>
                <Route path='/' element={
                    <Login gotoHome={gotoHome}
                        gotoAdmin={gotoAdmin} gotoOwner={gotoOwner}
                        gotoCustomerRegistration={gotoCustomerRegistration}
                        setUser={setUserWithLocalStorage}
                        gotoLoginConfirmation={gotoLoginConfirmation}
                        user={user}
                        userName={userName}
                        setUserName={setUserNameWithLocalStorage}
                        loginResult={loginResult}
                        setLoginResult={setLoginResult}
                        setUserType={setUserType}
                        userType={userType}
                        addUserToCart={addUserToCart} />
                } />
                <Route path='/home' element={
                  <Main products={products} setProducts={setProducts} onClickQuestion={gotoQuestion}
                        onClickSpecialOrder={gotoSpecialOrder} />
                } />
                {products.map(p => +p.available_for_sale ? <Route path={'/product_' + p.product_id}  key={p.product_id} element={
                  <ProductListing product={p} addToCart={addProductToCart} />
                } /> : null)}

                {products.map(p => <Route path={'/edit_' + p.product_id}  key={p.product_id} element={
                  <EditProduct product={p} />
                } />)}

                <Route path='/login/*' element={<Login gotoHome={gotoHome}
                    gotoAdmin={gotoAdmin}
                    gotoOwner={gotoOwner}
                    gotoAdminLogin={gotoAdminLogin}
                    gotoCustomerRegistration={gotoCustomerRegistration}
                    setUser={setUserWithLocalStorage}
                    gotoLoginConfirmation={gotoLoginConfirmation}
                    user={user}
                    userName={userName}
                    setUserName={setUserNameWithLocalStorage}
                    loginResult={loginResult}
                    setLoginResult={setLoginResult}
                    setUserType={setUserType}
                    userType={userType}
                    addUserToCart={addUserToCart}
                    />}
                />

                <Route path='/admin_login' element={<AdminLogin
                    setUser={setUserWithLocalStorage}
                    gotoLoginConfirmation={gotoLoginConfirmation}
                    user={user}
                    userName={userName}
                    setUserName={setUserNameWithLocalStorage}
                    loginResult={loginResult}
                    setLoginResult={setLoginResult}
                    setUserType={setUserType}
                    userType={userType}
                    gotoAdminLoginConfirmation={gotoAdminLoginConfirmation}
                    adminLoginResult={adminLoginResult}
                    setAdminLoginResult={setAdminLoginResult}/>}
                />

                <Route path='/admin_login_confirmation' element={<AdminLoginConfirmation
                    setUser={setUserWithLocalStorage}
                    gotoAdminLogin={gotoAdminLogin}
                    user={user}
                    userName={userName}
                    setUserName={setUserNameWithLocalStorage}
                    loginResult={loginResult}
                    setLoginResult={setLoginResult}
                    setUserType={setUserType}
                    userType={userType}
                    adminLoginResult={adminLoginResult}
                    setAdminLoginResult={setAdminLoginResult}
                    gotoOwner={gotoOwner}
                    gotoAdmin={gotoAdmin} />}
                />

                <Route path='/customer_registration' element={<CustomerRegistration
                    setRegisterUserResult={setRegisterUserResult}
                    gotoHome={gotoHome}
                    gotoLogin={gotoLogin}
                    gotoRegistrationConfirmation={gotoRegistrationConfirmation}
                    registerUserResult={registerUserResult} />}
                />

                <Route path='/registration_confirmation' element={<RegistrationConfirmation
                    setRegisterUserResult={setRegisterUserResult}
                    registerUserResult={registerUserResult}
                    gotoLogin={gotoLogin}
                    gotoHome={gotoHome}
                    gotoCustomerRegistration={gotoCustomerRegistration} />}
                />

                <Route path='/logout' element={<Logout
                    gotoLogin={gotoLogin}
                    loginResult={loginResult}
                    setLoginResult={setLoginResult}
                    userName={userName}
                    setUserName={setUserNameWithLocalStorage}
                    setUser={setUserWithLocalStorage}
                    user={user} />}
                />

                <Route path='/login_confirmation' element={<LoginConfirmation
                    setUser={setUserWithLocalStorage}
                    user={user}
                    loginResult={loginResult}
                    setLoginResult={setLoginResult}
                    gotoLogin={gotoLogin}
                    gotoHome={gotoHome}
                    userName={userName}
                    setUserName={setUserNameWithLocalStorage}
                    setUserType={setUserType}
                    userType={userType}
                />}
                />

                <Route path='/owner_home' element={<OwnerHome />}/>
                <Route path='/admin_home' element={<AdminHome />}/>
                <Route path='/add_item' element={<AddItem />}/>
                <Route path='/add_admin' element={<AddAdmin />}/>
                <Route path='/question' element={<Question setOrderResult={setOrderResult} />} />

                <Route path='/special_order' element={<SpecialOrder setOrderResult={setOrderResult} />} />

                <Route path='/order_confirmation' element={<OrderConfirmation
                    orderResult={orderResult} setOrderResult={setOrderResult}
                    gotoHome={gotoHome} />}
                />
                <Route path='/shopping_cart' element={
                    <ShoppingCart cart={cart} user={user} products={products}
                        subtotal={currentCartSubtotal}
                        editProductQuantityInCart={editProductQuantityInCart}
                        clearUserShoppingCart={clearUserShoppingCart}
                        setOrderResult={setOrderResult}
                    />}
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;