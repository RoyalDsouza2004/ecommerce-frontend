import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { AiFillFileText } from 'react-icons/ai';
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from 'react-icons/fa';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io';
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag2Fill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [phoneActive, setPhoneActive] = useState(window.innerWidth < 1024);

  const resizeHandler = () => {
    const isPhoneActive = window.innerWidth < 1024 ;
    setPhoneActive(isPhoneActive);
    if (!isPhoneActive) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const location = useLocation();

  const closeSidebar = () => {
      setShowModal(false);
  };

  return (
    <>
      {phoneActive && (
        <button
          className='grid place-items-center h-12 w-12 border-none outline-none cursor-pointer text-blue-600 bg-white fixed top-2 left-4 rounded-lg z-10'
          onClick={() => setShowModal(true)}
        >
          <HiMenuAlt1 size={30} />
        </button>
      )}

      {showModal && (
        <div
          className='fixed top-0 right-0 w-[30vw] h-screen opacity-0 md:w-[60vw]'
          onClick={() => setShowModal(false)}
        />
      )}

      <aside
        className={`w-[100%] h-[100vh] bg-white p-4 z-10 overflow-y-auto no-scrollbar ${phoneActive && 'w-[70vw] fixed top-0 transition-all lg:w-[40vw] md:w-[40vw] md:z-10'} ${showModal ? 'left-0' : '-left-[36rem]' 
          }`}
      >
        <DivOne location={location} closeSidebar={closeSidebar} />
        <DivTwo location={location} closeSidebar={closeSidebar} />
        <DIvThree location={location} closeSidebar={closeSidebar} />
        {phoneActive && (
          <button
            className='w-[80%] h-16 my-4 mx-auto block p-6 outline-none cursor-pointer bg-red-600 text-white rounded-lg'
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({ location, closeSidebar }: { location: any; closeSidebar: () => void }) => (
  <div className='m-[2rem_1rem] '>
    <h5 className='tracking-[2px] font-bold opacity-40 uppercase mt-4 mb-4'>dashboard</h5>
    <ul className='flex flex-col list-none '>
      <Li url='/admin/dashboard' text='Dashboard' Icon={RiDashboardFill} location={location} closeSidebar={closeSidebar} />
      <Li url='/admin/product' text='Product' Icon={RiShoppingBag2Fill} location={location} closeSidebar={closeSidebar} />
      <Li url='/admin/customer' text='Customer' Icon={IoIosPeople} location={location} closeSidebar={closeSidebar} />
      <Li url='/admin/transactions' text='Transactions' Icon={AiFillFileText} location={location} closeSidebar={closeSidebar} />
    </ul>
  </div>
);

const DivTwo = ({ location, closeSidebar }: { location: any; closeSidebar: () => void }) => (
  <div className='m-[2rem_1rem] '>
    <h5 className='tracking-[2px] font-bold opacity-40 uppercase mt-4 mb-4'>charts</h5>
    <ul className='flex flex-col list-none '>
      <Li url='/admin/chart/bar' text='Bar' Icon={FaChartBar} location={location} closeSidebar={closeSidebar} />
      <Li url='/admin/chart/pie' text='Pie' Icon={FaChartPie} location={location} closeSidebar={closeSidebar} />
      <Li url='/admin/chart/line' text='Line' Icon={FaChartLine} location={location} closeSidebar={closeSidebar} />
    </ul>
  </div>
);

const DIvThree = ({ location, closeSidebar }: { location: any; closeSidebar: () => void }) => (
  <div className='m-[2rem_1rem] '>
    <h5 className='tracking-[2px] font-bold opacity-40 uppercase mt-4 mb-4'>apps</h5>
    <ul className='flex flex-col list-none '>
      <Li url='/admin/app/stopwatch' text='Stopwatch' Icon={FaStopwatch} location={location} closeSidebar={closeSidebar} />
      <Li url='/admin/app/coupen' text='Coupen' Icon={RiCoupon3Fill} location={location} closeSidebar={closeSidebar} />
      <Li url='/admin/app/toss' text='Toss' Icon={FaGamepad} location={location} closeSidebar={closeSidebar} />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: any;
  Icon: IconType;
  closeSidebar: () => void;
}

const Li = ({ url, text, location, Icon, closeSidebar }: LiProps) => (
  <li
    className={`p-[0.8rem_1rem] rounded-[10px] flex gap-3 items-center ${location.pathname.includes(url) ? 'bg-[rgba(0,115,255,0.1)]' : 'bg-white'
      }`}
    onClick={closeSidebar}
  >
    <Link
      className={`flex flex-row font-medium cursor-pointer items-center gap-4 w-full lg:text-xs xl:text-[1rem] ${location.pathname.includes(url) ? 'text-[rgb(0,115,255)]' : 'text-black'
        }`}
      to={url}
    >
      <Icon /> {text}
    </Link>
  </li>
);

export default AdminSidebar;
