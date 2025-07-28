import { ChangeEvent, FormEvent, useState } from "react"
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewProduct = () => {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const [name, setName] = useState<string>('')
  const [photo, setPhoto] = useState<File>()
  const [price, setPrice] = useState<number>()
  const [stock, setStock] = useState<number>(1)
  const [category, setCategory] = useState<string>("")
  const [photoPrev, setPhotoPrev] = useState<string>("")

  const [newProduct] = useNewProductMutation()
  const navigate = useNavigate()

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result)
          setPhoto(file)
        }
      }
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !category || !photo) {
      toast.error("Please provide all fields")
      return
    };

    const formData = new FormData();

    formData.set("name", name)
    formData.set("price", price.toString())
    formData.set("stock", stock.toString())
    formData.set("photo", photo!)
    formData.set("category", category)

    const res = await newProduct({
      id: user?._id!, formData
    })

    responseToast(res, navigate, "/admin/product")
  }

  return (

    <main className="flex justify-center gap-4 relative p-8 max-xl:p-8 max-sm:flex-col max-sm:items-center">
      <article className="h-[85vh] p-8 w-full max-w-[400px] bg-white rounded-md shadow-md ">
        <form action="" className="flex flex-col items-center gap-8" onSubmit={submitHandler}>
          <h2 className="uppercase tracking-[2px]">New Product</h2>
          <div className="w-full relative">
            <label className="absolute left-0 -top-6">Name</label>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="p-4 border border-gray-200 w-full rounded-md h-10" />
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
            <label className="absolute left-0 -top-6">Photo</label>
            <input type="file" onChange={changeImageHandler} required className="p-4 border border-gray-200 w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
          </div>

          {
            photo && <img src={photoPrev} alt="New Image" className="h-12 w-16 object-cover rounded-md" />
          }
          <button type="submit" className="w-full bg-blue-600 p-4 text-white rounded-md">Create</button>
        </form>
      </article>
    </main>

  )
}

export default NewProduct