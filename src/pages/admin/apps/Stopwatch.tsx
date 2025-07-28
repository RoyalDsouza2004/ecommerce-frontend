import { useEffect, useState } from "react";


const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};


const Stopwatch = () => {

  const [time, setTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID: number | NodeJS.Timeout;
    if(isRunning)
      intervalID = setInterval(()=>{
        setTime((prev) => prev + 1)
      } , 1000)

    return () => {
      clearInterval(intervalID);
      console.log("cleared")
    }
  }, [isRunning])
  

  return (
    <main className="bg-white p-16">
      <h1 className="text-3xl font-bold">Stopwatch</h1>
      <section className="flex flex-col justify-center items-center gap-8 h-full">
        <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
          <h2 className="text-3xl font-light text-center">{formatTime(time)}</h2>
        <button className="py-4 px-8 border-none cursor-pointer text-white m-8 font-bold rounded-[10px] bg-blue-600" 
        onClick={() => setIsRunning((prev) => !prev)}>{isRunning ? "Stop" : "Start"}</button>
          <button className="py-4 px-8 border-none cursor-pointer text-white m-8 font-bold rounded-[10px] bg-red-600" 
          onClick={resetHandler}>Reset</button>
        </div>
      </section>
    </main>
  )
}

export default Stopwatch