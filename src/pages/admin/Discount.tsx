import { ReactElement, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/Loader";
import { useAllCouponsQuery } from "../../redux/api/paymentAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";

interface DataType {
      code: string;
      amount: number;
      _id: string;
      action: ReactElement
}

const columns: Column<DataType>[] = [
      {
            Header: "ID",
            accessor: "_id"
      },
      {
            Header: "Code",
            accessor: "code"
      },
      {
            Header: "Amount",
            accessor: "amount"
      },
      {
            Header: "Action",
            accessor: "action"
      }
];


const Discount = () => {

      const { user } = useSelector((state: RootState) => state.userReducer)

      const [rows, setRows] = useState<DataType[]>([])

      const { data, isLoading, isError, error } = useAllCouponsQuery(user?._id!)

      if (isError) {
            const err = error as CustomError
            toast.error(err.data.message)
            console.error(err)
      }

      useEffect(() => {
            if (data) setRows(
                  data.coupons.map(i => ({
                        code: i.code,
                        amount: i.amount,
                        _id: i._id,
                        action: <Link to={`/admin/discount/${i._id}`}>Manage</Link>
                  }))
            )

      }, [data])


      const Table = useCallback(TableHOC<DataType>(columns, rows, "dashboard-product-box", "Products", rows.length > 6), [columns, rows])();

      return <>
            <main className='overflow-y-auto' >{isLoading ? <SkeletonLoader length={20} /> : Table}</main>
            <Link to='/admin/discount/new' className='fixed right-8 top-32 h-10 w-10 flex justify-center items-center rounded-full bg-red-600 text-white hover:opacity-80 max-sm:absolute max-sm:right-7 max-sm:top-28'><FaPlus /></Link>
      </>

}

export default Discount