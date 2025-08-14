import { FaPlus } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { transformImage } from "../utils/features";


type ProductProps = {
  productId: string,
  photos: {
    public_id: string,
    url: string
  }[],
  name: string,
  price: number,
  stock: number,
  handler: (cartItem: CartItem) => string | undefined;

}


const ProductCard = ({ productId, price, name, photos, stock, handler }: ProductProps) => {
  return (
    <div
      className="
    relative 
    flex flex-col justify-start items-center gap-2 
    p-4 
    w-72 h-80 flex-none 
    rounded-md 
    bg-white 
    max-sm:w-full sm:h-auto 
    hover:shadow-lg 
    transition-shadow duration-300 ease-in-out
  "
    >
      <div className="w-full h-32 sm:h-40 flex justify-center items-center bg-gray-50 rounded-md overflow-hidden">
        <img
          src={transformImage(photos[0]?.url , 700)}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <p className="mt-2 text-center font-medium text-sm sm:text-base truncate w-full">{name}</p>
      <span className="font-bold text-lg sm:text-xl">₹{price}</span>

      {/* Overlay buttons on hover */}
      <div className="
    absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 
    flex justify-center items-center gap-4 
    transition-opacity duration-300
    rounded-md
  ">
        <button
          onClick={() => handler({ productId, photo: photos[0].url, name, price, stock, quantity: 1 })}
          className="
        flex justify-center items-center 
        h-12 w-12 
        bg-darkblue 
        rounded-full 
        text-white 
        text-base 
        hover:rotate-12 
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkblue
      "
          aria-label="Add to cart"
          type="button"
        >
          <FaPlus size={16} />
        </button>

        <Link
          to={`/product/${productId}`}
          className="
        flex justify-center items-center 
        h-12 w-12 
        bg-darkblue 
        rounded-full 
        text-white 
        text-base 
        hover:scale-110 
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkblue
      "
          aria-label="View details"
        >
          <MdMoreVert size={20} />
        </Link>
      </div>
    </div>

  );
};



export default ProductCard