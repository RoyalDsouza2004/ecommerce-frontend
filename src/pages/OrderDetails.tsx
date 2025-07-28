import { useState } from "react";
import { OrderItemType, OrderType } from "../types"
import { Link } from "react-router-dom";


const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];


const OrderDetails = () => {

  const [order] = useState<OrderType>({
    name: "Royal Dsouza",
    address: "1-226/3",
    city: 'karkala',
    state: "karnataka",
    country: "India",
    pinCode: 576117,
    status: 'Processing',
    subTotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "jkjssddsd"
  });

  const { name, address, city, country, state, pinCode, subTotal, shippingCharges, tax, discount, total, status } = order;


  return (
 
      <main className="flex justify-center gap-4 relative p-8 max-xl:p-8 max-sm:flex-col max-sm:items-center">
        <section className="overflow-y-auto w-full h-[85vh] max-w-lg shadow-md bg-white p-16 flex flex-col gap-4 relative rounded-md max-sm:max-w-[400px] ">
          <h2 className="tracking-[2px] font-light uppercase text-center">Order Items</h2>
          {order.orderItems.map((i) => (
            <ProductCard
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
          <p>Subtotal: {subTotal}</p>
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

        </article>
      </main>

  )
}

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="flex items-center gap-4">
    <img src={photo} alt={name} className="h-16 w-16 object-cover rounded-md" />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span className="ml-auto">
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
)

export default OrderDetails