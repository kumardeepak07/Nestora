import React from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'




const Hero = () => {
  const [propertyLocation, setPropertyLocation] = React.useState('')
  const {checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, navigate} = useAppContext()

  const handleSearch = (e)=>{
    e.preventDefault()
    navigate('/properties?propertyLocation=' + propertyLocation + '&checkInDate=' + checkInDate + '&checkOutDate=' + checkOutDate)
    
  }

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.8}}
    className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
      <motion.h1 
      initial={{y: 50, opacity: 0}}
      animate={{y:0, opacity: 1}}
      transition={{duration: 0.8, delay: 0.2}}
      className='text-4xl md:text-5xl font-semibold'>Affordable Luxury on Rent</motion.h1>

      <motion.form 
      initial={{scale: 0.95, opacity: 0, y:50}}
      animate={{scale: 1, opacity: 1, y:0}}
      transition={{duration: 0.6, delay: 0.4}}
      onSubmit={handleSearch} className='flrx flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
          <div className='flex flex-col items-start gap-2'>
            <select required value={propertyLocation} onChange={(e) => setPropertyLocation(e.target.value)} >
              <option value="">Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <p className='px-1text-sm text-gray-500'>{propertyLocation ? propertyLocation : 'Please Select location'}</p>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='pickup-date'>Check-In Date</label>
            <input value={checkInDate} onChange={e=>setCheckInDate(e.target.value)} type='date' id='pickup-date' min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='return-date'>Check-Out Date</label>
            <input value={checkOutDate} onChange={e=>setCheckOutDate(e.target.value)} type='date' id='return-date' className='text-sm text-gray-500' required />
          </div>
          <motion.button 
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
            <img src={assets.search_icon} alt='search' className='brightness-300' />
            Search
          </motion.button>
        </div>
        
      </motion.form>
      
      <motion.img 
      initial={{y: 100, opacity: 0}}
      animate={{y:0, opacity: 1}}
      transition={{duration: 0.8, delay: 0.6}}
      src={assets.main_car} alt='car' className='max-h-74' />
    </motion.div>
  )
}

export default Hero
