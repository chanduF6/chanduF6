import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

/* ===== TOASTIFY ===== */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ===== SWEETALERT ===== */
import Swal from "sweetalert2";

/* ===== CANVAS CONFETTI ===== */
import confetti from "canvas-confetti";

function NonVeg() {
  const dispatch = useDispatch();

  const nonvegitems = [
    {
      id:"31",
      name: "Chicken Biryani",
      price: 180,
      description: "Aromatic rice with spicy chicken pieces",
      image: "/Nonveg/Chicken Biryan.jpg",
    },
    {
      id:"32",
      name: "Mutton Curry",
      price: 220,
      description: "Tender mutton cooked in spicy gravy",
      image: "/Nonveg/Mutton Curry.jpg",
    },
    {
      id:"33",
      name: "Fish Curry",
      price: 170,
      description: "Fresh fish cooked in tangy gravy",
      image: "/Nonveg/Fish Curry.jpg",
    },
    {
      id:"34",
      name: "Chicken Fry",
      price: 160,
      description: "Spicy fried chicken pieces",
      image: "/Nonveg/Chicken Fry.jpg",
    },
    {
      id:"35",
      name: "Prawn Masala",
      price: 200,
      description: "Prawns cooked with rich masala",
      image: "/Nonveg/Prawn Masala.jpg",
    },
    { 
      id:"36",
      name: "Egg Curry",
      price: 120,
      description: "Boiled eggs cooked in spicy gravy",
      image: "/Nonveg/Egg Curry.jpg",
    },
    {
      id:"37",
      name: "Chicken Tikka",
      price: 190,
      description: "Grilled chicken cubes with spices",
      image: "/Nonveg/Chicken Tikka.jpg",
    },
    {
      id:"38",
      name: "Mutton Biryani",
      price: 230,
      description: "Flavorful rice with mutton pieces",
      image: "/Nonveg/Mutton Biryani.jpg",
    },
    {
      id:"39",
      name: "Fish Fry",
      price: 180,
      description: "Crispy fried fish",
      image: "/Nonveg/Fish Fry.jpg",
    },
    {
      id:"40",
      name: "Chicken Curry",
      price: 150,
      description: "Traditional chicken curry",
      image: "/Nonveg/Chicken Curry.jpg",
    },
    {
      id:"41",
      name: "Prawn Biryani",
      price: 210,
      description: "Rice cooked with spicy prawns",
      image: "/Nonveg/Prawn Biryani.jpg",
    },
    {
      id:"42",
      name: "Egg Biryani",
      price: 140,
      description: "Biryani made with boiled eggs",
      image: "/Nonveg/Egg Biryani.jpg",
    },
    {
      id:"43",
      name: "Chicken Lollipop",
      price: 170,
      description: "Crispy chicken wings",
      image: "/Nonveg/Chicken Lollipop.jpg",
    },
    {
      id:"44",
      name: "Mutton Fry",
      price: 240,
      description: "Dry spicy mutton fry",
      image: "/Nonveg/Mutton Fry.jpg",
    },
    {
      id:"45",
      name: "Crab Curry",
      price: 250,
      description: "Spicy crab curry",
      image: "/Nonveg/Crab Curry.jpg",
    },
    {
      id:"46",
      name: "Chicken 65",
      price: 160,
      description: "Popular spicy fried chicken starter",
      image: "/Nonveg/Chicken 65.webp",
    },
    {
      id:"47",
      name: "Keema Curry",
      price: 190,
      description: "Minced meat cooked with spices",
      image: "/Nonveg/Keema Curry.webp",
    },
    {
      id:"48",
      name: "Tandoori Chicken",
      price: 220,
      description: "Chicken roasted in tandoor",
      image: "/Nonveg/Tandoori Chicken.jpg",
    },
    {
      id:"49",
      name: "Paya Soup",
      price: 130,
      description: "Traditional mutton leg soup",
      image: "/Nonveg/Paya Soup.webp",
    },
    {
      id:"50",
      name: "Chicken Noodles",
      price: 140,
      description: "Noodles mixed with chicken pieces",
      image: "/Nonveg/Chicken Noodles.jpg",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = nonvegitems.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(nonvegitems.length / itemsPerPage);

  /* ===== ADD TO CART ===== */
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));

    /* ===== TOASTIFY ===== */
    toast.success(`${item.name} added to cart!`);

    /* ===== SWEET ALERT ===== */
    Swal.fire({
      title: "Added to Cart!",
      text: `${item.name} added successfully`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    /* ===== CONFETTI ===== */
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <>
      <h1>🍗Non-Vegetarian Items</h1>

      <ol>
        {currentItems.map((item) => (
          <li key={item.name}>
            <img
              src={item.image}
              alt={item.name}
              className="veg-img"
            />

            <h3>{item.name}</h3>

            <p>Price: ₹{item.price}</p>

            <p>{item.description}</p>

            <button onClick={() => handleAddToCart(item)}>
              ADD TO CART
            </button>
          </li>
        ))}
      </ol>

      {/* ===== PAGINATION ===== */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* ===== TOAST CONTAINER ===== */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  );
}

export default NonVeg;