import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

interface WidgetItemProps {
      heading: string;
      value: number;
      percent: number;
      color: string;
      amount?: boolean;
    }

    const WidgetItem = ({ heading, value, percent, color, amount = false }: WidgetItemProps) => (
      <article className='w-64 bg-white shadow-md p-8 flex flex-row justify-between items-stretch gap-1 rounded-[10px]'>
        <div className="widgetInfo">
          <p className='opacity-[0.7] text-sm'>{heading}</p>
          <h4 className='font-bold text-[1.5rem]'>{amount ? `$${value}` : value}</h4>
          {
            percent > 0 ? <span className='text-green font-medium flex flex-row gap-1 items-center justify-start'>
              <HiTrendingUp /> +{percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
            </span> : <span className='r-red text-red-600 font-medium flex flex-row gap-1'>
              <HiTrendingDown /> {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
            </span>
          }
        </div>
    
        <div className='widgetCircle' style={{
          background: `conic-gradient(
            ${color} ${(Math.abs(percent) / 100 * 360)}deg ,
            rgb(255 , 255 , 255) 0
          )`
        }}>
          <span className='relative' style={{color}}>
            {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
            {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
          </span>
        </div>
      </article>
    );

export default WidgetItem