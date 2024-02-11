
import {useNavigate} from 'react-router-dom';
import $ from "jquery";
import './FormPage.css';
import RegistrationConfirmation from './RegistrationConfirmation';


const CustomerRegistration = (props) => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);

        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                data = JSON.parse(data);
                console.log(data);
                props.setRegisterUserResult(data);
                navigate('/registration_confirmation');
            },
            failure() {
                props.setRegisterUserResult("failed to register");
                navigate('/registration_confirmation');
            },
        });
    };
  

    return (
        <div className="customer_registration">
            <h1>Register New Customer</h1>
            <form className="form-page"
                method="post"
                action="http://134.122.79.252/PHP/register_user.php"
                onSubmit={(event) => handleSubmit(event)} >
                
                <label htmlFor="name">Email</label>
                <input name="email" 
                maxLength={100}
                required type="text"
                placeholder="Enter your email" 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                 />
                
                <label htmlFor="password">Password</label>
                <input name="password" 
                    maxLength={100}
                    type = "password" 
                    required placeholder="Enter your password" 
                 />
                
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input name="confirmpassword" 
                    maxLength={100}
                    type = "password" 
                    required placeholder="Confirm your password"
                 />
               
                <label htmlFor="fname">First Name</label>
                <input name="f_name" 
                    maxLength={100}
                    required type="text"
                    placeholder="Enter your first name" 
                 />
                
                <label htmlFor="lname">Last Name</label>
                <input name="l_name"
                    maxLength={100}
                    required type="text"
                    placeholder="Enter your last name" 
                 />
                    
                <button id="register" type="submit">Register</button>
                
            </form>
        </div>
    );
}

export default CustomerRegistration;