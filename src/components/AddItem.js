import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from "jquery";
import './AddItem.css';

const AddItem = (props) => {

    const [result, setResult] = useState("");

    let navigate = useNavigate();
    const routeChange = () =>{
        navigate('/admin_home');
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
                console.log(data);
                if (data == "successful"){
                    alert("Product added successfully");
                    routeChange();
                }
            },
        });
    };
    
return(

    <div className="additem">
        <h1>Add Item</h1>
        <div className="form">
         <form className="addItemForm" method="post" action="http://134.122.79.252/PHP/add_product.php" onSubmit={(event) => handleSumbit(event)}>
            <div className="flex">
                    <div className="rows"><label>Item Name</label> <input type="text" name="product_name" className="input"/></div>
                    <div className="rows"><label>Description</label> <textarea type="text" name="description"/></div>
                    <div className="rows" ><label>Quantity</label> <input type="text" name="quantity_available" /></div>
                    <div className="rows"><label>Price</label> <input type="text" name="price" /></div>
                    <div className="rows"><label>Available for Sale</label> <input type="text" name="available_for_sale"/></div>
                     <div className="rows"><label>Quantity Applies</label> <input type="text" name="quantity_applies"/></div>
                     <div className="rows"><label>Image</label> <input type="text" name="product_image"/></div>
                     <div><button name ="save" type="submit">Add Item</button></div>
                     <div className="cancel" onClick={routeChange()}><button name ="cancel" >Cancel</button></div>
                     </div>
                    </form>
         </div>
                    
    </div>
);
}

export default AddItem;