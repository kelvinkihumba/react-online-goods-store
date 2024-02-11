import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {CLIENT_ID} from '../Config/Config';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCart.css';

const ShoppingCartItem = (props) => {
    let initialSubTotal = (+props.price * +props.cart[props.user][props.product.product_id]).toFixed(2);
    const [subTotal, setSubTotal] = useState(initialSubTotal);

    let maximum = 100;
    if (+props.product.quantity_applies) {
        maximum = props.product.quantity_available;
    }
    const imgUrl = 'http://134.122.79.252/product_images/' + props.product.product_image;

    const updateQuantity = (value) => {
        value = +value;
        if (value < 1) {
            value = 1;
        } else if (value > maximum) {
            value = maximum;
        }
        props.updateForm(props.product.product_id, value);
        setSubTotal((+props.product.price * value).toFixed(2));
    }

    const deleteProduct = () => {
        props.updateForm(props.product.product_id, 0);
    }
    return (
        <div className="cart-item">
            <img src={imgUrl} alt={props.product.product_name} />
            <p className="product-name">{props.product.product_name}</p>
            <form>
                <label>Quantity:</label>
                <input
                    type="number"
                    required
                    min="1"
                    max={maximum}
                    value={props.cart[props.user][props.product.product_id]}
                    onChange={(event) => {
                        updateQuantity(event.target.value);
                    }}
                />
                <div><FontAwesomeIcon icon={faTrashCan} onClick={deleteProduct} /></div>
            </form>
            <div className="dots"></div>
            <p className="quantity">${subTotal}</p>
        </div>
    );
}

const ShoppingCart = (props) => {
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [total, setTotal] = useState(props.subtotal);
    const [notes, setNotes] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");

    let navigate = useNavigate();
    const submitOrder = async() => {
        let shoppingCart = {};
        for (const productId in props.cart[props.user]) {
            shoppingCart[productId] = props.cart[props.user][productId];
        }
        let address = deliveryAddress;
        if (deliveryMethod == "pickup") {
            address = "pickup";
        }
        var formData = new FormData();
        formData.set('cust_email', props.user);
        formData.set('shoppingCart', JSON.stringify(shoppingCart));
        formData.set('total', total);
        formData.set('notes', notes);
        formData.set('address', address);
        formData.set('paypal_order_id', orderID);
        const requestOptions = {
            method: 'POST',
            body: formData
        };

        const url = "http://134.122.79.252/PHP/submit_order.php";
        fetch(url, requestOptions)
            .then( response => response.json())
            .then( data => {
                props.setOrderResult(data);
                props.clearUserShoppingCart();
                navigate('/order_confirmation');
            })
            .catch(err =>console.error(err));
    };

    const shoppingCartItems = [];
    if (Object.keys(props.cart).length > 0) {
        for (let item in props.cart[props.user]) {
            const product = props.products.find(p => p.product_id == item);
            if (product) {
                shoppingCartItems.push(
                    <ShoppingCartItem
                        key={item}
                        product={product}
                        cart={props.cart}
                        user={props.user}
                        price={product.price}
                        updateForm={props.editProductQuantityInCart}
                    />
                );
            }
        }
    }

    const deliveryPrices = {
        "pickup": 0,
        "local": 0,
        "15miles": 10,
        "30miles": 15
    }

    useEffect(() => {
        let tempTotal = (+props.subtotal + +deliveryPrices[deliveryMethod]).toFixed(2);
        setTotal(tempTotal);
    }, [deliveryMethod, props.subtotal]);

    let deliveryAddressInput = "";
    if (deliveryMethod != "pickup") {
        deliveryAddressInput = (
            <div className="delivery">
                <label htmlFor="address">Delivery Address</label>
                <input type="text" required name="address" onChange={(e) => setDeliveryAddress(e.target.value)}/>
            </div>
        );
    }

    /* Paypal Nonsense -- mostly boilerplate from this tutorial https://episyche.com/blog/how-to-integrate-paypal-with-react-application */

    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Order for" + props.user,
                    amount: {
                        currency_code: "USD",
                        value: total,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function(details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    // capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment");
    };

    useEffect(() => {
        if (success) {
            //complete order in database and get confirmation number
            submitOrder();
        }
    }, [success]);

    /* End Paypal Nonsense */

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className="shopping-cart">
                <h1>Check Out</h1>
                {shoppingCartItems}
                <div className="cart-bottom-row">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        name="notes"
                        rows="3"
                        value={notes}
                        onChange={(e) => {setNotes(e.target.value);}} >
                    </textarea>
                    <div className="empty"></div>
                    <p>Subtotal</p>
                    <p>${props.subtotal}</p>
                </div>
                <hr />
                <div className="select-delivery">
                    <label htmlFor="shipping">Shipping</label>
                    <select name="shipping" onChange={(e) => {setDeliveryMethod(e.target.value);}}>
                        <option value="pickup">Pick Up</option>
                        <option value="local">Local Delivery (up to 5 miles) -- free</option>
                        <option value="15miles">Delivery (6-15 miles) -- $10</option>
                        <option value="30miles">Delivery (16-30 miles) -- $15</option>
                    </select>
                    <div className="empty"></div>
                    <p>${total}</p>
                </div>
                {deliveryAddressInput}
                {/* <button onClick={submitOrder}>Confirm Order</button> */}
                <div className="paypal">
                    <PayPalButtons
                        style={{layout: "horizontal"}}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

export default ShoppingCart;