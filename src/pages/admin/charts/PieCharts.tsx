import { DoughnutChart, PieChart } from "../../../components/admin/Charts"

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { SkeletonLoader } from "../../../components/Loader"
import { usePieQuery } from "../../../redux/api/dashboardAPI"
import { RootState } from "../../../redux/store"

const PieCharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer)

  const { isLoading, data, isError } = usePieQuery(user?._id!)


  const order = data?.charts.orderFullfillment!
  const categories = data?.charts.productCategories!
  const stock = data?.charts.stockAvailablity!
  const revenue = data?.charts.revenueDistribution!
  const ageGroup = data?.charts.usersAgeGroup!
  const adminCustomer = data?.charts.adminCustomer!

  if (isError) return <Navigate to={"/admin/dashboard"} />

  return (
    <main className="bg-white p-16 overflow-y-auto max-sm:p-0">
      <h1 className="mb-20 ml-8 text-xl font-bold max-sm:m-0 max-sm:text-center">Pie & Doughnut Charts</h1>
      {
        isLoading ? <SkeletonLoader length={20} /> : <>
          <section className="w-[80%] my-16 mx-auto max-sm:my-32">
            <div className="max-w-96 m-auto mt-24 -mb-4">
              <PieChart labels={["Processing", "Shipped", "Delivered"]} data={[order.processing, order.shipped, order.delivered]}
                backgroundColor={[`hsl(110,80%, 80%)`, `hsl(110,80%, 50%)`, `hsl(110,40%, 50%)`,]} offset={[0, 0, 50]} />
              <h2 className="uppercase my-8 text-center tracking-[2px] font-light">Order Fullfillment ratio</h2>
            </div>
          </section>
          <section className="w-[80%] my-16 mx-auto max-sm:my-32">
            <div className="max-w-96 m-auto mt-24 -mb-4">
              <DoughnutChart labels={categories.map(i => Object.keys(i)[0])} data={categories.map(i => Object.values(i)[0])}
                backgroundColor={categories.map((i) => `hsl(${Object.values(i)[0] * Math.random() * 6},${Object.values(i)[0]}%, 50%)`)} offset={[0, 0, 0, 80]} legends={false} />
              <h2 className="uppercase my-8 text-center tracking-[2px] font-light">Product category ratio</h2>
            </div>
          </section>

          <section className="w-[80%] my-16 mx-auto max-sm:my-32">
            <div className="max-w-96 m-auto mt-24 -mb-4">
              <DoughnutChart labels={['In Stock', 'Out Of Stock']} data={[stock.inStock ,stock.outOfStock]}
                backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]} legends={false} offset={[0, 80]} cutout={"70%"} />
              <h2 className="uppercase my-8 text-center tracking-[2px] font-light">Stock Availability</h2>
            </div>
          </section>

          <section className="w-[80%] my-16 mx-auto max-sm:my-32">
            <div className="max-w-96 m-auto mt-24 -mb-4">
              <DoughnutChart labels={["Marketing Cost", "Discount", "Burnt", "Production Cost", "Net Margin"]}
                data={[revenue.marketingCost, revenue.discount, revenue.burnt, revenue.productionCost, revenue.netMargin]}
                backgroundColor={["hsl(110,80%,40%)", "hsl(19,80%,40%)", "hsl(69,80%,40%)", "hsl(300,80%,40%)", "rgb(53, 162, 255)"]}
                legends={false}
                offset={[20, 30, 20, 30, 80]} />
              <h2 className="uppercase my-8 text-center tracking-[2px] font-light">Revenue Distribution</h2>
            </div>
          </section>

          <section className="w-[80%] my-16 mx-auto max-sm:my-32">
            <div className="max-w-96 m-auto mt-24 -mb-4">
              <PieChart
                labels={["Teenager(Below 20)", "Adult (20-40)", "Older (above 40)"]}
                data={[ageGroup.teen, ageGroup.adult, ageGroup.old]}
                backgroundColor={[`hsl(10, 80%, 80%)`, `hsl(10, 80%, 50%)`, `hsl(10, 40%, 50%)`]}
                offset={[0, 0, 50]}
              />
              <h2 className="uppercase my-8 text-center tracking-[2px] font-light">Users Age Group</h2>
            </div>
          </section>

          <section className="w-[80%] my-16 mx-auto max-sm:my-32">
            <div className="max-w-96 m-auto mt-24 -mb-4">
              <DoughnutChart labels={["Admin", "Customers"]}
                data={[adminCustomer.admin, adminCustomer.customer]}
                backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                offset={[0, 80]} />
            </div>
          </section>
        </>
      }

    </main>
  )
}

export default PieCharts