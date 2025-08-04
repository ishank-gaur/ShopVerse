import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <div className="app-container">
      <Navbar />
      <main className="app-body">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
    </AuthProvider>
  );
}


export default App;
