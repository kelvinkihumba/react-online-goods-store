import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductListing.css';

const ProductListing = (props) => {
    const imgUrl = 'http://134.122.79.252/product_images/' + props.product.product_image;

    let navigate = useNavigate();
    const routeChange = () =>{
        navigate('/home');
    }

    let maximum = 100;
    let max_quantity_label = "";
    if (+props.product.quantity_applies) {
        maximum = props.product.quantity_available;
        max_quantity_label = (<p className="max-quantity-label">Available: {maximum}</p>);
    }
    const [quantity, setQuantity] = useState(1);

    const setQuantityWtihMaximum = (q) => {
        q = +q;
        if (q > maximum) {
            setQuantity(maximum);
        } else if (q < 1) {
            setQuantity(1);
        } else {
            setQuantity(q);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addToCart(props.product.product_id, quantity);
    }

    return (
        <div className="product-listing-page">
            <a className="cookie-crumbs" onClick={routeChange}>&lt; Back To Home</a>
            <div className="listing-container">
                <img src={imgUrl} alt={props.product.product_name} />
                <div className="product-information">
                    <h2>{props.product.product_name}</h2>
                    <h3>${props.product.price}</h3>
                    <p>{props.product.description}</p>
                    <form onSubmit={handleSubmit}>
                        <label>Quantity:</label>
                        <input type="number" min="1" max={maximum}
                            name={'quantity_' + props.product.product_id}
                            value={quantity}
                            onChange={(event) => {
                                setQuantityWtihMaximum(event.target.value);
                            }}
                        />
                        {max_quantity_label}
                        <button type="submit">Add to Cart</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductListing;