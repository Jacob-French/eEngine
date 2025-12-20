import "./animationtest.css"

export default function AnimationTest(){

  return(
    <div>
      <h1 className="text-center">Animation Testing</h1>
      <div className="border-2 w-80/100 h-150 relative m-auto">
        
        {/*BOX 1*/}
        <div className={`
          w-50 h-32 left-45/100 top-50/100
          absolute
          bg-red-200 border-1 border-red-400
          z-1
          animation2
        `}>
        </div>

        {/*BOX 2*/}
        <div className={`
          w-50 h-25 left-45/100 top-55/100
          absolute
          bg-pink-200 border-1 border-pink-400  
          z-10
          animation2
        `}>
        </div>

        {/*BOX 3*/}
        <div className={`
          w-45 h-30 left-46/100 top-51/100
          bg-sky-400 border-sky-300
          absolute z-5
          card-move-animation card-order-animation
        `}>
          {/*INNER BOX*/}
          <div className={`
            w-45 h-30 bg-emerald-600 border-emerald-500 border-1
            absolute
            card-rotate-scale-animation
          `}>

          </div>
        </div>

      </div>
    </div>
  )
}