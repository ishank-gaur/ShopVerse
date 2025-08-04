import axios from 'axios';

export const BASE_URL = "http://localhost:8080";

// Get token from localStorage (optional helper)
const getToken = () => localStorage.getItem('accessToken');

// Set Authorization header if token exists
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ------------------ AUTH ------------------

// Signup: POST /users
export const signupUser = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Signup failed';
  }
};

// Login: POST /users/login
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/login`, 
      { email, password }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true, // optional: needed if you're using cookies
      }
    );
    return res.data;
  } catch (err) {
    // Log the full error for debugging
    console.error("Login error:", err);

    // If server responded
    if (err.response) {
      const contentType = err.response.headers['content-type'];

      if (contentType && contentType.includes('application/json')) {
        throw err.response.data; // valid JSON error object from backend
      } else {
        throw 'Server error: returned non-JSON data'; // likely HTML or plain text
      }
    } else {
      // No response received (e.g. network or CORS error)
      throw 'Network or server error';
    }
  }
};


// Refresh Token: POST /users/refresh
export const refreshToken = async () => {
  try {
    const token = localStorage.getItem('refreshToken');
    const res = await axios.post(`${BASE_URL}/users/refresh`, { token });
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Token refresh failed';
  }
};

// ------------------ PUBLIC ------------------

// GET /items
export const fetchAllItems = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/items`);
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Fetching items failed';
  }
};

// GET /users
export const fetchAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Fetching users failed';
  }
};

// ------------------ AUTH-PROTECTED ------------------

// POST /carts
export const addToCart = async (cartData) => {
  try {
    const res = await axios.post(`${BASE_URL}/carts`, cartData, authHeader());
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Add to cart failed';
  }
};

// GET /carts
export const getCartItems = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/carts`, authHeader());
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Fetching cart failed';
  }
};

// POST /orders
export const placeOrder = async (orderData) => {
  try {
    const res = await axios.post(`${BASE_URL}/orders`, orderData, authHeader());
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Order failed';
  }
};

// GET /orders
export const getOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/orders`, authHeader());
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Fetching orders failed';
  }
};
