import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/Loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";


type CategoriesResponse = {
  categories: string[];
};

interface FilterControlsProps {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  categoriesLoading: boolean;
  categoriesResponse?: CategoriesResponse;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  sort, setSort, maxPrice, setMaxPrice, category, setCategory,
  categoriesLoading, categoriesResponse
}) => (
  <div className="flex flex-col gap-4">
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
      <input
        type="range"
        min={100}
        max={100000}
        value={maxPrice}
        onChange={e => setMaxPrice(Number(e.target.value))}
        className="input m-2"
      />
    </div>
    <div>
      <h4 className="text-md font-bold">Categories:</h4>
      <select value={category} onChange={e => setCategory(e.target.value)} className="input m-2">
        <option value="">ALL</option>
        {!categoriesLoading &&
          categoriesResponse?.categories.map(i => (
            <option key={i} value={i}>{i.toUpperCase()}</option>
          ))
        }
      </select>
    </div>
  </div>
);


const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { data: categoriesResponse, isLoading: categoriesLoading, isError, error } = useCategoriesQuery("");


  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added To Cart");
  };

  const initialCategory = searchParams.get("category") || "";


  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [category, setCategory] = useState<string>(initialCategory);
  const [page, setPage] = useState<number>(1);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const { isLoading: productLoading, data: searchedData, isError: productIsError, error: productError } = useSearchProductsQuery({ search, sort, category, page, price: maxPrice });

  const isPrevPage = page > 1;
  const isNextPage = page < (searchedData?.totalPage || 1);

  // Error Toasts
  if (isError && error) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError && productError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  return (
    <div className="p-8 flex justify-start items-stretch gap-8 min-h-[93.5vh] max-md:overflow-x-auto max-md:p-2">
      {/* Sidebar for md and up */}
      <aside className="min-w-80 shadow-2xl p-8 flex-col justify-start items-stretch gap-2 hidden md:flex">
        <h2 className="uppercase text-xl font-light">Filters</h2>
        <FilterControls
          sort={sort}
          setSort={setSort}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          category={category}
          setCategory={setCategory}
          categoriesLoading={categoriesLoading}
          categoriesResponse={categoriesResponse}
        />
      </aside>

      {/* Filter button on screens smaller than md */}
      <button
        className="absolute top-28 right-6 bg-darkblue text-white p-3 rounded-full shadow-lg z-10 md:hidden sm:top-44"
        onClick={() => setFilterOpen(true)}
        aria-label="Open Filters"
        type="button"
      >
        <span className="font-bold">Filter</span>
      </button>

      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-end md:hidden">
          <div className="w-full max-w-md bg-white p-6 rounded-t-2xl shadow-2xl animate-slideup flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="uppercase text-lg font-semibold">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="text-2xl px-2" type="button">&times;</button>
            </div>
            <FilterControls
              sort={sort}
              setSort={setSort}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              category={category}
              setCategory={setCategory}
              categoriesLoading={categoriesLoading}
              categoriesResponse={categoriesResponse}
            />
            <button
              className="mt-4 p-2 w-full bg-darkblue text-white rounded-lg font-semibold"
              onClick={() => setFilterOpen(false)}
              type="button"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <main className="w-full px-8 flex flex-col gap-8 max-md:px-4">
        <h1 className="uppercase text-2xl font-medium tracking-wide">Products</h1>

        <div className="flex w-full max-w-[600px] items-center gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-grow p-4 border border-[#00000051] bg-inherit focus:outline-none rounded-md text-base"
          />
        </div>

        {productLoading ? (
          <SkeletonLoader width="w-full" length={10} />
        ) : (
          <div className="flex justify-start items-start flex-wrap h-[100%-10rem] overflow-y-auto">
            {searchedData?.products.map(i => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
              />
            ))}
          </div>
        )}

        {searchedData && searchedData.totalPage > 1 && (
          <article className="flex justify-center items-center gap-4">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage(prev => prev - 1)}
              className="p-2 w-16 cursor-pointer bg-darkblue text-white rounded-md hover:opacity-80 disabled:opacity-20 disabled:cursor-not-allowed"
              type="button"
            >
              Prev
            </button>
            <span>{page} of {searchedData.totalPage}</span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage(prev => prev + 1)}
              className="p-2 w-16 cursor-pointer bg-darkblue text-white rounded-md hover:opacity-80 disabled:opacity-20 disabled:cursor-not-allowed"
              type="button"
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
