import { useState } from 'react';
import './Home.css';
import productData from './productData';
import { useCart } from '../context/CartContext'; // Make sure path is correct

const Home = () => {
  const [quantities, setQuantities] = useState({});
  const { addToCart, removeFromCart, updateQuantity } = useCart(); // Extend as needed

  const handleIncrement = (id) => {
    const product = productData.find((p) => p.id === id);
    if (!product) return;

    setQuantities((prev) => {
      const newQty = (prev[id] || 0) + 1;
      addToCart({ ...product, quantity: 1 }); // Always adds +1
      return { ...prev, [id]: newQty };
    });
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(currentQty - 1, 0);

      if (newQty === 0) {
        removeFromCart(id); // Remove completely if quantity is 0
      } else {
        updateQuantity(id, newQty); // Optional: Adjust quantity in cart
      }

      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="home-page">
      <h1 className="page-title">Featured Products</h1>
      <div className="product-grid">
        {productData.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(product.id)}>-</button>
              <span>{quantities[product.id] || 0}</span>
              <button onClick={() => handleIncrement(product.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
