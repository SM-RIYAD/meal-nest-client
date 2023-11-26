import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaArrowCircleRight } from "react-icons/fa";
const Checkoutform = ({ payment_price, payment_badge, plan }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (payment_price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: payment_price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, payment_price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    console.log("this is client secret", clientSecret);
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const userinfo = {
          email: user.email,
          badge: payment_badge,
        };
        axiosPublic
          .put(`/updateuserbadze`, userinfo, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
              Swal.fire({
                title: "Congratulations!",
                text: `You have got a ${payment_badge} badge!`,
                icon: "success",
                confirmButtonText: "Cool",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle errors if any
          });
      }
    }
  };

  return (
    <div className="" >
  

      <div className="flex lg:flex-row flex-col ">
      <div className="card  bg-transparent text-primary-content">
        <div className="card-body text-black">
          <div className="flex">
            <div className="space-y-4 ">
              {" "}
              <div>
              <h2 className="card-title text-2xl">{plan.name}</h2>
              <p className="text-red-500 text-4xl">{payment_price}$</p>

              </div>

              <div className="flex items-center gap-1">
                <FaArrowCircleRight className="" />
                <p className="text-gray-500 ">{plan.description}</p>
                
              </div>
              <div className="flex items-center gap-1">
                <FaArrowCircleRight className="" />
                <p className="text-gray-500 ">{plan.support}</p>
              </div>
              <div className="flex items-center gap-1">
                <FaArrowCircleRight className="" />
                <p className="text-gray-500 ">
                  Get {plan.mealsPerDay} meals perday
                </p>
              </div>
              <div className="flex items-center gap-1">
                <FaArrowCircleRight className="" />
                <p className="text-gray-500 ">
                  Get {plan.mealsPerDay} advanced bookings{" "}
                </p>
              </div>
            </div>
            {/* <div className=" ">


</div> */}
          </div>

         
          <div className="card-actions justify-end"></div>
        </div>
      </div>
<div className="lg:ms-auto ms-20  w-1/2  lg:w-1/4 ">
<img className="   w-full object-cover" src="https://www.onlygfx.com/wp-content/uploads/2022/04/blank-gold-badge-label-2.png" alt="" srcset="" />
<p className="text-xl font-bold text-red-400 text-center my-5">  Get a {plan.name} badge!</p>


</div>
      </div>
     
<h1 className="text-red-400 font-bold text-xl text-center MT-10">PAY FOR THE PURCHASE</h1>
      <form className="mt-5 mx-10" onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              className="btn btn-sm bg-red-400 text-white my-4"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && (
              <p className="text-green-600">
                {" "}
                Your transaction id: {transactionId}
              </p>
            )}
          </form>
    </div>
  );
};

export default Checkoutform;
