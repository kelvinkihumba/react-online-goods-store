import ProductList from "./ProductList";
import KatieImage from '../images/KatieMainPageImage.png';
import SimpleMap from './Map';

import './Main.css';

function LeftPane() {
    return (
        <div className="left-pane">
            <h2>HOW IT CAME TO "BEE"</h2>
            <img src={KatieImage} alt="Katie Tracy holding a basket of teas, baked goods, and other goodies" />
            <p>
                Hey y'all! My name is Katie and I'm a computer science student at EMU. One of the skills I've
                been able to hone during the pandemic is making jams and baked goods. My friends call me 
                grandma and I carry that energy with pride. I'm hoping that this little project of mine will
                allow me to share the products of my craft, and bring a little bit of coziness and happiness
                to those who experience it. Let me know what I can make for you!
            </p>
            <h2>WHERE ARE WE?</h2>
            <SimpleMap />
        </div>
    );
}

function RightPane(props) {
    return (
        <div className="right-pane">
            <h2>CONTACT US + HOW TO ORDER</h2>
            <p>How can we be of service?</p>
            <p>
                Check out our products near the top of the page. Send us a message to let us know
                what you'd like or if you have any questions. Payment is collected via Venmo,
                PayPal, or cash/check upon delivery.
            </p>
            <p>Gift Baskets require 3 days minimum advanced notice.</p>
            <p>Local delivery (up to 5 miles) included. Other delivery options:</p>
            <ul>
                <li>$10 for up to 15 miles</li>
                <li>$15 for up to 30 miles</li>
                <li>Pick-up is also available</li>
            </ul>
            <p>Shipping is available for some products. Just ask!</p>
            <button onClick={props.onClickSpecialOrder}>SPECIAL ORDER</button>

            <hr />

            <h2>RETURN/REFUND POLICY</h2>
            <p>No returns or refunds may be made on baked goods or gift baskets.</p>
            <p>
                Returns can be made within 30 days of purchase for dry goods. Refund will be issued,
                minus applicable transaction fees within 3 business days.
            </p>
            <button onClick={props.onClickQuestion}>QUESTION?</button>
        </div>
    );
}

function CenterPane(props) {
    return (
        <div className="center-pane">
            <ProductList products={props.products} />
        </div>
    );
}

function Main(props) {
    return (
        <div className="main">
            <LeftPane />
            <CenterPane products={props.products} setProducts={props.setProducts} navigate={props.navigate} />
            <RightPane onClickQuestion={props.onClickQuestion} onClickSpecialOrder={props.onClickSpecialOrder}/>
        </div>
    );
}

export default Main;