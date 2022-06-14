import { useParams } from "react-router-dom";

function DetailProduct() {
  // params.productId --> gunakan untuk ambil data
  const params = useParams();
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6">
          <img
            style={{ width: "100%" }}
            src={
              "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/35986529ca3dc88d58695fe1396f909aaf0eea57_xxl-1.jpg"
            }
            alt="tulisan"
          />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center">
          <h4>Kaos Baja Hitam</h4>
          <h5>Rp 20.000</h5>
          <p>Kaos baja hitam pembela kebenaran</p>
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
