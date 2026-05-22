import React, { useState } from "react";
import "./Cart.css";

import { useDispatch, useSelector } from "react-redux";

import {
  removeCart,
  clearCart,
  incrementQty,
  decrementQty,
} from "./cartSlice";

import { addOrder } from "./ordersSlice";

import {
  applyCoupon,
  resetCoupon,
} from "./cuponSlice";

import confetti from "canvas-confetti";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { QRCode } from "react-qr-code";

import Swal from "sweetalert2";

import emailjs from "@emailjs/browser";

function Cart() {

  /* ================= CART ITEMS ================= */

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  /* ================= COUPON DETAILS ================= */

  const couponDetails = useSelector(
    (state) => state.couponDetails || {}
  );

  const discount =
    couponDetails.discount || 0;

  const dispatch = useDispatch();

  /* ================= STATES ================= */

  const [discountPercent, setDiscountPercent] =
    useState(0);

  const [coupon, setCoupon] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  /* ================= TOTAL ================= */

  const totalAmount = cartItems.reduce(
    (t, item) =>
      t + item.price * item.quantity,
    0
  );

  const finalDiscount =
    discountPercent + discount;

  const couponDiscountAmount =
    (totalAmount * finalDiscount) / 100;

  const finalAmountAfterCoupon =
    totalAmount - couponDiscountAmount;

  const taxAmount =
    (finalAmountAfterCoupon * 18) / 100;

  const netAmount =
    finalAmountAfterCoupon + taxAmount;

  /* ================= CONFETTI ================= */

  const fireConfetti = () => {

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  /* ================= APPLY COUPON ================= */

  const handleApplyCoupon = () => {

    if (!coupon) {

      toast.error("Enter Coupon Code");

      return;
    }

    dispatch(applyCoupon(coupon));

    Swal.fire({
      icon: "success",
      title: "Coupon Applied 🎉",
      text: `${coupon} applied successfully!`,
      timer: 1500,
      showConfirmButton: false,
    });

    fireConfetti();

    toast.success(
      `🎉 Coupon ${coupon} applied!`
    );
  };

  /* ================= CLEAR CART ================= */

  const handleClearCart = () => {

    Swal.fire({
      title: "Clear Cart?",
      text: "All items will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Clear",
    }).then((result) => {

      if (result.isConfirmed) {

        dispatch(clearCart());

        dispatch(resetCoupon());

        setDiscountPercent(0);

        setCoupon("");

        setPaymentMethod("");

        setCustomerEmail("");

        toast.error("🛒 Cart Cleared");

        fireConfetti();
      }
    });
  };

  /* ================= CHECKOUT ================= */

  const handleCheckout = () => {

    if (cartItems.length === 0) {

      toast.error("Cart is empty");

      return;
    }

    if (!customerEmail) {

      toast.error("Please Enter Email");

      return;
    }

    /* ================= SAVE ORDER ================= */

    const newOrder = {

      id: Date.now(),

      items: cartItems,

      total: netAmount.toFixed(2),

      date: new Date().toLocaleString(),
    };

    dispatch(addOrder(newOrder));

    /* ================= EMAIL ================= */

    const templateParams = {

      order_id:
        "ORDER-" +
        Math.floor(Math.random() * 100000),

      orders: cartItems.map((item) => ({

        name: item.name,

        price: (
          item.price * item.quantity
        ).toFixed(2),

        units: item.quantity,
      })),

      cost: {

        shipping: 50,

        tax: taxAmount.toFixed(2),

        total: netAmount.toFixed(2),
      },

      email: customerEmail,
    };

    emailjs
      .send(
        "service_pjs8bxp",
        "template_fhphcfv",
        templateParams,
        "DUT0puGMdR5ORoRzl"
      )

      .then(() => {

        toast.success(
          "✅ Order Placed & Email Sent"
        );

        dispatch(clearCart());

        dispatch(resetCoupon());

        fireConfetti();
      })

      .catch((error) => {

        console.log(error);

        toast.error(
          "❌ Email Sending Failed"
        );
      });
  };

  return (

    <div className="cart-page">

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <div className="cart-left">

        <h2>
          Your Cart
          ({cartItems.length} items)
        </h2>

        {/* ================= EMPTY CART ================= */}

        {cartItems.length === 0 ? (

          <p className="empty-msg">
            Your cart is empty
          </p>

        ) : (

          <>

            {/* ================= CART ITEMS ================= */}

            {cartItems.map(
              (item, index) => (

                <div
                  className="cart-row"
                  key={item.id || index}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-img"
                  />

                  <div className="cart-info">

                    <h3>{item.name}</h3>

                    <div className="qty-box">

                      <button
                        onClick={() =>
                          dispatch(
                            decrementQty(
                              item.id
                            )
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(
                            incrementQty(
                              item.id
                            )
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <div className="cart-price">

                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => {

                      dispatch(
                        removeCart(item.id)
                      );

                      toast.error(
                        `${item.name} removed`
                      );

                      fireConfetti();
                    }}
                  >
                    Remove
                  </button>

                </div>
              )
            )}

            {/* ================= DISCOUNT ================= */}

            <div className="discount-buttons">

              <button
                onClick={() =>
                  setDiscountPercent(10)
                }
              >
                10% Discount
              </button>

              <button
                onClick={() =>
                  setDiscountPercent(20)
                }
              >
                20% Discount
              </button>

              <button
                onClick={() =>
                  setDiscountPercent(30)
                }
              >
                30% Discount
              </button>

            </div>

            {/* ================= COUPON ================= */}

            <div className="coupon-box">

              <input
                type="text"
                placeholder="Enter Coupon"
                value={coupon}
                onChange={(e) =>
                  setCoupon(
                    e.target.value
                  )
                }
              />

              <button
                onClick={
                  handleApplyCoupon
                }
              >
                Apply
              </button>

            </div>

            {/* ================= BILL SUMMARY ================= */}

            <div className="bill-box">

              <h3>
                Bill Summary
              </h3>

              <p>
                Total Amount:
                ₹
                {totalAmount.toFixed(
                  2
                )}
              </p>

              <p>
                Discount (
                {finalDiscount}%):
                -₹
                {couponDiscountAmount.toFixed(
                  2
                )}
              </p>

              <p>
                After Discount:
                ₹
                {finalAmountAfterCoupon.toFixed(
                  2
                )}
              </p>

              <p>
                Tax (18%):
                ₹
                {taxAmount.toFixed(
                  2
                )}
              </p>

              <hr />

              <h2>
                Net Amount:
                ₹
                {netAmount.toFixed(
                  2
                )}
              </h2>

            </div>

            {/* ================= EMAIL ================= */}

            <div className="email-box">

              <label>
                📧 Enter Gmail
              </label>

              <input
                type="email"
                value={customerEmail}
                onChange={(e) =>
                  setCustomerEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
              />

            </div>
            <button onClick={handleCheckout}>Checkout & Send Email</button>

            {/* ================= PAYMENT METHOD ================= */}

            <div className="payment-method">

              <h3>
                💳 Select Payment Method
              </h3>

              <button
                onClick={() =>
                  setPaymentMethod(
                    "qr"
                  )
                }
              >
                📱 QR Code
              </button>

              <button
                onClick={() =>
                  setPaymentMethod(
                    "card"
                  )
                }
              >
                💳 Card
              </button>

            </div>

            {/* ================= QR PAYMENT ================= */}

            {paymentMethod ===
              "qr" && (

              <div className="qr-section">

                <h3>
                  Scan QR Code to Pay
                </h3>

                <h2>
                  ₹
                  {netAmount.toFixed(
                    2
                  )}
                </h2>

                <QRCode
                  size={220}
                  value={`upi://pay?pa=9014010049@ptsbi&pn=ChanduStore&am=${netAmount.toFixed(
                    2
                  )}&cu=INR`}
                />

                <p>
                  UPI ID:
                  9014010049@ptsbi
                </p>

                <button
                  className="pay-btn"
                  onClick={() => {

                    Swal.fire({
                      title:
                        "Payment Successful 🎉",

                      text:
                        `Paid ₹${netAmount.toFixed(
                          2
                        )}`,

                      icon:
                        "success",

                      timer: 2000,

                      showConfirmButton:
                        false,
                    });

                    toast.success(
                      "Payment Completed ✅"
                    );

                    fireConfetti();

                    handleCheckout();
                  }}
                >
                  Confirm Payment
                </button>

              </div>
            )}

            {/* ================= CARD PAYMENT ================= */}

            {paymentMethod ===
              "card" && (

              <div className="card-section">

                <h3>
                  💳 Card Payment
                </h3>

                <input
                  type="text"
                  placeholder="Card Number"
                />

                <input
                  type="text"
                  placeholder="Card Holder Name"
                />

                <div className="card-row">

                  <input
                    type="text"
                    placeholder="MM/YY"
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                  />

                </div>

                <button
                  className="pay-btn"
                  onClick={() => {

                    Swal.fire({
                      title:
                        "Payment Successful 🎉",

                      text:
                        `Paid ₹${netAmount.toFixed(
                          2
                        )}`,

                      icon:
                        "success",

                      timer: 2000,

                      showConfirmButton:
                        false,
                    });

                    toast.success(
                      "Payment Completed ✅"
                    );

                    fireConfetti();

                    handleCheckout();
                  }}
                >
                  Pay ₹
                  {netAmount.toFixed(
                    2
                  )}
                </button>

              </div>
            )}

            {/* ================= CLEAR CART ================= */}

            <button
              className="clear-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

          </>
        )}

      </div>

    </div>
  );
}

export default Cart;