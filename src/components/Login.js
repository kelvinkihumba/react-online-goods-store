
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import $ from "jquery";

//get the state variable from register_user (if success, display header, "Registration successful, log in")
//create a state variable named user, when you click login, set user = user's email
const Login = (props) => {
    let navigate = useNavigate();
    const gotoCustomerRegistration = () => {
        navigate('/customer_registration');
    }

    const handleLogin = (e) => {
        e.preventDefault();

        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                data = JSON.parse(data);
                props.setLoginResult(data);
                props.setUser(data["UserEmail"]);
                props.setUserName(data["UserName"]);
                props.addUserToCart(data["UserEmail"]);
                navigate('/login_confirmation');
            },
            failure() {
                props.setUser("");
                props.setUserName("");
                props.setLoginResult("failure");
                navigate('/login_confirmation');
            }
        });
    };

    return (
        <div className="login">
            <h1>Customer Login</h1>
            <form className="form-page" method="post" action="http://134.122.79.252/PHP/user_login.php"
                onSubmit={(event) => handleLogin(event)}>

                <label htmlFor="email">Email</label>
                <input type="text"
                    name="user_email"
                    onChange={({ target }) => props.setUser(target.value)}
                    autoComplete="current-username"
                    required placeholder="Enter your email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

                <label htmlFor="password">Password</label>
                <input type="password"
                    name="user_password"
                    autoComplete="current-password"
                    required placeholder="Enter your password" /> 

                <button id="customer_login" type="submit">Login</button>
            </form>
            <div className="other-buttons">
                <div className="empty"></div><button id="new_customer" onClick={gotoCustomerRegistration}>Register New User</button>
                <div className="empty"></div>
                <button id="admin_login" type="button" onClick={props.gotoAdminLogin}>Owner/Admin Login</button>
           </div>
        </div>
    );
}

export default Login;