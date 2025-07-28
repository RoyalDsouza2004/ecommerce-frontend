import { useState } from "react"

const Toss = () => {

  const [angle, setAngle] = useState<number>(0)

  const flipCoin = () =>{
    if(Math.random() > 0.5) setAngle((prev) => prev + 180)
      else setAngle((prev) => prev + 360)
  }

  return (
    <main className="bg-white p-16"> 
    <h1 className="text-3xl font-bold">Toss</h1>
    <section className="flex flex-col justify-center items-center gap-8 h-full">
      <article className={"m-8 h-60 w-60 relative cursor-pointer transform-style-preserve-3d transition-all"} onClick={flipCoin}
      style={{
        transform: `rotateY(${angle}deg)`
      }}>
        <div className="rounded-md h-full w-full absolute grid place-items-center bg-no-repeat bg-contain backface-hidden drop-shadow-lg"> </div>
        <div className="rounded-md h-full w-full absolute grid place-items-center bg-no-repeat bg-contain backface-hidden drop-shadow-lg"> </div>
      </article>
    </section>
    </main>
  )
}

export default Toss