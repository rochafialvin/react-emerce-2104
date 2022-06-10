import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import axiosInstance from "../../services/axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, []);

  const fetchProducts = async () => {
    try {
      const resGetProducts = await axiosInstance.get("/products");
      setProducts(resGetProducts.data);
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log({ error });
    }
  };

  const renderProducts = () => {
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 bg-success ">
          <h1>filtering</h1>
        </div>
        <div className="col-9 d-flex flex-wrap ">{renderProducts()}</div>
      </div>
    </div>
  );
}

export default Home;
