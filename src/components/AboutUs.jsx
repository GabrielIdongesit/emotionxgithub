import React from 'react';
import BIKE from '../assets/bike.png';
import { HiChartBar, HiGlobe, HiUser } from 'react-icons/hi';

const AboutUs = () => {
    return (
        <div className='py-[5rem] px-5 pt-[6rem lg:pt-[0rem] bg-heroimage'>
            <div className='grid grid-cols lg:grid-cols-2 container gap-x-6 mx-auto'>
                <div>
                    <h1 className='text-4xl md:text-4xl lg:text-6xl font-bold'>Our Dream is <br />Global Service <br />Transformation</h1>
                    <div className='py-[2rem]'>
                        <p className='lg:text-[18px] text-[15px] font-semibold'>Ride into the future with confidence. Our electric bike site is your gateway to innovative, eco-friendly mobility—where smart technology meets powerful performance. Explore a world of stylish, durable, and energy-efficient e-bikes designed to make every journey smoother, faster, and more enjoyable. Whether you're commuting, adventuring, or simply riding for the joy of it, we bring you the perfect blend of comfort, speed, and sustainability.</p>
                    </div>
                    <div className='flex flex-row lg:flex-row lg:justify-between'>
                        <div>
                            <div className="flex items-center ">
                                <div className='bg-white/10 lg:w-10 w-10 lg:h-20 rounded-full flex items-center justify-center text-blue text-xl lg:text-4xl'>
                                    <HiChartBar />
                                </div>
                                <div>
                                    <div className="text-xl font-bold lg:text-[20px]">$30B</div>
                                    <div className='text-gray font-semibold text-[8px] '>Digital Currency Exchange</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <div className='bg-white/10 lg:w-10 w-10 lg:h-20 rounded-full flex items-center justify-center text-blue text-xl lg:text-4xl'>
                                <HiUser />
                            </div>
                            <div>
                                <div className="text-xl font-bold lg:text-[20px]">$10+</div>
                                <div className='text-gray text-[8px] font-semibold'>Trusted Wallets Investor</div>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <div className='bg-white/10 lg:w-10 w-10 lg:h-20 rounded-full flex items-center justify-center text-blue text-xl lg:text-4xl'>
                                <HiGlobe />
                            </div>
                            <div>
                                <div className="text-xl font-bold lg:text-[20px]">195</div>
                                <div className='text-gray font-semibold text-[8px]'>Countries Supported</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-[2rem] lg:px-10'>
                <img  size={20} src={BIKE} alt='' />
                </div>
            </div>

        </div>
    )
}

export default AboutUs