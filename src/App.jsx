import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./Home";
import Nonveg from "./Nonveg";
import Veg from "./Veg";
import Desserts from "./Desserts";
import Cart from "./Cart";
import Orders from "./Orders";
import Register from "./Register";
import Login from "./Login";
import About from "./About";
import Contact from "./Contact";

import "./Veg.css";
import "./App.css";
import "./Home.css";

function App() {
  // Redux cart items
  const items = useSelector((state) => state.cart.items);

  // Total quantity in cart
  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  // Logged in user
  let user =
    JSON.parse(localStorage.getItem("loggedInUser"));

  // Logout function
  let logout = () => {
    localStorage.removeItem("loggedInUser");

    
    window.location.reload();
  }

  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/">Home</Link>

        <Link to="/nonveg">Nonveg</Link>

        <Link to="/veg">Veg</Link>

        <Link to="/desserts">Desserts</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        <Link to="/orders">Orders</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact Us</Link>

        {user ? (
          <>
            <span className="welcome-text">
              Welcome, {user.name}!
            </span>

            <button
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          
            <Link to="/login">Login</Link> 
        )}
          <Link to="/register">Register</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/nonveg" element={<Nonveg />} />

        <Route path="/veg" element={<Veg />} />

        <Route path="/desserts" element={<Desserts />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;