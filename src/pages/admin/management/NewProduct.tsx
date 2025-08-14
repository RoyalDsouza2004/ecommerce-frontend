import { useFileHandler } from "6pp";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>('')

  const [price, setPrice] = useState<number>()
  const [stock, setStock] = useState<number>(1)
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>('')

  const [newProduct] = useNewProductMutation()
  const navigate = useNavigate()

  const photos = useFileHandler("multiple", 10, 5)

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const toastID =toast.loading("Creating Product...")

    try {

      if (!name || !price || stock < 0 || !category) {
        toast.error("Please provide all fields")
        return
      };

      if (!photos.file || photos.file.length < 1) {
        toast.error("Please add at least one photo")
        return
      }

      const formData = new FormData();

      formData.set("name", name)
      formData.set("price", price.toString())
      formData.set("stock", stock.toString())
      formData.set("category", category)

      photos.file.forEach((file) => formData.append("photos", file))

      const res = await newProduct({
        id: user?._id!, formData
      })

      responseToast(res, navigate, "/admin/product")

    } catch (error) {
      toast.error("Failed to create product");
    } finally{
      setIsLoading(false);
      toast.dismiss(toastID);
    }
  }

  return (

    <main className="flex justify-center gap-4 relative p-8 max-xl:p-8 max-sm:flex-col max-sm:items-center">
      <article className="p-8 w-full max-w-[400px] bg-white rounded-md shadow-md h-auto ">
        <form action="" className="flex flex-col items-center gap-8" onSubmit={submitHandler}>
          <h2 className="uppercase tracking-[2px]">New Product</h2>
          <div className="w-full relative">
            <label className="absolute left-0 -top-6">Name</label>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 -top-6">Description</label>
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10 max-h-40" />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 -top-6">Price</label>
            <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 -top-6">Category</label>
            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 -top-6">Stock</label>
            <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(Number(e.target.value))} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 -top-6">Photos</label>
            <input type="file" multiple onChange={photos.changeHandler} accept="image/*" required className="p-4 border border-gray-200 w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
          </div>
          {
            photos.error && <p className="text-red-500 text-sm">{photos.error}</p>
          }

          <div className="flex gap-2 items-center justify-center overflow-x-auto w-full">
            {
              photos.preview && photos.preview.map((img, index) => (
                <img key={index} src={img} alt={`Preview ${index}`} className="h-12 w-16 object-cover rounded-md" />
              ))
            }
          </div>

          <button disabled={isLoading} type="submit" className="w-full bg-blue-600 p-4 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Create</button>
        </form>
      </article>
    </main>

  )
}

export default NewProduct