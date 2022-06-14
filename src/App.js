import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";

// NOTES
import InputBox from "./components/InputBox";

// PROJECT
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import DetailProduct from "./pages/Detail";

import UseEffectComponent from "./notes/useEffect";

function App() {
  const [isLocalStorageChecked, setisLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      const userLocalStorage = localStorage.getItem("userInfo");

      if (userLocalStorage) {
        // simpan ke global state
        const user = JSON.parse(userLocalStorage);
        const action = login(user);
        dispatch(action);
      }

      setisLocalStorageChecked(true);
    }, 200);
  }, []);

  if (isLocalStorageChecked) {
    return (
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* path variable */}
          <Route path="/products/:productId" element={<DetailProduct />} />
          <Route path="/note" element={<InputBox />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return <h1 style={{ textAlign: "center" }}>Checking Local Storage</h1>;
}
export default App;
