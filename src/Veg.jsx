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

function Veg() {
  const dispatch = useDispatch();

  const vegitems = [
    {
      id:"1",
      name: "Paneer Butter Masala",
      price: 180,
      description: "Soft paneer cooked in rich butter gravy",
      image: "/veg/Paneer Butter Masala.jpg"
    },
    {
      id:"2",
      name: "Veg Biryani",
      price: 150,
      description: "Aromatic rice cooked with mixed vegetables",
      image: "/veg/Veg Biryani.jpg"
    },
    {
      id:"3",
      name: "Mushroom Curry",
      price: 170,
      description: "Fresh mushrooms cooked in spicy gravy",
      image: "/veg/Mushroom Curry.jpg"
    },
    {
      id:"4",
      name: "Aloo Gobi",
      price: 140,
      description: "Potato and cauliflower cooked with spices",
      image: "/veg/Aloo Gobi.jpg"
    },
    {
      id:"5",
      name: "Palak Paneer",
      price: 190,
      description: "Paneer cooked in spinach gravy",
      image: "/veg/Palak Paneer.jpg"
    },
    {
      id:"6",
      name: "Dal Tadka",
      price: 120,
      description: "Yellow dal tempered with spices",
      image: "/veg/Dal Tadka.jpg"
    },
    {
      id:"7",
      name: "Paneer Tikka",
      price: 200,
      description: "Grilled paneer cubes with spices",
      image: "/veg/Paneer Tikka.jpg"
    },
    {
      id:"8",
      name: "Veg Fried Rice",
      price: 140,
      description: "Fried rice mixed with vegetables",
      image: "/veg/Veg Fried Rice.jpg"
    },
    {
      id:"9",
      name: "Gobi Manchurian",
      price: 160,
      description: "Crispy cauliflower in spicy sauce",
      image: "/veg/Gobi Manchurian.jpg"
    },
    {
      id:"10",
      name: "Mixed Veg Curry",
      price: 150,
      description: "Fresh vegetables cooked in rich curry",
      image: "/veg/Mix Veg Curry.jpg"
    },
    {
      id:"11",
      name: "Chole Bhature",
      price: 130,
      description: "Spicy chickpeas served with bhature",
      image: "/veg/Chole Bhature.jpg"
    },
    {
      id:"12",
      name: "Veg Noodles",
      price: 140,
      description: "Noodles mixed with vegetables",
      image: "/veg/Veg Noodles.jpg"
    },
    {
      id:"13",
      name: "Tomato Rice",
      price: 110,
      description: "Rice cooked with tomato masala",
      image: "/veg/Tomato Rice.jpg"
    },
    {
      id:"14",
      name: "Curd Rice",
      price: 90,
      description: "Rice mixed with curd and seasoning",
      image: "/veg/Curd Rice.jpg"
    },
    {
      id:"15",
      name: "Kaju Curry",
      price: 210,
      description: "Cashew nuts cooked in rich gravy",
      image: "/veg/Kaju Curry.jpg"
    },
    {
      id:"16",
      name: "Masala Dosa",
      price: 80,
      description: "Crispy dosa with potato filling",
      image: "/veg/Masala Dosa.jpg"
    },
    {
      id:"17",
      name: "Idli Sambar",
      price: 70,
      description: "Soft idlis served with sambar",
      image: "/veg/IdliSambar.jpg"
    },
    {
      id:"18",
      name: "Veg Pulao",
      price: 130,
      description: "Rice cooked with vegetables and spices",
      image: "/veg/Veg Pulao.jpg"
    },
    {
      id:"19",
      name: "Jeera Rice",
      price: 100,
      description: "Rice flavored with cumin seeds",
      image: "/veg/Jeera Rice.jpg"
    },
    {
      id:"20",
      name: "Veg Burger",
      price: 120,
      description: "Burger stuffed with vegetable patty",
      image: "/veg/Veg Burger.jpg"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(vegitems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = vegitems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ===== ADD TO CART FUNCTION ===== */
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));

    /* ===== TOASTIFY ===== */
    toast.success(`${item.name} added to cart!`);

    /* ===== SWEETALERT ===== */
    Swal.fire({
      title: "Added to Cart!",
      text: `${item.name} added successfully`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });

    /* ===== CONFETTI ===== */
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const vegList = currentItems.map((item) => (
    <li key={item.name}>
      <img src={item.image} alt={item.name} className="veg-img" />

      <h3>{item.name}</h3>

      <p>Price: ₹{item.price}</p>

      <p>{item.description}</p>

      <button onClick={() => handleAddToCart(item)}>
        ADD TO CART
      </button>
    </li>
  ));

  return (
    <>
      <h1>🥦Vegetarian Items</h1>

      <ol>{vegList}</ol>

      {/* ===== PAGINATION ===== */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
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
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Veg;