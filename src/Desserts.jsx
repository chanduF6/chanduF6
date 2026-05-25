import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

/* ===== TOASTIFY ===== */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ===== SWEETALERT2 ===== */
import Swal from "sweetalert2";

/* ===== CANVAS CONFETTI ===== */
import confetti from "canvas-confetti";

function Desserts() {
  const dispatch = useDispatch();

  const dessertItems = [{
    id:"51",
      name: "Chocolate Cake",
      price: 120,
      description: "Soft and creamy chocolate cake",
      image: "/Desserts/Chocolate Cake.jpg"
    },
    {
      id:"52",
      name: "Ice Cream",
      price: 80,
      description: "Chilled creamy ice cream",
      image: "/Desserts/Ice Cream.jpg"
    },
    {
      id:"53",
      name: "Gulab Jamun",
      price: 70,
      description: "Sweet milk balls dipped in sugar syrup",
      image: "/Desserts/Gulab Jamun.jpg"
    },
    {
      id:"54",
      name: "Rasgulla",
      price: 75,
      description: "Soft sponge balls in sugar syrup",
      image: "/Desserts/Rasgulla.jpg"
    },
    {
      id:"55",
      name: "Brownie",
      price: 90,
      description: "Rich chocolate brownie",
      image: "/Desserts/Brownie.jpg"
    },
    {
      id:"56",
      name: "Cupcake",
      price: 60,
      description: "Mini sweet cake with cream topping",
      image: "/Desserts/Cupcake.jpg"
    },
    {
      id:"57",
      name: "Donut",
      price: 50,
      description: "Sweet fried dough with toppings",
      image: "/Desserts/Donut.jpg"
    },
    {
      id:"58",
      name: "Cheesecake",
      price: 140,
      description: "Creamy cheese dessert",
      image: "/Desserts/Cheesecake.jpg"
    },
    {
      id:"59",
      name: "Fruit Salad",
      price: 100,
      description: "Fresh mixed fruits with cream",
      image: "/Desserts/Fruit Salad.jpg"
    },
    {
      id:"60",
      name: "Kheer",
      price: 80,
      description: "Sweet rice pudding with dry fruits",
      image: "/Desserts/Kheer.jpg"
    },
    {
      id:"61",
      name: "Ladoo",
      price: 60,
      description: "Traditional sweet balls",
      image: "/Desserts/Ladoo.jpg"
    },
    {
      id:"62",
      name: "Jalebi",
      price: 70,
      description: "Crispy sweet spirals in sugar syrup",
      image: "/Desserts/Jalebi.jpg"
    },
    {
     id:"63", 
      name: "Pudding",
      price: 90,
      description: "Soft creamy pudding",
      image: "/Desserts/Pudding.jpg"
    },
    {
     id:"64", 
      name: "Milkshake",
      price: 110,
      description: "Sweet chilled milkshake",
      image: "https://cdn-icons-png.flaticon.com/512/2405/2405479.png"
    },
    {
      id:"65",
      name: "Falooda",
      price: 130,
      description: "Sweet dessert drink with ice cream",
      image: "https://cdn-icons-png.flaticon.com/512/685/685352.png"
    },
    {
      id:"66",
      name: "Mysore Pak",
      price: 90,
      description: "Traditional sweet made with gram flour",
      image: "/Desserts/Mysore Pak.jpg"
    },
    {
      id:"67",
      name: "Carrot Halwa",
      price: 85,
      description: "Sweet dish made with ghee and sugar",
      image: "/Desserts/Carrot Halwa.jpg"
    },
    {
      id:"68",
      name: "Kulfi",
      price: 100,
      description: "Traditional Indian ice cream",
      image: "/Desserts/Kulfi.jpg"
    },
    {
      id:"69",
      name: "Macaron",
      price: 150,
      description: "French sweet cookie dessert",
      image: "/Desserts/Macaron.jpg"
    },
    {
      id:"70",
      name: "Tiramisu",
      price: 180,
      description: "Italian coffee-flavored dessert",
      image: "/Desserts/Tiramisu.jpg"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = dessertItems.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(
    dessertItems.length / itemsPerPage
  );

  /* ===== ADD TO CART ===== */
  const handleAddToCart = (item) => {
    Swal.fire({
      title: "Add to Cart?",
      text: `Do you want to add ${item.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addToCart(item));

        /* ===== TOASTIFY ===== */
        toast.success(`${item.name} added to cart!`);

        /* ===== SUCCESS ALERT ===== */
        Swal.fire({
          title: "Added!",
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
      } else {
        toast.error("Item not added");
      }
    });
  };

  return (
    <>
      <h1>Desserts</h1>

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

export default Desserts;