import { Link, Navigate, useParams } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import { useOrderDetailsQuery } from "../redux/api/orderAPI";
import { OrderItemType } from "../types";
import { Order } from "../types/types";
import { transformImage } from "../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: '',
    state: "",
    country: "",
    pinCode: "",
  },
  status: '',
  subtotal: 0,
  discount: 1200,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: ""
  },
  _id: ""
}



const OrderDetails = () => {

  const params = useParams()


  const { data, isLoading, isError } = useOrderDetailsQuery(params.id!)

  if (isError) return <Navigate to={"/404"} />

  const { shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    subtotal,
    total,
    tax,
    discount,
    shippingCharges
  } = data?.order || defaultData


  return (

    <main className="flex justify-center gap-4 relative p-8 max-xl:p-8 max-sm:flex-col max-sm:items-center">
      {
        isLoading ? <SkeletonLoader length={10} /> : <>
          <section className="overflow-y-auto w-full h-[85vh] max-w-lg shadow-md bg-white p-16 flex flex-col gap-4 relative rounded-md max-sm:max-w-[400px] ">
            <h2 className="tracking-[2px] font-light uppercase text-center">Order Items</h2>
            {orderItems.map((i) => (
              <ProductCard
                key={i._id}
                name={i.name}
                photo={i.photo}
                _id={i._id}
                quantity={i.quantity}
                price={i.price}
              />
            ))}

          </section>
          <article className="overflow-y-auto w-full h-[85vh] max-w-lg shadow-md bg-white p-8 flex flex-col gap-4 relative rounded-md">
            <h1 className="text-center tracking-[2px] font-light uppercase">Order Info</h1>
            <h5 className="mt-8 ml-2 text-[1.1rem] font-bold">User Info</h5>
            <p>Name: {name}</p>
            <p>
              Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
            </p>

            <h5 className="mt-8 ml-2 text-[1.1rem] font-bold">Amount Info</h5>
            <p>Subtotal: {subtotal}</p>
            <p>Shipping Charges: {shippingCharges}</p>
            <p>Tax: {tax}</p>
            <p>Discount: {discount}</p>
            <p>Total: {total}</p>

            <h5 className="mt-8 ml-2 text-[1.1rem] font-bold">Status Info</h5>
            <p className="mt-2">
              Status:{" "}
              <span
                className={
                  status === "Delivered"
                    ? "text-purple"
                    : status === "Shipped"
                      ? "text-green"
                      : "text-red-600"
                }
              >
                {status}
              </span>
            </p>

          </article></>
      }
    </main>

  )
}

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="flex items-center gap-4">
    <img src={transformImage(photo)} alt={name} className="h-16 w-16 object-cover rounded-md" />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span className="ml-auto">
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
)

export default OrderDetails