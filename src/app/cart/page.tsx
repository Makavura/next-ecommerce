"use client";

import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";

const ShoppingCart = () => {
  const { cart } = useCart();

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        {cart?.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
