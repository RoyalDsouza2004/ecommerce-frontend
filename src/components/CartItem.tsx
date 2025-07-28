import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";


type CartItemProps = {
      cartItem : CartItem;
      incrementHandler:(cartItem:CartItem) => void,
      decrementHandler:(cartItem:CartItem) => void,
      removeHandler:(id:string) => void,
    };

const CartItems = ({cartItem , incrementHandler , decrementHandler , removeHandler} :CartItemProps) => {
      const {photo , productId , name , price , quantity } = cartItem;
  return (
    <div className="p-8 flex justify-start items-center gap-4 bg-gray-100 max-sm:flex-col max-sm:justify-center ">
      <img src={`${server}/${photo}`} alt={name} className="h-40 w-40 object-contain" />
      <article className="flex flex-col justify-center items-start gap-1 max-sm:items-center">
            <Link to={`/product/${productId}`} className="text-lg text-lightblack hover:text-darkblue">{name}</Link>
            <span className="font-bold">₹{price}</span>
      </article>
      <div className="xl:ml-auto lg:ml-auto md:ml-auto flex justify-center items-center gap-2">
            <button className="h-8 w-8 rounded-md border-2 flex justify-center items-center cursor-pointer text-lg hover:bg-lightblack hover:text-white" onClick={() =>decrementHandler(cartItem)}>-</button>
            <p>{quantity}</p>
            <button className="h-8 w-8 rounded-md border-2 flex justify-center items-center cursor-pointer text-lg hover:bg-lightblack hover:text-white"onClick={() =>incrementHandler(cartItem)}>+</button>
      </div>
      <button className="bg-transperent flex justify-center items-center cursor-pointer text-base hover:text-red-600" onClick={() =>removeHandler(productId)}><FaTrash /></button>
    </div>
  )
}

export default CartItems