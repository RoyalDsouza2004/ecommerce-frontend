
import { BiMaleFemale } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BarChart, DoughnutChart } from '../../components/admin/Charts';
import CategoryItem from '../../components/admin/dashboard/CategoryItem';
import DashboardTable from '../../components/admin/dashboard/DashboardTable';
import WidgetItem from '../../components/admin/dashboard/WidgetItem';
import { SkeletonLoader } from '../../components/Loader';
import { useStatsQuery } from '../../redux/api/dashboardAPI';
import { RootState } from '../../redux/store';
import { getLastMonths } from '../../utils/features';

const { last6Months: months } = getLastMonths()


const Dashboard = () => {

  const { user } = useSelector((state: RootState) => state.userReducer)

  const { isLoading, data, isError } = useStatsQuery(user?._id!)

  const stats = data?.stats!

  if (isError) return <Navigate to={"/"} />

  return (
    <main className='overflow-y-auto'>

      {
        isLoading ? <SkeletonLoader length={20} /> : <>
          <section className='flex flex-row justify-between items-stretch gap-8 p-[2rem_2rem_2rem_0] max-xl:justify-center max-xl:flex-wrap max-sm:pl-12'>
            <WidgetItem percent={stats.changePercent.revenue} amount={true} value={stats.count.revenue} heading='Revenue' color='rgb(0,115,255)' />
            <WidgetItem percent={stats.changePercent.user} value={stats.count.user} heading='Users' color='rgb(0,198,202)' />
            <WidgetItem percent={stats.changePercent.order} value={stats.count.order} heading='Transactions' color='rgb(255,196,0)' />
            <WidgetItem percent={stats.changePercent.product} value={stats.count.product} heading='Products' color='rgb(76,0,255)' />
          </section>

          <section className="flex gap-8 p-[0_2rem_2rem_0] max-xl:justify-center max-xl:p-8 max-xl:flex-wrap">
            <div className="bg-white rounded-[10px] w-full px-4 py-12">
              <h2 className='tracking-[3px] font-light uppercase m-[1rem_0_2rem_0.25rem] text-center'>Revenue & Transactions</h2>
              <BarChart
                labels={months}
                data_1={stats.chart.revenue}
                data_2={stats.chart.order}
                title_1='Revenue' title_2='Transaction'
                bgColor_1='rgb(0,115,255)' bgColor_2='rgba(53,162,235,0.8)'
              />
            </div>

            <div className="bg-white rounded-[10px] w-full max-w-64 flex flex-col justify-center pb-8">
              <h2 className='tracking-[3px] font-light uppercase m-[1.5rem_0_2rem_0] text-center'>Inventory</h2>
              <div className='overflow-y-auto pl-2'>
                {
                  stats?.categoryCount.map((i) => {

                    const [heading, value] = Object.entries(i)[0]

                    return (
                      <CategoryItem key={i.heading} heading={heading} value={value} color={`hsl(${value},${value}%,50%)`} />
                    )
                  })
                }
              </div>
            </div>
          </section>

          <section className='flex gap-8 p-[0_2rem_2rem_0] h-[30rem] max-xl:justify-center max-xl:p-8 max-xl:flex-wrap max-xl:h-[unset]'>
            <div className='bg-white shadow-md rounded-xl w-full max-w-80 p-4 relative'>
              <h2 className='text-center m-[1.5rem_0_2rem_0] tracking-[3px] font-light uppercase'>Gender Ratio</h2>
              <DoughnutChart labels={['Female', 'Male']} data={[stats.userRatio.female, stats.userRatio.male]} backgroundColor={['hsl(340,82%,56%)', 'rgba(53,162,235,0.8)']} cutout={90} />
              <p className='center text-[2rem] text-[rgba(0,0,0,0.634)] '><BiMaleFemale /></p>
            </div>

            <DashboardTable data={stats.latestTransactions} />
          </section></>
      }

    </main>

  )
}


export default Dashboard