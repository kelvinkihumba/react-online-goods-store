import {useNavigate} from 'react-router-dom';
import $ from "jquery";
import './FormPage.css';

const Question = (props) => {
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
                props.setOrderResult(data);
                navigate('/order_confirmation');
            },
            failure() {
                props.setOrderResult("failed to send email");
                navigate('/order_confirmation');
            }
        });
    };
    return (
        <div className="question">
            <h1>Question</h1>
            <form className="form-page"
                action="http://134.122.79.252/PHP/submit_question.php"
                method="post"
                onSubmit={(event) => handleSubmit(event)}
            >
                <label htmlFor="name">Name</label>
                <input name="name" type="text" required placeholder="Enter your name" />

                <label htmlFor="email">Email</label>
                <input name="email" type="email" required placeholder="email@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

                <label htmlFor="subject">Subject</label>
                <input name="subject" required type="text" placeholder="Enter a subject" />

                <label htmlFor="message">Message</label>
                <textarea name="message" type="text" required placeholder="Type your message here..." rows="6"></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Question;