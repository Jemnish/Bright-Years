import { styles } from "@/app/styles/styles";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: { _id: string; name: string };
  user: { _id: string; name: string; avatar?: string };
};

const CheckOutForm: React.FC<Props> = ({ setOpen, data, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: !loadUser });

  useEffect(() => {
    if (orderData) {
      // Notify via socket and redirect on order success
      socket.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${data.name}`,
        userId: user._id,
      });
      console.log("ok");
      setLoadUser(true);
      redirect(`/course-access/${data._id}`);
    }

    if (error) {
      if ("data" in error) {
        const apiError = error as any; // Adjust based on your API's error structure
        toast.error(apiError.data.message || "Something went wrong");
      }
    }
  }, [orderData, error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/course-access/${data._id}`, // Define your success URL
        },
      });

      if (error) {
        setMessage(error.message || "An unexpected error occurred.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        await createOrder({
          courseId: data._id,
          payment_info: paymentIntent,
        });
      }
    } catch (err) {
      setMessage("An error occurred while processing the payment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      {/* Authentication */}
      <LinkAuthenticationElement id="link-authentication-element" />

      {/* Payment Fields */}
      <PaymentElement id="payment-element" />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`${styles.button} mt-2 !h-[35px] disabled:opacity-50`}
      >
        {isLoading ? "Processing Payment..." : "Pay Now"}
      </button>

      {/* Error or Success Message */}
      {message && (
        <div id="payment-message" className="text-red-600 font-Poopins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
