
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
      return <>
            <div className='admin-container h-full bg-gray-100 max-xl:overflow-auto max-lg:grid-cols-[1fr]'>
                  <AdminSidebar />
                  <Outlet />
            </div>
      </>
}

export default AdminLayout