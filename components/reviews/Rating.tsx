import { FaStar, FaRegStar } from 'react-icons/fa';

function Rating({rating}:{rating:number}) {
  const stars = Array.from({length:5},(_,i)=> i + 1 <= rating)
  return <div className='flex items-center gap-x-1'>
           {stars.map((isFilled,i)=>{
              const ClassName =  `w-3 h-3 ${isFilled?'text-primary':'text-grey-400'}`
              return isFilled ? (
               <FaStar className={ClassName} key={i} />
              ) : (
                <FaStar className={ClassName} key={i} />
              )
           })}
  </div>
}

export default Rating