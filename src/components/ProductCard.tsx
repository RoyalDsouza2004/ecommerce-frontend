import { FaPlus } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { server } from "../redux/store";
import { CartItem } from "../types/types";


type ProductProps = {
  productId: string,
  photo: string,
  name: string,
  price: number,
  stock: number,
  handler: (cartItem: CartItem) => string | undefined;

}


const ProductCard = ({ productId, price, name, photo, stock, handler }: ProductProps) => {
  return (
    <div className="h-80 w-72 p-4 flex-none flex flex-col justify-start items-center gap-1 relative">
      <img src={`${server}/${photo}`} alt="name" className="h-auto w-auto object-fit m-4" />
      <p className="mt-6-">{name}</p>
      <span className="font-bold text-base">₹{price}</span>
      <div className="absolute h-full w-full top-0 left-0 bg-[#0000006b] opacity-0 hover:opacity-100  flex justify-center items-center gap-4">
        <button 
        onClick={() => handler({productId,photo,name,price,stock,quantity: 1})} 
        className="flex justify-center items-center h-12 w-12 bg-darkblue opacity-100 cursor-poionter rounded-full text-white text-base hover:rotate-12"><FaPlus size={16} /></button>
        <button className="flex justify-center items-center h-12 w-12 bg-darkblue opacity-100 cursor-poionter rounded-full text-white text-base"><MdMoreVert size={20} /></button>
      </div>
    </div>

  )
}

export default ProductCard