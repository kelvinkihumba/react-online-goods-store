
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './OwnerHome.css'
import $ from "jquery";

const OwnerHome = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const getAdmins = async() => {
            try{
                const url = "http://134.122.79.252/PHP/get_admins.php";
                const response = await fetch(url);
                const data = await response.json();
                setAdmins(data);
            }
            catch(err) {
                console.error(err);
            }
        };
        // invoke the async function
        getAdmins();
    }, []);

    let navigate = useNavigate();
    const addAdmin = () =>{ 
        let path = '/add_admin'; 
        navigate(path);
    }

    return (
        <div className="owner-home">
            <h1>Administrators</h1>
            <button className="add-button" onClick = {addAdmin}>Add Admin</button>
            <AdminList admins={admins}/>
        </div>
    );
}

const AdminList = (props) => {
    return(
        <table className="admintable">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                {props.admins.map(p => <AdminListItem admin={p} key={p.admin_id} />)}
            </tbody>
        </table>
    );
}

const AdminListItem = (props) => {

    const [result, setResult] = useState("");
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
                alert("Admin removed successfully");
            },
        });
    };

    return(
        <tr>
            <td>{props.admin.f_name} {props.admin.l_name}</td>
            <td>{props.admin.email}</td>
            <td><form action="http://134.122.79.252/PHP/remove_admin.php?" onSubmit={(event) => handleSumbit(event)}>
                <input type = "hidden" value={props.admin.email} name = "email"></input>
                <button name="remove" type = "submit">Remove</button>
                </form>
            </td>
        </tr>
    )
}


export default OwnerHome;