import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [isShowSummary, setIsShowSummary] = useState(false);
  const [cart, setCart] = useState([]);
  const [priceState, setPriceState] = useState({
    subTotal: 0,
    tax: 0,
    total: 0,
  });

  const [paymentState, setPaymentState] = useState({
    recipient: "",
    address: "",
    cash: 0,
  });

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get("/cart", {
        params: { userId },
      });

      const subTotal = data.reduce((a, b) => a + b.quantity * b.price, 0);
      const tax = subTotal * 0.05;
      const total = subTotal + tax;

      setCart(data);
      setPriceState({ subTotal, tax, total });
    } catch (error) {
      alert("Terjadi kesalahan saat mengambil cart");
    }
  };

  const renderCart = () => {
    return cart.map((c) => {
      const { id, productImage, productName, price, quantity } = c;
      return (
        <tr key={id}>
          <td className="align-middle">{productName}</td>
          <td className="align-middle">{price}</td>
          <td className="align-middle">
            <img src={productImage} alt="" style={{ height: "125px" }} />
          </td>
          <td className="align-middle">{quantity}</td>
          <td className="align-middle">{quantity * price}</td>
          <td className="align-middle">
            <button className="btn btn-outline-danger">Delete</button>
          </td>
        </tr>
      );
    });
  };

  const onCheckoutClick = () => {
    setIsShowSummary(true);
  };

  const handleChange = (event) => {
    setPaymentState({
      ...paymentState,
      [event.target.name]: event.target.value,
    });
  };

  const onPaymentClick = async () => {
    try {
      const current = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const year = current.getFullYear();
      const month = current.getMonth();
      const date = current.getDate();

      const transaction = {
        userId,
        address: paymentState.address,
        totalPayment: priceState.subTotal,
        recipientName: paymentState.recipient,
        transactionDate: {
          date,
          year,
          month: month + 1,
          hours: current.getHours(),
          minutes: current.getMinutes(),
          monthWord: months[month],
        },
        transactionItems: [...cart],
        invoiceNumber: `INV/${year}${month}${date}`,
      };

      // membuat object transaction
      await axiosInstance.post("/transactions", transaction);

      // hapus semua data di cart milik user
      for (const cardObj of cart) {
        await axiosInstance.delete(`/cart/${cardObj.id}`);
      }

      // replace : true membuat user tidak bisa kembali ke cart dengan cara menekan tombol back di browswer
      navigate("/", { replace: true });
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log(error);
    }
  };

  if (!userId) return <Navigate to="/" replace />;

  return (
    <div className="p-5 text-center">
      <h1>Cart</h1>
      <div className="row mt-5">
        <div className=" col-9 text-center">
          <table className="table">
            <thead>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </thead>
            <tbody>{renderCart()}</tbody>
            <tfoot className="bg-light">
              <tr>
                <td colSpan={6}>
                  {/* kalau isShowSummary bernilai false, tombolnya muncul */}
                  {!isShowSummary && (
                    <button
                      className="btn btn-outline-success"
                      onClick={onCheckoutClick}
                    >
                      Checkout
                    </button>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="col-3">
          {isShowSummary ? (
            <div className="card text-left">
              <div className="card-header">
                <strong>Order Summary</strong>
              </div>
              <div className="card-body">
                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                  <span className="font-weight-bold">Subtotal Price</span>
                  <span>Rp {priceState.subTotal}</span>
                </div>
                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                  <span className="font-weight-bold">Tax Fee (5%)</span>
                  <span>Rp {priceState.tax}</span>
                </div>
                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                  <span className="font-weight-bold">Total Price</span>
                  <span>Rp {priceState.total}</span>
                </div>
              </div>
              <div className="card-body border-top">
                <label htmlFor="recipientName">Recipient Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="recipient"
                  onChange={handleChange}
                />
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={handleChange}
                />
              </div>
              <div className="card-footer">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <input
                    name="cash"
                    className="form-control mx-1"
                    type="text"
                    onChange={handleChange}
                  />
                  <button
                    onClick={onPaymentClick}
                    className="btn btn-outline-success mx-1"
                    disabled={paymentState.cash < priceState.subTotal}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Cart;
