import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import "./style.css";

function ProductCard({ product }) {
  const { id, productName, productImage, price } = product;
  return (
    <div className="card product-card w-25">
      <img src={productImage} alt="" />
      <div className="mt-2">
        <div>
          <h5>{productName}</h5>
          <span className="text-muted">{price}</span>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <Button
            className="mt-2 w-100"
            outline
            color="primary"
            tag={Link}
            to={`/products/${id}`}
          >
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
