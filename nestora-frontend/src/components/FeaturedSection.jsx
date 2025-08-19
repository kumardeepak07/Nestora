import React from 'react'
import Title from './Title'
import { assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import PropertyCard from './PropertyCard'
import { useNavigate } from 'react-router-dom'

const FeaturedSection = () => {
  const navigate = useNavigate();
  const {cars} = useAppContext()
  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div>
        <Title title='Featured Properties' subTitle='Explore our selection of premium properties available for your next stay'/>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {
            cars.slice(0,6).map((property) => (
                <div key={property.id}>
                    <PropertyCard property={property} />
                </div>
            ))
        }
      </div>
      <button onClick={()=>{
        navigate('/property-details'); scrollTo(0, 0);
      }} className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
        Explore all properties <img src={assets.arrow_icon} alt='arrow' />
      </button>
    </div>
  )
}

export default FeaturedSection
