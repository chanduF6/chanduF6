import React from "react";

import { useSelector } from "react-redux";

function Orders() {

  // ✅ Correct selector
  const orders = useSelector(
    (state) => state.orders.items
  );

  return (
    <div>

      <h1>Order History</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (

          <div
            key={order.id}
            style={{
              border: "1px solid gray",
              margin: "20px",
              padding: "20px",
            }}
          >

            <h3>Order ID : {order.id}</h3>

            <p>Date : {order.date}</p>

            <p>Total : ₹ {order.total}</p>

            <h3>Items :</h3>

            {order.items.map((item) => (
              <div
                key={item.id}
                style={{
                  marginLeft: "20px",
                }}
              >

                <p>{item.name}</p>

                <p>Qty : {item.quantity}</p>

                <p>Price : ₹ {item.price}</p>

              </div>
            ))}

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;