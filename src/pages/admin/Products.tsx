import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../../components/admin/TableHOC';
import { SkeletonLoader } from '../../components/Loader';
import { useAllProductsQuery } from '../../redux/api/productAPI';
import { CustomError } from '../../types/api-types';
import { UserReducerInitialState } from '../../types/reducer-types';
import { transformImage } from '../../utils/features';

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Price",
    accessor: "price"
  },
  {
    Header: "Stock",
    accessor: "stock"
  },
  {
    Header: "Action",
    accessor: "action"
  }
];



const Products: React.FC = () => {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer)

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!)

  const [rows, setRows] = useState<DataType[]>([])
  
  if (isError) {
    const err = error as CustomError
    toast.error(err.data.message)
  }


  useEffect(() => {
    if (data) setRows(
      data.products.map(i => ({
        photo: <img src={transformImage(i.photos[0].url)} />,
        name: i.name,
        price: i.price,
        stock: i.stock,
        action: <Link to={`/admin/product/${i._id}`}>Manage</Link>
      }))
    )

  }, [data])


  const Table = useCallback(TableHOC<DataType>(columns, rows, "dashboard-product-box", "Products" , rows.length > 6) , [columns, rows])();
;

  return <>
     <main className='overflow-y-auto' >{isLoading ? <SkeletonLoader length={20} /> : Table }</main>
    <Link to='/admin/product/new' className='fixed right-8 top-32 h-10 w-10 flex justify-center items-center rounded-full bg-red-600 text-white hover:opacity-80 max-sm:absolute max-sm:right-7 max-sm:top-28'><FaPlus /></Link>
  </>

}

export default Products