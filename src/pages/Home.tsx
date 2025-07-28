import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {

  const dispatch = useDispatch()

  const { data, isLoading, isError } = useLatestProductsQuery("");

  const addToCartHandler = (cartItem: CartItem) => {

    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem))

    toast.success("Added To Cart")
  } 

  if (isError) toast.error("Cannot fetch the Products")

  return (
    <div className="py-8 px-[5%] flex flex-col h-[cal(100vh-4rem)] w-full">
      <section className="w-full m-auto h-72 cover"></section>
      <h1 className="font-light text-lg uppercase flex justify-between items-center mt-12 ">Latest Products
        <Link to={"/search"} className="text-sm" >More</Link>
      </h1>

      <main className="w-full flex-1 flex gap-4 homecard flex-wrap max-lg:pl-6">

        {
          isLoading ?
            <SkeletonLoader width="w-[80vw]" length={5} /> :
            data?.products.map((i) => <ProductCard key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock} handler={addToCartHandler} photo={i.photo} />)
        }

      </main>
    </div>
  )
}

export default Home