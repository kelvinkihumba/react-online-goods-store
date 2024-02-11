import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div className="footer">
            <p>©2021 by BIRD + BEE GOODS</p>
            <p>
                <a href="/question">Contact Us</a>
                <a href="https://www.instagram.com/_bird_and_bee_/"><FontAwesomeIcon icon={faInstagram} /></a>
            </p>
        </div>
    );
}

export default Footer;