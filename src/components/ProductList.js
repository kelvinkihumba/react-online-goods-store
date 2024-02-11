import {useNavigate} from 'react-router-dom';
import "./ProductList.css";

function ProductList(props) {
    return (
        <div className="product-list">
            {props.products.map(p => +p.available_for_sale ? <ProductListItem product={p} key={p.product_id} /> : null)}
        </div>
    );
}

function ProductListItem(props) {
    const imgUrl = "http://134.122.79.252/product_images/" + props.product.product_image;
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = '/product_' + props.product.product_id; 
        navigate(path);
    }

    return (
      <div className="product-list-item">
            <img src={imgUrl} alt={props.product.product_name} onClick={routeChange} />
            <p>{props.product.product_name}</p>
            <p>${props.product.price}</p>
      </div>
    );
}

export default ProductList;