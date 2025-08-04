import { useCart } from '../context/CartContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import cartImage from '../assets/cart.svg'; // Illustration image

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleIncrement = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item) updateQuantity(id, item.quantity + 1);
  };

  const handleDecrement = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    alert('🎉 Order placed successfully!');
    clearCart();
    navigate('/home');
  };

  return (
    <div className="cart-container">
      <div className="cart-image">
        <img src={cartImage} alt="Cart Illustration" />
      </div>

      <div className="cart-content">
        <h2>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>

                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item.id)}>+</button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{totalAmount}</h3>
              <button className="place-order-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
