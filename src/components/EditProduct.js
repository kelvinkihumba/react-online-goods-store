import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProduct.css';
import $ from "jquery";

const EditProduct = (props) => {
    const imgUrl = "http://134.122.79.252/product_images/" + props.product.product_image;
    const myProduct = props.product;

    const [currentProduct, setCurrent] = useState(myProduct);
    const [result, setResult] = useState("");
    
    let navigate = useNavigate();
    const routeChange = () =>{
        navigate('/admin_home');
    }

    const updateProduct = (modified) => {
        setCurrent(modified);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
                alert("Changes were successful")
                routeChange();
            },
        });
    };

    const EditProductForm = (props) => {
        let quantityAvailabe;
        if (!props.product.quantity_available){
            quantityAvailabe = 0;
        }
        else {
            quantityAvailabe = props.product.quantity_available;
        }
        return(
            <form className="editForm" method="post" action="http://134.122.79.252/PHP/edit_product.php" onSubmit={(event) => handleSumbit(event)}>
                <label>Product ID</label>
                <input type="text" name="product_id" defaultValue={props.product.product_id} readOnly/>

                <label>Item Name</label>
                <input id="name" type="text" name="product_name" defaultValue={props.product.product_name}
                    onChange= {(e) => {
                        props.product.product_name = e.target.value;
                        props.updateFunc(props.product);
                }}/>
                <label>Description</label>
                <textarea type="text" name="description" defaultValue={props.product.description}
                    onChange= {(e) => {
                        props.product.description = e.target.value;
                        props.updateFunc(props.product);    
                     }}/>
                <label>Quantity</label>
                <input type="text" name="quantity" defaultValue={quantityAvailabe}
                    onChange= {(e) => {
                        props.product.quantity_available = e.target.value;
                        props.updateFunc(props.product);
                }}/>
                <label>Price</label>
                <input type="text" name="price" defaultValue={props.product.price}
                    onChange= {(e) => {
                        props.product.price = e.target.value;
                        props.updateFunc(props.product);
                }}/>
                <label>Available for Sale</label>
                <input type="text" name="available_for_sale" defaultValue={props.product.available_for_sale}
                    onChange= {(e) => {
                        props.product.available_for_sale = e.target.value;
                        props.updateFunc(props.product);
                }}/>
                <label>Quantity Applies</label>
                <input type="text" name="quantity_applies" defaultValue={props.product.quantity_applies}
                    onChange= {(e) => {
                        props.product.quantity_applies = e.target.value;
                        props.updateFunc(props.product);
                }}/>
                <label>Image Url</label>
                <input type="text" name="product_image" defaultValue={props.product.product_image}
                    onChange= {(e) => {
                        props.product.product_image = e.target.value;
                        props.updateFunc(props.product);
                }}/>
                <button name ="save" type="submit">Save Changes</button>
                <button name ="delete" onClick={()=>{
                    document.getElementById("name").value = "delete";
                }}>Delete Item</button>
                <button name="cancel" onClick={routeChange}>Cancel</button>
            </form>
        );
    }

    return(
        <div>
            <h1>EDIT PRODUCT</h1>
            <div className="editPage">
                <div><img src={imgUrl} alt={props.product.product_name}/></div>
                <div className="details">
                    <EditProductForm product = {currentProduct} updateFunc={updateProduct}/>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;