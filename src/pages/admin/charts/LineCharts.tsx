import { useSelector } from "react-redux";
import { LineChart } from "../../../components/admin/Charts";
import { getLastMonths } from "../../../utils/features";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import { SkeletonLoader } from "../../../components/Loader";
import { useState } from "react";

const { last12Months: months } = getLastMonths();

const LineCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = useLineQuery(user?._id!);

  const [selectedChart, setSelectedChart] = useState<
    "users" | "products" | "revenue" | "discount"
  >("users");

  const products = data?.charts.products || [];
  const users = data?.charts.users || [];
  const revenue = data?.charts.revenue || [];
  const discount = data?.charts.discount || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <main className="bg-white p-16 overflow-y-auto max-sm:p-0">
      <h1 className="mb-8 ml-8 text-xl font-bold max-sm:m-0 max-sm:text-center">
        Line Charts
      </h1>

      {isLoading ? (
        <SkeletonLoader length={15} />
      ) : (
        <section className="w-[80%] my-16 mx-auto max-sm:my-32">
          {/* Dropdown */}
          <div className="flex justify-center mb-8">
            <select
              value={selectedChart}
              onChange={(e) =>
                setSelectedChart(
                  e.target.value as
                    | "users"
                    | "products"
                    | "revenue"
                    | "discount"
                )
              }
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
            >
              <option value="users">Active Users</option>
              <option value="products">Total Products (SKU)</option>
              <option value="revenue">Total Revenue</option>
              <option value="discount">Discount Allotted</option>
            </select>
          </div>

          <div className="mt-8">
            {selectedChart === "users" && (
              <>
                <LineChart
                  data={users}
                  label="Users"
                  borderColor="rgb(53, 162, 255)"
                  backgroundColor="rgba(53, 162, 255,0.5)"
                  labels={months}
                />
                <h2 className="uppercase my-8 text-center tracking-[2px] font-light">
                  Active Users
                </h2>
              </>
            )}

            {selectedChart === "products" && (
              <>
                <LineChart
                  data={products}
                  backgroundColor={"hsla(269,80%,40%,0.4)"}
                  borderColor={"hsl(269,80%,40%)"}
                  label="Products"
                  labels={months}
                />
                <h2 className="uppercase my-8 text-center tracking-[2px] font-light">
                  Total Products (SKU)
                </h2>
              </>
            )}

            {selectedChart === "revenue" && (
              <>
                <LineChart
                  data={revenue}
                  backgroundColor={"hsla(129,80%,40%,0.4)"}
                  borderColor={"hsl(129,80%,40%)"}
                  label="Revenue"
                  labels={months}
                />
                <h2 className="uppercase my-8 text-center tracking-[2px] font-light">
                  Total Revenue
                </h2>
              </>
            )}

            {selectedChart === "discount" && (
              <>
                <LineChart
                  data={discount}
                  backgroundColor={"hsla(29,80%,40%,0.4)"}
                  borderColor={"hsl(29,80%,40%)"}
                  label="Discount"
                  labels={months}
                />
                <h2 className="uppercase my-8 text-center tracking-[2px] font-light">
                  Discount Allotted
                </h2>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default LineCharts;
