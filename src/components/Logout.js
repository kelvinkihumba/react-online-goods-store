import './Confirmation.css';

const Logout = (props) => {
    let header = (<h1>See you next time!</h1>);
    let button = (<button onClick={(e) => {props.gotoLogin(); }}>Go Back To Login</button>);

    return (
        <div className="confirmation">
            {header}
            {button}
        </div>
    );
}

export default Logout;