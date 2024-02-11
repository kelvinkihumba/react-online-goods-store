
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AdminHome.css'

const AdminHome = () => {
    const [products, setProducts] = useState([]);
    const [orderResult, setOrderResult] = useState("");

    useEffect(() => {
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
        // invoke the async function
        getProducts();
    }, []);

    let navigate = useNavigate();
    const addItem = () =>{ 
        let path = '/add_item'; 
        navigate(path);
    }

    return (
        <div className="admin-home">
            <div>
            <h1>PRODUCT LISTINGS</h1>
            <button onClick = {addItem}>Add Item</button>
            </div>
            <ProductList products={products}/>
        </div>
    );
}

function ProductList(props) {
    return (
        <div className="list">
            <table className="table">
                <tbody>
                    <tr>
                        <th>PID</th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Picture</th>
                    </tr>
                    {props.products.map(p => <ProductListItem product={p} key={p.product_id} />)}
                </tbody>
            </table>
        </div>
    );
}

function ProductListItem(props) {
    const imgUrl = "http://134.122.79.252/product_images/" + props.product.product_image;
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = '/edit_' + props.product.product_id; 
        navigate(path);
    }

    let avail = "No";
    if (+props.product.available_for_sale)
        avail = "Yes";

    return (
      <tr onClick={routeChange}>
        <td>{props.product.product_id}</td>
        <td>{props.product.product_name}</td>
        <td>{props.product.description}</td>
        <td>{props.product.quantity_available}</td>
        <td>{props.product.price}</td>
        <td>{avail}</td>
        <td><img src={imgUrl} alt={props.product.product_name} /></td>
      </tr>
    );
}

export default AdminHome;