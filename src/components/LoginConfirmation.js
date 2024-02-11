import './Confirmation.css';

const LoginConfirmation = (props) => {
    let header = "";
    let sub_header = "";
    let button = "";
    let name = props.loginResult["UserName"];

    if (props.loginResult["requestType"] === "userLogin") {
        
        header = (<h1>Login Successful, {name}</h1>)
        sub_header = (<h3>Head to the Home Page to start shopping.</h3>);
        button = (<button onClick={(e) => {props.gotoHome(); }}>Go To Home</button>);
    }
    else if (props.loginResult["requestType"] === "UsernameError") {
        header = (<h1>Username is incorrect.</h1>);
        sub_header = (<h3>Please return to Login and re-enter your information.</h3>);
        button = (<button onClick={(e) => {props.setLoginResult("failure"); props.gotoLogin(); }}>Go Back To Login</button>);
    }
    else if (props.loginResult["requestType"] === "PasswordError") {
        header = (<h1>User password is incorrect.</h1>);
        sub_header = (<h3>Please return to Login and re-enter your information.</h3>);
        button = (<button onClick={(e) => {props.setLoginResult("failure"); props.gotoLogin(); }}>Go Back To Login</button>);

    }

    return (
        <div className="confirmation">
            {header}
            {sub_header}
            {button}
        </div>
    );
}

export default LoginConfirmation;