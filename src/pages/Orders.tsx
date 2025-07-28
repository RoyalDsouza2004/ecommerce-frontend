import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { SkeletonLoader } from "../components/Loader";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {

   const { user } = useSelector((state: RootState) => state.userReducer)

  const {data , isLoading, isError ,error} = useMyOrdersQuery(user?._id!)

  if (isError) {
        const err = error as CustomError
        toast.error(err.data.message)
      }

  const [rows , setRows] = useState<DataType[]>([])

   useEffect(() => {
        if (data) setRows(
          data.orders.map(i => ({
            _id:i._id,
            amount:i.total,
            discount:i.discount,
            quantity:i.orderItems.length,
            status:<span className={i.status === "Processing" ? "text-red-600" : i.status === "Shipped" ? "text-green" :"text-purple"}>{i.status}</span>,
            action:<Link to={`/admin/transaction/${i._id}`}>Manage</Link>
          }))
        )
    
      }, [data])
    

  const Table = TableHOC<DataType>( 
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6,
    )()
    
  return (
    <div className="max-w-7xl w-full m-auto overflow-auto">
      <h1 className="uppercase font-light text-2xl my-4 text-left">My Orders</h1>
       return <main className='overflow-y-auto' >{isLoading ? <SkeletonLoader length={20} /> : Table }</main>
    </div>
  )
}

export default Orders