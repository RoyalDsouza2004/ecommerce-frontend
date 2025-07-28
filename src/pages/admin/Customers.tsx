
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Column } from 'react-table';
import TableHOC from '../../components/admin/TableHOC';
import { FaTrash } from 'react-icons/fa';
import { RootState, server } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useAllUsersQuery, useDeleteUserMutation } from '../../redux/api/userAPI';
import { CustomError } from '../../types/api-types';
import toast from 'react-hot-toast';
import { SkeletonLoader } from '../../components/Loader';
import { responseToast } from '../../utils/features';



interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Gender",
    accessor: "gender"
  },
  {
    Header: "Role",
    accessor: "role"
  },
  {
    Header: "Action",
    accessor: "action"
  }
];


const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, isLoading, isError, error } = useAllUsersQuery(user?._id!)

  const [deleteUser] = useDeleteUserMutation()

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! })
    responseToast(res, null , "")
    }


  if (isError) {
    const err = error as CustomError
    toast.error(err.data.message)
  }

  useEffect(() => {
    if (data) setRows(
      data.users.map(i => ({
        avatar: <img  className='rounded-full ' src={i.photo} alt={i.name} referrerPolicy="no-referrer" />,
        name: i.name,
        email: i.email,
        gender: i.gender,
        role: i.role!,
        action: (
          <button onClick={() => deleteHandler(i._id)}>
            <FaTrash />
          </button>
        )
      }))
    )

  }, [data])



  const [rows, setRows] = useState<DataType[]>([])
  const Table = useCallback(TableHOC<DataType>(columns, rows, "dashboard-product-box", "Customers", rows.length > 6), [data, rows])();

  return <main className='overflow-y-auto' >{isLoading ? <SkeletonLoader length={20} /> : Table}</main>


}

export default Customers