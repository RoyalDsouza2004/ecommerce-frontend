import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";


const Cart = () => {

  const dispatch = useDispatch()

  const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer)

  const [coupenCode, setCoupenCode] = useState<string>('')
  const [isValidCoupenCode, setIsValidCoupenCode] = useState<boolean>(false)

  const incrementHandler = (cartItem: CartItem) => {

    if (cartItem.quantity >= cartItem.stock) return

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }))
  }

  const decrementHandler = (cartItem: CartItem) => {

    if (cartItem.quantity <= 1) return

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }))
  }
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId))
  }


  useEffect(() => {

    const { token, cancel } = axios.CancelToken.source()

    const timeOutID = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${coupenCode}`, {
        cancelToken: token
      })
        .then((res) => {
          dispatch(discountApplied(res.data.discount))
          setIsValidCoupenCode(true)
          dispatch(calculatePrice())
        }).catch(() => {
          dispatch(discountApplied(0))
          setIsValidCoupenCode(false)
          dispatch(calculatePrice())
        })
    }, 1000);

    return () => {
      clearTimeout(timeOutID)
      cancel()
      setIsValidCoupenCode(false)
    }
  }, [coupenCode])

  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])



  return (<>
    <h1 className="tracking-[2px] uppercase text-2xl font-light text-center">Cart</h1>
    <div className="py-8 px-16 flex justify-stretch items-start gap-16 h-[100vh-4rem] max-lg:flex-col-reverse max-lg:px-0 overflow-x-auto ">
      <main className="w-[70%] cartmain flex flex-col max-lg:w-full gap-2 ">
        {
          cartItems.length > 0 ? (
            cartItems.map((i, index) => (
              <CartItemCard incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler} key={index} cartItem={i} />
            ))
          ) : <p className="font-bold text-3xl">No Items added</p>


        }
      </main>
      <aside className="w-[30%] p-16 flex flex-col justify-center items-stretch gap-4 bg-gray-50 
   xl:sticky xl:top-24 max-lg:w-full max-lg:items-center max-lg:pl-12">

        <p className="text-base">Subtotal : ₹{subtotal}</p>
        <p className="text-base">Shipping Charges : ₹{shippingCharges}</p>
        <p className="text-base">Tax: ₹{tax}</p>
        <p className="text-base"> Discount: <em className="text-red-600"> - ₹{discount}</em> </p>
        <p className="font-bold text-base">Total : {total}</p>
        <input type="text" placeholder="Enter Coupen code here..." value={coupenCode} onChange={e => setCoupenCode(e.target.value)} className="focus:outline-none border border-lightblack p-4 rounded-md mt-8" />


        {
          coupenCode && (
            isValidCoupenCode ? <span className="text-green -mt-4 flex justify-center items-center gap-1">₹{discount} off using the <code className="font-extrabold">{coupenCode}</code></span> :
              <span className="text-red-600 font-bold flex gap-1 items-center -mt-4 justify-center">Invalid Coupen code <VscError /></span>
          )
        }
        {
          cartItems.length > 0 && <Link to={"/shipping"} className="bg-darkblue p-4 text-white flex justify-center items-center uppercase tracking-normal hover:opacity-80">Checkout</Link>
        }
      </aside>
    </div>
  </>
  )
}

export default Cart