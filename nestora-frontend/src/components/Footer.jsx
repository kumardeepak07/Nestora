import React from 'react'
import { assets } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <motion.div 
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.6}}
    className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <motion.div 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.2}}
            className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
                <div>
                    <motion.img 
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.3}}
                    src={assets.nestora_logo} alt="logo" className='h-8 md:h-20' />
                    <motion.p 
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.4}}
                    className='max-w-80'>
                        Discover the world of luxury travel with StayVenture. From stunning villas to exclusive experiences, we curate unforgettable stays for discerning travelers.
                    </motion.p>
                    <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.5}}
                    
                    className='flex items-center gap-3 mt-6'>
                        <a href="#"><img src={assets.facebook_logo} alt="Facebook" className='w-5 h-5' /></a>
                        <a href="#"><img src={assets.instagram_logo} alt="Instagram" className='w-5 h-5' /></a>
                        <a href="#"><img src={assets.twitter_logo} alt="Twitter" className='w-5 h-5' /></a>
                        <a href="#"><img src={assets.gmail_logo} alt="LinkedIn" className='w-5 h-5' /></a>
                    </motion.div>
                </div>
                <motion.div 
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.4}}
                className='flex flex-wrap justify-between w-1/2 gap-8'>
                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Browse Properties</a></li>
                            <li><a href="#">List Your Property</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">List Your Property</a></li>
                            <li><a href="#">Insurance</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li>123, A Street</li>
                            <li>Paris, France</li>
                            <li>+2 344 444444</li>
                            <li>stay@nestora.com</li>
                        </ul>
                    </div>
                </motion.div>
                

            </motion.div>
            
            <motion.div 
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.6}}
            className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Nestora. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li> | </li>
                    <li><a href="#">Terms</a></li>
                    <li> | </li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </motion.div>
        </motion.div>
  )
}

export default Footer
