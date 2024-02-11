import './Confirmation.css';

const AdminLoginConfirmation = (props) => {
    let header = "";
    let sub_header = "";
    let button = "";
    let name = props.adminLoginResult["UserName"];
    if (props.adminLoginResult["requestType"] === "adminLogin") {
        
        header = (<h1>Login Successful, {name}</h1>);
        sub_header = (<h3></h3>);
        button = (<button onClick={(e) => {props.gotoAdmin(); }}>Go To Admin Home</button>);
    }
    if (props.adminLoginResult["requestType"] === "ownerLogin") {
        
        header = (<h1>Login Successful, {name}</h1>);
        sub_header = (<h3></h3>);
        button = (<button onClick={(e) => {props.gotoOwner(); }}>Go To Owner Home</button>);
    }
    else if (props.adminLoginResult["requestType"] === "UsernameError") {
        header = (<h1>Username is incorrect.</h1>);
        sub_header = (<h3>Please return to Login and re-enter your information.</h3>);
        button = (<button onClick={(e) => {props.setAdminLoginResult(""); props.gotoAdminLogin(); }}>Go Back To Admin Login</button>);
    }
    else if (props.adminLoginResult["requestType"] === "PasswordError") {
        header = (<h1>User password is incorrect.</h1>);
        sub_header = (<h3>Please return to Admin Login and re-enter your information.</h3>);
        button = (<button onClick={(e) => {props.setAdminLoginResult(""); props.gotoAdminLogin(); }}>Go Back To Admin Login</button>);

    }

    return (
        <div className="confirmation">
            {header}
            {sub_header}
            {button}
        </div>
    );
}

export default AdminLoginConfirmation;