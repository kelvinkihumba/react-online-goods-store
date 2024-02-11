import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import $ from "jquery";


//get the state variable from register_user (if success, display header, "Registration successful, log in")
//create a state variable named user, when you click login, set user = user's email
const AdminLogin = (props) => {
    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                data = JSON.parse(data);
                props.setAdminLoginResult(data);
                props.setUser(data["UserEmail"]);
                props.setUserName(data["UserName"]);
                navigate('/admin_login_confirmation');
            },
            failure() {
                props.setUser("");
                props.setUserName("");
                props.setAdminLoginResult("failure");
                navigate('/admin_login_confirmation');
            }
        });
    };

    return (
        <div className="login">
            <h1>Admin/Owner Login</h1>
            <form className="form-page" method="post" action="http://134.122.79.252/PHP/admin_login.php"
                onSubmit={(event) => handleLogin(event)}>

                <label htmlFor="email">Email</label>
                <input type="text"
                    name="admin_email"
                    onChange={({ target }) => props.setUser(target.value)}
                    autoComplete="current-username"
                    required placeholder="Enter your email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

                <label htmlFor="password">Password</label>
                <input type="password"
                    name="admin_password"
                    autoComplete="current-password"
                    required placeholder="Enter your password" /> 

                <input type="radio" id="admin" name="type" value="admin"/>
                <label htmlFor="admin">Admin</label>

                <input type="radio" id="owner" name="type" value="owner"/>
                <label htmlFor="owner">Owner</label>

                <button name="submit" type="submit" value="login">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;