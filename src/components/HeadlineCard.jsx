import React from 'react'
import CARD from '../assets/bike.png';
import CARD1 from '../assets/bike.png';
import CARD2 from '../assets/bike.png';

const HeadlineCard = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
        {/* Card */}
        <div className='rounded-xl relative'>
            {/* Overlay */}
            <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>All Bikes Arranged</p>
                <p className='px-2'>Added  Daily</p>
                <button className='border-teal-600 text-white bg-teal-400 p-1 rounded-md border hover:bg-teal-600 hover:text-white m-1 bottom-4 absolute'>Order Now</button>
            </div>
            <img className='h-[50vh] md:max-h-full w-full object-fill rounded-xl' src={CARD} alt="/" />
        </div>
        {/* Card */}
        <div className='rounded-xl relative'>
            {/* Overlay */}
            <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>New Bikes</p>
                <p className='px-2'>Added  Daily</p>
                <button className='border-teal-600 text-white bg-teal-400 p-1 rounded-md border hover:bg-teal-600 hover:text-white m-1 bottom-4 absolute'>Order Now</button>
            </div>
            <img className='h-[50vh] md:max-h-full w-full object-fill rounded-xl' src={CARD1} alt="/" />
        </div>
        {/* Card */}
        <div className='rounded-xl relative'>
            {/* Overlay */}
            <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>Bikes Depot</p>
                <p className='px-2'>Added  Daily</p>
                <button className='border-teal-600 text-white bg-teal-400 p-1 rounded-md border hover:bg-teal-600 hover:text-white m-1 bottom-4 absolute'>Order Now</button>
            </div>
            <img className='h-[50vh] container md:max-h-full w-full object-fill rounded-xl' size={30} src={CARD2} alt="/" />
        </div>
    </div>
  )
}

export default HeadlineCard