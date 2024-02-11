import './Confirmation.css';

const RegistrationConfirmation = (props) => {
    let header = "";
    let sub_header = "";
    let button = "";

    if (props.registerUserResult["requestType"] === "userRegistration") {
        header = (<h1>Thank you for registering!</h1>);
        sub_header = (<h3>Please return to the Login Page.</h3>);
        button = (<button onClick={(e) => {props.setRegisterUserResult("success"); props.gotoLogin(); }}>Go To Login</button>);
    }
    else if (props.registerUserResult["requestType"] === "UserExists") {
        header = (<h1>User already exists.</h1>);
        sub_header = (<h3>Please return to Registration and use a new email.</h3>);
        button = (<button onClick={(e) => {props.setRegisterUserResult("failure"); props.gotoCustomerRegistration(); }}>Go To Customer Registration</button>);

    }

    return (
        <div className="confirmation">
            {header}
            {sub_header}
            {button}
        </div>
    );
}

export default RegistrationConfirmation;