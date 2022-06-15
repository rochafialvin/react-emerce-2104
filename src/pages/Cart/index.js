import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Cart() {
  const userId = useSelector((state) => state.auth.id);

  if (!userId) return <Navigate to="/" replace />;

  return <div>Cart</div>;
}

export default Cart;
