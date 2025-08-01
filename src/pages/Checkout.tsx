
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest } from "../types/api-types";
import { responseToast } from "../utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);


const CheckoutForm = () => {

      const navigate = useNavigate()

      const stripe = useStripe()
      const elements = useElements()

      const dispatch = useDispatch()

      const { user } = useSelector((state: RootState) => state.userReducer)

      const {
            shippingInfo, cartItems, subtotal, tax, discount, shippingCharges, total, 
      } = useSelector((state: RootState) => state.cartReducer)

      const [isProcessing, setIsProcessing] = useState<boolean>(false)

      const [newOrder] = useNewOrderMutation()

      const submitHandler = async (e: FormEvent) => {
            e.preventDefault();
            if (!stripe || !elements) return;

            setIsProcessing(true);
            const orderData: NewOrderRequest = {
                  shippingCharges, shippingInfo, orderItems:cartItems,
                  subtotal, tax,
                  discount, total, user:user?._id!
            };

            const { paymentIntent, error } = await stripe.confirmPayment({
                  elements,
                  confirmParams: {
                        return_url: window.location.origin
                  },
                  redirect: "if_required"
            })

            if (error) {
                  setIsProcessing(false)
                  return toast.error(error.message || "Something Went Wrong");
            }

            if (paymentIntent.status === "succeeded") {
                  const res = await newOrder(orderData)
                  dispatch(resetCart())
                  responseToast(res, navigate , "/orders")
            }

            setIsProcessing(false)
      }
      return <div className="max-w-[400px] w-full m-auto">
            <form onSubmit={submitHandler} className="flex flex-col justify-start items-stretch gap-8">
                  <PaymentElement />
                  <button className="cursor-pointer p-4 bg-[rgb(0,104,136)] text-white rounded-md w-full font-medium text-base" type="submit" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Pay"}
                  </button>
            </form>
      </div>
}

const Checkout = () => {

      const location = useLocation();
      const clientSecret: string | undefined = location.state;

      console.log(clientSecret)

      if (!clientSecret) return <Navigate to={"/shipping"} />

      return (
            <Elements stripe={stripePromise} options={{
                  clientSecret,
            }} >
                  <CheckoutForm />
            </Elements >
      )
}

export default Checkout