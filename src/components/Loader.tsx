const Loader = () => {
  return (
    <section className='w-full h-[100vh] flex justify-center items-center'><div className="h-40 w-40 rounded-[50%]  border-t-[1rem] border-black border-l-[1rem] animate-spin border-r-[1rem] border-b-[1rem] border-r-white border-b-white"></div></section>
  )
}

interface SkeletonProps { width?: string, length?: number }


export const SkeletonLoader = ({ width = "w-full", length = 3 }: SkeletonProps) => {

  const skeletons = Array.from({ length }, (_, idx) => <div key={idx} className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2.5"></div>)
  return <div role="status" className={`animate-pulse ${width}`}>
    {skeletons}
  </div>
}

export default Loader