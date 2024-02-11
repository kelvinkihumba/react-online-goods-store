import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from "jquery";
import './AddAdmin.css';

const AddAdmin = (props) => {

    const [result, setResult] = useState("");

    let navigate = useNavigate();
    const routeChange = () =>{
        navigate('/owner_home');
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
                if (data == "successful")
                alert("Admin added successfully");
                routeChange();
            },
        });
    };
    
    return(
        <div className="addadmin">
            <h1>Add Admin</h1>
            <form className="addAdmin" method="post" action="http://134.122.79.252/PHP/add_admin.php" onSubmit={(event) => handleSumbit(event)}>
                <div className="rows"><label>First Name</label> <input type="text" name="f_name"/></div>
                <div className="rows"><label>Last Name</label> <input type="text" name="l_name"/></div>
                <div className="row"><label>Email</label> <input type="text" name="email" /></div>
                <div><button name="save" type="submit">Add Admin</button></div>
                <div className="cancel"><button name="cancel" >Cancel</button></div>
            </form>
        </div>
    );
}

export default AddAdmin;