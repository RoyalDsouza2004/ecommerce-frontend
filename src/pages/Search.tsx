import { useState } from "react"
import ProductCard from "../components/ProductCard"
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI"
import { CustomError } from "../types/api-types"
import toast from "react-hot-toast"
import { SkeletonLoader } from "../components/Loader"
import { addToCart } from "../redux/reducer/cartReducer"
import { CartItem } from "../types/types"
import { useDispatch } from "react-redux"

const Search = () => {

  const dispatch = useDispatch()

  const { data: categoriesResponse, isLoading: categoriesLoading, isError, error } = useCategoriesQuery("")

  const addToCartHandler = (cartItem: CartItem) => {

    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem))

    toast.success("Added To Cart")
  } 

  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<number>(100000)
  const [category, setCategory] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  const { isLoading: productLoading, data: searchedData, isError: productIsError, error: productError } = useSearchProductsQuery({ search, sort, category, page, price: maxPrice })


  const isPrevPage = page > 1;
  const isNextPage = page < searchedData?.totalPage!;

  if (isError) {
    const err = error as CustomError
    toast.error(err.data.message)
  }
  if (productIsError) {
    const err = productError as CustomError
    toast.error(err.data.message)
  }


  return (
    <div className="p-8 flex justify-start items-stretch gap-8 min-h-[93.5vh] max-sm:overflow-x-auto">
      <aside className="min-w-80 shadow-2xl p-8 flex flex-col justify-start items-stretch gap-2 max-sm:hidden">
        <h2 className="uppercase text-xl font-light">Filters</h2>
        <div>
          <h4 className="text-md font-bold">Sort</h4>

          <select value={sort} onChange={e => setSort(e.target.value)} className="input m-2">
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4 className="text-md font-bold">Max Price: {maxPrice || ""}</h4>

          <input type="range" min={100} max={100000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="input m-2" />
        </div>

        <div>
          <h4 className="text-md font-bold">Categories:</h4>

          <select value={category} onChange={e => setCategory(e.target.value)} className="input m-2">
            <option value="">ALL</option>
            {
              !categoriesLoading && categoriesResponse?.categories.map(i => <option key={i} value={i}>{i.toUpperCase()}</option>)
            }

          </select>
        </div>

      </aside>
      <main className="w-full px-8 flex flex-col gap-8">
        <h1 className="uppercase text-2xl font-medium tracking-wide">Products</h1>
        <input type="text" placeholder="Search by name......" value={search} onChange={e => setSearch(e.target.value)} className="p-4 border border-[#00000051] bg-inherit focus:outline-none rounded-md text-base w-[50%] max-xl:w-[80%]" />
        {
          productLoading ? <SkeletonLoader width="w-full" length={10} /> : <div className="flex justify-start items-start flex-wrap h-[100%-10rem] overflow-y-auto">
            {
              searchedData?.products.map(i => <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo} />)
            }
          </div>
        }
        {
          searchedData && searchedData.totalPage > 1 && (
            <article className="flex justify-center items-center gap-4">
              <button disabled={!isPrevPage} onClick={() => setPage(prev => prev - 1)} className="p-2 w-16 cursor-pointer bg-darkblue text-white rounded-md hover:opacity-80 disabled:opacity-20 disabled:cursor-not-allowed ">Prev</button>
              <span>{page} of {searchedData.totalPage}</span>
              <button disabled={!isNextPage} onClick={() => setPage(prev => prev + 1)} className="p-2 w-16 cursor-pointer bg-darkblue text-white rounded-md hover:opacity-80 disabled:opacity-20 disabled:cursor-not-allowed ">Next</button>
            </article>
          )
        }
      </main>
    </div>
  )
}

export default Search