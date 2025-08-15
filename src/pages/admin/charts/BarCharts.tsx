import toast from "react-hot-toast";
import { BarChart } from "../../../components/admin/Charts"
import { CustomError } from "../../../types/api-types";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { SkeletonLoader } from "../../../components/Loader";
import { getLastMonths } from "../../../utils/features";
import { useState } from "react";

const { last6Months, last12Months } = getLastMonths();

const BarCharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = useBarQuery(user?._id!);

  const [selectedChart, setSelectedChart] = useState<"products" | "orders">("products");

  const products = data?.charts.products || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <main className="bg-white p-16 overflow-y-auto max-sm:p-0">
      <h1 className="mb-8 ml-8 text-xl font-bold max-sm:m-0 max-sm:text-center">
        Bar Charts
      </h1>

      {isLoading ? (
        <SkeletonLoader length={20} />
      ) : (
        <section className="w-[80%] my-16 mx-auto max-sm:my-32">
          {/* Dropdown to switch between charts */}
          <div className="flex justify-center mb-8">
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value as "products" | "orders")}
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
            >
              <option value="products">Top Selling Products & Top Customers</option>
              <option value="orders">Orders Throughout the Year</option>
            </select>
          </div>

          {selectedChart === "products" && (
            <>
              <BarChart
                data_1={products}
                data_2={users}
                labels={last6Months}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260,50%,30%)`}
                bgColor_2={`hsl(360,90%,90%)`}
              />
              <h2 className="uppercase my-8 text-center tracking-[2px] font-light">
                Top Selling Products & Top Customers
              </h2>
            </>
          )}

          {selectedChart === "orders" && (
            <>
              <BarChart
                horizontal={true}
                data_1={orders}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
                legendValue={false}
              />
              <h2 className="uppercase my-8 text-center tracking-[2px] font-light">
                Orders Throughout the Year
              </h2>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default BarCharts;
