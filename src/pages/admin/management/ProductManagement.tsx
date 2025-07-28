import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SkeletonLoader } from "../../../components/Loader";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productAPI";
import { server } from "../../../redux/store";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { responseToast } from "../../../utils/features";

const ProductManagement = () => {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const params = useParams()
  const navigate = useNavigate()

  const { data, isLoading , isError } = useProductDetailsQuery(params.id!)

  const { name, price, photo, stock, category } = data?.product || {
    name: "",
    photo: "",
    category: "",
    stock: 0,
    price: 0
  }


  const [nameUpdate, setNameUpdate] = useState<string>(name)
  const [photoUpdate, setPhotoUpdate] = useState<string>("")
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category)
  const [priceUpdate, setPriceUpdate] = useState<number>(price)
  const [stockUpdate, setStockUpdate] = useState<number>(stock)
  const [photoFile, setPhotoFile] = useState<File>()

  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result)
          setPhotoFile(file)
        }
      }
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate)
    if (priceUpdate) formData.set("price", priceUpdate.toString())
    if (stockUpdate !== undefined) formData.set("stock", stockUpdate.toString())
    if (categoryUpdate) formData.set("category", categoryUpdate)
    if (photoFile) formData.set("photo", photoFile)

    const res = await updateProduct({ formData, userId: user?._id!, productId: data?.product._id! })

    responseToast(res, navigate, "/admin/product")


  }
  const deleteHandler = async () => {

    const res = await deleteProduct({ userId: user?._id!, productId: data?.product._id! })
    responseToast(res, navigate, "/admin/product")


  }

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name)
      setPriceUpdate(data.product.price)
      setStockUpdate(data.product.stock)
      setCategoryUpdate(data.product.category)
    }
  }, [data])

    if(isError) return <Navigate to={"/404"} />
  


  return (
    <main className="flex justify-center gap-4 relative p-8 max-xl:p-8 max-sm:flex-col max-sm:items-center">
      {
        isLoading ? <SkeletonLoader length={10} /> : <>
          <section className="overflow-y-auto w-full h-[85vh] max-w-lg shadow-md bg-white p-20 flex flex-col gap-4 relative rounded-md max-sm:max-w-[400px] ">
            <strong className="font-light">ID - {data?.product._id}</strong>
            <img src={`${server}/${photo}`} alt="product" className="w-full h-full object-cover" />
            <p className="text-center tracking-wider uppercase">{name}</p>
            {
              stock > 0 ? (
                <span className="text-green absolute right-8 top-8">{stock} Available</span>
              ) : <span className="text-red-600 absolute right-8 top-8">Unavailable</span>
            }
            <h3 className="text-center text-3xl">${price}</h3>
            <span className="absolute top-8 left-12 text-gray-400 ">Category: {category}</span>
          </section>

          <article className="h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md pt-0">
            <button className="rounded-full bg-black flex w-12 h-12 justify-center items-center relative left-[340px]
    -top-[20px]" onClick={deleteHandler}><FaTrash className="text-white" /></button>
            <form onSubmit={submitHandler} className="flex flex-col items-center gap-6">
              <h2 className="uppercase tracking-[2px] font-semibold mb-5">Manage Product</h2>
              <div className="w-full relative">
                <label className="absolute left-0 -top-6">Name</label>
                <input type="text" placeholder="Name" value={nameUpdate} onChange={e => setNameUpdate(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
              </div>
              <div className="w-full relative">
                <label className="absolute left-0 -top-6">Price</label>
                <input type="number" placeholder="Price" value={priceUpdate} onChange={e => setPriceUpdate(Number(e.target.value))} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
              </div>
              <div className="w-full relative">
                <label className="absolute left-0 -top-6">Stock</label>
                <input type="number" placeholder="Stock" value={stockUpdate} onChange={e => setStockUpdate(Number(e.target.value))} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
              </div>
              <div className="w-full relative">
                <label className="absolute left-0 -top-6">Category</label>
                <input type="text" placeholder="Category" value={categoryUpdate} onChange={e => setCategoryUpdate(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
              </div>
              <div className="w-full relative">
                <label className="absolute left-0 -top-6">Photo</label>
                <input type="file" onChange={changeImageHandler} className="p-4 border border-gray-200 w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 h-16" />
              </div>

              {
                photoUpdate && <img src={photoUpdate} alt="New Image" className="h-16 w-16 object-cover rounded-md " />
              }
              <button type="submit" className="w-full bg-blue-600 p-4 text-white rounded-md ">Update</button>
            </form>
          </article>
        </>
      }
    </main>


  )
}

export default ProductManagement