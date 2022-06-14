import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

function DetailProduct() {
  // params.productId --> gunakan untuk ambil data
  const params = useParams();
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/products/${params.productId}`);
      setProduct(res.data);
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
            <button className="btn btn-primary ">-</button>
            <strong className="text-center mx-4">30</strong>
            <button className="btn btn-primary ">+</button>
          </div>
          <button className="btn btn-success mt-3">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
