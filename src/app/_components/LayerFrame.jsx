export default function LayerFrame({ children }){

  return(
    <div className="border-2 border-violet-500 w-full h-full absolute flex flex-col justify-center items-center">
      {children}
    </div>
  )
}