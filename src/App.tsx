import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";

import { Toaster } from "react-hot-toast"

import AdminLayout from "./pages/admin/Layout/Admin";
import Header from "./components/Header";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userAPI";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Transactions = lazy(() => import('./pages/admin/Transactions'));
const Customers = lazy(() => import('./pages/admin/Customers'));

const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));

const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const ProductManagement = lazy(() => import("./pages/admin/management/ProductManagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/TransactionManagement"));

const Toss = lazy(() => import("./pages/admin/apps/Toss"));
const Coupen = lazy(() => import("./pages/admin/apps/Coupen"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid)
        dispatch(userExist(data.user))
      } else {
        dispatch(userNotExist())
      }
    })
  }, [])


  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <MainContent />
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

const MainContent = () => {
  const { user, loading } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  const location = useLocation();
  const showHeader = location.pathname !== "/login";

  return loading ? <Loader /> : (
    <>
      {showHeader && <Header user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={
          <ProtectedRoute isAuthenticated={user ? false : true}>
            <Login />
          </ProtectedRoute>} />

        <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/pay" element={<Checkout />} />
        </Route>

        <Route element={<ProtectedRoute
            isAuthenticated={user? true : false}
            adminOnly={true}
            admin={user?.role === "admin" ? true : false} />}>
          <Route path="/admin" element={<AdminLayout />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Products />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="customer" element={<Customers />} />

            <Route path="chart/bar" element={<BarCharts />} />
            <Route path="chart/pie" element={<PieCharts />} />
            <Route path="chart/line" element={<LineCharts />} />

            <Route path="app/stopwatch" element={<Stopwatch />} />
            <Route path="app/coupen" element={<Coupen />} />
            <Route path="app/toss" element={<Toss />} />
            <Route path="product/new" element={<NewProduct />} />
            <Route path="product/:id" element={<ProductManagement />} />
            <Route path="transaction/:id" element={<TransactionManagement />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
