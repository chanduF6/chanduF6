import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Background Video */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/videos/cooking.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay">

        {/* Hero Section */}
        <div className="hero">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Delicious Food Delivered
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Order your favorite food anytime, anywhere.
          </motion.p>

          {/* Veg Button */}
          <motion.button
            className="order-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/veg")}
          >
            🥦Veg Items
          </motion.button>

          {/* Nonveg Button */}
          <motion.button
            className="order-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/nonveg")}
          >
           🍗 Nonveg Items
          </motion.button>

          {/* Desserts Button */}
          <motion.button
            className="order-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/desserts")}
          >
            Desserts
          </motion.button>

        </div>

      </div>
    </div>
  );
}

export default Home;