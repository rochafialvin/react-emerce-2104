import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import axiosInstance from "../../services/axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formState, setFormstate] = useState({
    keyword: "",
    category: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resGetProducts = await axiosInstance.get("/products");
      setProducts(resGetProducts.data);
      setFilteredProducts(resGetProducts.data);
    } catch (error) {
      alert("Terjadi kesalahan. Api udah dinyalain ?");
      console.log({ error });
    }
  };

  const renderProducts = () => {
    return filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const handleChange = (event) => {
    setFormstate({ ...formState, [event.target.name]: event.target.value });
  };

  const onFilterHandler = () => {
    // untuk search products berdasarkan nama dan category
    const filteredProducts = products.filter((product) => {
      const productName = product.productName.toLowerCase();
      const keywordName = formState.keyword.toLowerCase();
      return (
        productName.includes(keywordName) &&
        product.category.includes(formState.category)
      );
    });

    setFilteredProducts(filteredProducts);
  };

  const btnSearchHandler = () => {
    onFilterHandler();
  };

  const selectSortHandler = (event) => {
    // sorting products

    const sortBy = event.target.value;
    const tmpProducts = [...filteredProducts];

    // filteredProducts : A C B F E
    switch (sortBy) {
      case "az":
        tmpProducts.sort((a, b) => {
          if (a.productName < b.productName) {
            return -1;
          } else if (a.productName > b.productName) {
            return 1;
          } else {
            return 0;
          }
        });
        setFilteredProducts(tmpProducts);
        break;
      case "za":
        tmpProducts.sort((a, b) => {
          if (a.productName < b.productName) {
            return 1;
          } else if (a.productName > b.productName) {
            return -1;
          } else {
            return 0;
          }
        });
        setFilteredProducts(tmpProducts);
        break;
      case "lowPrice":
        tmpProducts.sort((a, b) => a.price - b.price);
        setFilteredProducts(tmpProducts);
        break;
      case "highPrice":
        tmpProducts.sort((a, b) => b.price - a.price);
        setFilteredProducts(tmpProducts);
        break;
      default:
        onFilterHandler();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          {/* Filter */}
          <div className="card">
            <div className="card-header">
              <strong>Filter products</strong>
            </div>
            <div className="card-body">
              <label>Product Name</label>
              <input
                name="keyword"
                type="text"
                className="form-control mb-3"
                onChange={handleChange}
              />
              <label>Product Category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">All Items</option>
                <option value="kaos">Kaos</option>
                <option value="celana">Celana</option>
                <option value="aksesoris">Aksesoris</option>
              </select>
              <button
                onClick={btnSearchHandler}
                className="btn btn-outline-primary mt-3 d-block w-100"
              >
                Search
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="card mt-4">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label className="mb-2">Sort by</label>
              <select
                name="sortBy"
                className="form-control"
                onChange={selectSortHandler}
              >
                <option value="">Default</option>
                <option value="lowPrice">Lowest Price</option>
                <option value="highPrice">Highest Price</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-9 d-flex flex-wrap ">{renderProducts()}</div>
      </div>
    </div>
  );
}

export default Home;
