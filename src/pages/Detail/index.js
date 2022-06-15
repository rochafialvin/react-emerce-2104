import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

function DetailProduct() {
  // params.productId --> gunakan untuk ambil data
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/products/${params.productId}`);
      setProduct(res.data);
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log(error);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = async () => {
    const { id, productImage, productName, price, description, category } =
      product;

    const cart = {
      productName,
      price,
      productImage,
      description,
      category,
      quantity,
      userId,
      productId: id,
    };

    const res = await axiosInstance.get("/cart", {
      params: { productId: id, userId },
    });

    const foundCart = res.data[0];

    if (foundCart) {
      // id dari foundCart dibuatkan alias yaitu foundCartId
      const { id: foundCartId, quantity: foundCartQuantity } = foundCart;
      const newQuantity = foundCartQuantity + quantity;
      await axiosInstance.patch(`/cart/${foundCartId}`, {
        quantity: newQuantity,
      });
      alert("Quantity berhasil di update");
    } else {
      await axiosInstance.post("/cart", cart);
      alert("Berhasil di tambahkan ke cart");
    }
  };

  const { productImage, productName, price, description } = product;
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6">
          <img style={{ width: "100%" }} src={productImage} alt="tulisan" />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center">
          <h4>{productName}</h4>
          <h5>Rp {price?.toLocaleString("id")}</h5>
          <p>{description}</p>
          <div className="d-flex flex-row align-items-center">
            <button
              disabled={quantity == 0}
              className="btn btn-primary"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <strong className="text-center mx-4">{quantity}</strong>
            <button className="btn btn-primary" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <button className="btn btn-success mt-3" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
