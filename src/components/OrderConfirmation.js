import './Confirmation.css';

const OrderConfirmation = (props) => {
    let header = "";
    let sub_header = "";

    if (props.orderResult["requestType"] === "specialOrder") {
        header = (<h1>Thank you for your special order request!</h1>);
        sub_header = (<h3>Katie will reach out to you shortly via email for details.</h3>);
    } else if (props.orderResult["requestType"] === "question") {
        header = (<h1>Question sent!</h1>);
        sub_header = (<h3>Katie will reach out to you shortly with an answer.</h3>);
    } else {
        header = (<h1>Thank you for your order!</h1>);
        sub_header = (<h3>Confirmation number: #{props.orderResult["orderNumber"]}</h3>);
    }

    return (
        <div className="confirmation">
            {header}
            {sub_header}
            <button onClick={(e) => {props.setOrderResult(""); props.gotoHome(); }}>Go Back To Home</button>
        </div>
    );
}

export default OrderConfirmation;