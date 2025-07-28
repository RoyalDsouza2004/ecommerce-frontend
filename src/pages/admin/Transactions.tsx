import { ReactElement, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/Loader";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
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


const Transactions = () => {
  const { user } = useSelector((state: RootState) => state.userReducer)

  const {data , isLoading, isError ,error} = useAllOrdersQuery(user?._id!)

  const [rows , setRows] = useState<DataType[]>([]);

  if (isError) {
      const err = error as CustomError
      toast.error(err.data.message)
    }

  useEffect(() => {
      if (data) setRows(
        data.orders.map(i => ({
          user:i.user.name,
          amount:i.total,
          discount:i.discount,
          quantity:i.orderItems.length,
          status:<span className={i.status === "Processing" ? "text-red-600" : i.status === "Shipped" ? "text-green" :"text-purple"}>{i.status}</span>,
          action:<Link to={`/admin/transaction/${i._id}`}>Manage</Link>
        }))
      )
  
    }, [data])
  

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      rows,
      "dashboard-product-box",
      "Transactions",
      rows.length>6
    ),
    [data , rows]
  )();

  return <main className='overflow-y-auto' >{isLoading ? <SkeletonLoader length={20} /> : Table }</main>

};

export default Transactions;