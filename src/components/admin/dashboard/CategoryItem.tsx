
interface CategoryItemProps{
      color:string;
      value:number;
      heading:string;
}

const CategoryItem = ({color , value , heading} : CategoryItemProps) => (

      
      <div className="w-full flex justify-between items-center gap-2 p-4">
            
            <h5 className="tracking-[1px] font-light">{heading}</h5>
            <div className="ml-auto w-24 bg-[rgb(217,217,217)] rounded-[20px] h-2 flex-none">
                  <div 
                  className={`h-full rounded-[20px] bg-[${color}] w-[${value}%]`}></div>
            </div>
            <span className="text-[0.8rem] font-bold">{value}%</span>
      </div>
)

export default CategoryItem