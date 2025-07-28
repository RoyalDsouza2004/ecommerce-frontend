import toast from "react-hot-toast";
import { BarChart } from "../../../components/admin/Charts"
import { CustomError } from "../../../types/api-types";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { SkeletonLoader } from "../../../components/Loader";
import { getLastMonths } from "../../../utils/features";


const {last6Months , last12Months}= getLastMonths()

const BarCharts = () => {

      const { user } = useSelector((state: RootState) => state.userReducer)

      const { isLoading, data, error, isError } = useBarQuery(user?._id!)

      const products = data?.charts.products || []
      const orders = data?.charts.orders || []
      const users = data?.charts.users || []


      if (isError) {
            const err = error as CustomError
            toast.error(err.data.message)
      }

      return (
            <main className="bg-white p-16 overflow-y-auto max-sm:p-0">
                  <h1 className="mb-20 ml-8 text-xl font-bold max-sm:m-0 max-sm:text-center">Bar Charts</h1>
                  {
                        isLoading ? <SkeletonLoader length={20} /> :
                              <>
                                    <section className="w-[80%] my-16 mx-auto max-sm:my-32">
                                          <BarChart
                                                data_1={products}
                                                data_2={users}
                                                labels={last6Months}
                                                title_1="Products"
                                                title_2="Users"
                                                bgColor_1={`hsl(260,50%,30%)`}
                                                bgColor_2={`hsl(360,90%,90%)`} />
                                          <h2 className="uppercase my-8 text-center tracking-[2px] font-light">Top Selling Products & top customers</h2>
                                    </section>
                                    <section className="w-[80%] my-16 mx-auto max-sm:my-32">
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
                                          <h2 className="uppercase my-8 text-center tracking-[2px] font-light">Orders throughout the year</h2>
                                    </section>
                              </>
                  }
            </main>
      )
}
export default BarCharts