import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";

// NOTES
import InputBox from "./components/InputBox";
import UseEffectComponent from "./notes/useEffect";
import UseStateComponent from "./notes/useState";

// PROJECT
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import DetailProduct from "./pages/Detail";
import Cart from "./pages/Cart";

function App() {
  const [isLocalStorageChecked, setisLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // string
    const userLocalStorage = localStorage.getItem("userInfo");

    // ada ga isinya ?
    if (userLocalStorage) {
      // ubah string menjadi object
      const user = JSON.parse(userLocalStorage);
      // objectnya dimasukkan ke action creator login
      // menghasilkan action --> { type: "auth/login", payload : user }
      const action = login(user);
      // kirim ke reducer
      dispatch(action);
    }

    setisLocalStorageChecked(true);
  }, []);

  if (isLocalStorageChecked) {
    return (
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          {/* path variable */}
          <Route path="/products/:productId" element={<DetailProduct />} />
          <Route path="/note" element={<UseStateComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return <h1 style={{ textAlign: "center" }}>Checking Local Storage</h1>;
}
export default App;
