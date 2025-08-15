import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";

import { Toaster } from "react-hot-toast"

import AdminLayout from "./pages/admin/Layout/Admin";
import Header from "./components/Header";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userAPI";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Transactions = lazy(() => import('./pages/admin/Transactions'));
const Customers = lazy(() => import('./pages/admin/Customers'));
const Discount = lazy(() => import('./pages/admin/Discount'));

const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));

const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const NewDiscount = lazy(() => import("./pages/admin/management/NewDiscount"));
const ProductManagement = lazy(() => import("./pages/admin/management/ProductManagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/TransactionManagement"));
const DiscountManagement = lazy(() => import("./pages/admin/management/DiscountManagement"));

const Toss = lazy(() => import("./pages/admin/apps/Toss"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

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
  const showHeaderAndFooter = location.pathname !== "/login";

  return loading ? <Loader /> : (
    <>
      {showHeaderAndFooter && <Header user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={
          <ProtectedRoute isAuthenticated={user ? false : true}>
            <Login />
          </ProtectedRoute>} />

        <Route element={<ProtectedRoute isAuthenticated={user ? true : false} redirect="/login" />}>
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
            <Route path="discount" element={<Discount />} />

            <Route path="chart/bar" element={<BarCharts />} />
            <Route path="chart/pie" element={<PieCharts />} />
            <Route path="chart/line" element={<LineCharts />} />

            <Route path="app/stopwatch" element={<Stopwatch />} />
            <Route path="app/coupon" element={<Coupon />} />
            <Route path="app/toss" element={<Toss />} />
            <Route path="product/new" element={<NewProduct />} />
            <Route path="discount/new" element={<NewDiscount />} />
            <Route path="product/:id" element={<ProductManagement />} />
            <Route path="transaction/:id" element={<TransactionManagement />} />
            <Route path="discount/:id" element={<DiscountManagement />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

export default App;
