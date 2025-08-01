import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";

const Shipping = () => {


      const { cartItems , total } = useSelector((state: RootState) => state.cartReducer)

      const navigate = useNavigate();
      const dispatch = useDispatch()

      const [shippingInfo, setShippingInfo] = useState({
            address: "",
            city: "",
            state: "",
            country: "",
            pinCode: "",
      })

      const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
      };

         const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            dispatch(saveShippingInfo(shippingInfo))

            try {
                  const {data} = await axios.post(`${server}/api/v1/payment/create`,{
                        amount:total
                  } , {
                        headers:{
                              "Content-Type":"application/json"
                        }
                  })

                  navigate("/pay" ,{
                        state: data.clientSecret
                  })


            } catch (error) {
                  console.log(error)
                  toast.error("Something went wrong")
            }
         }

      useEffect(() => {
            if (cartItems.length <= 0) return navigate("/cart")
      }, [cartItems])


      return (
            <div className="flex justify-center items-center">
                  <button className="h-10 w-10 bg-lightblack text-white flex justify-center items-center fixed top-20 left-8 rounded-full shadow-md max-sm:top-16" onClick={() => navigate("/cart")}><BiArrowBack className=" transition-all hover:-translate-x-1" /></button>
                  <form onSubmit={submitHandler} className="max-w-md w-full flex flex-col justify-center items-stretch gap-8 p-8">
                        <h1 className="tracking-wide uppercase font-light text-xl m-4 text-center">shipping Address</h1>
                        <input type="text" placeholder="address....." name="address" value={shippingInfo.address} onChange={changeHandler} required className="input" />
                        <input type="text" placeholder="city....." name="city" value={shippingInfo.city} onChange={changeHandler} required className="input" />
                        <input type="text" placeholder="state....." name="state" value={shippingInfo.state} onChange={changeHandler} required className="input" />


                        <select name="country" required value={shippingInfo.country} onChange={changeHandler} className="input">
                              <option value="">Choose country</option>
                              <option value="india">India</option>
                        </select>

                        <input type="number" placeholder="pincode....." name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler} required className="input" />

                        <button type="submit" className="p-4 cursor-pointer bg-darkblue text-white rounded-md hover:opacity-80">Pay Now</button>
                  </form>
            </div>
      )
}

export default Shipping