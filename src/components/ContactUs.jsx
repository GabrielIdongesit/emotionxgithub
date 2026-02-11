import React from 'react';
import BIKE from '../assets/bike.png';

import { TfiLocationPin } from "react-icons/tfi";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

const ContactUs = () => {
  return (
    <div className='py-[3rem] px-5 pt-[6rem] bg-heroimage'>
            <div className='grid grid-cols lg:grid-cols-2 container gap-x-6 mx-auto'>
                <div>
                    <h1 className='text-4xl md:text-4xl lg:text-6xl font-bold'>Our Dream is <br />Global Service <br />Transformation</h1>
                    <div className='py-[2rem]'>
                        <p className='lg:text-[18px] text-[15px] font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex fuga explicabo dolorum molestiae dolor commodi quibusdam dolorem placeat porro dicta?</p>
                    </div>
                    <div className='flex flex-row lg:flex-row lg:justify-between'>
                        <div>
                            <div className="flex items-center ">
                                <div className='bg-white/10 lg:w-10 w-10 lg:h-20 rounded-full flex items-center justify-center text-blue text-xl lg:text-4xl'>
                                    <FiPhoneCall />
                                </div>
                                <div>
                                    <div className="text-xl font-bold lg:text-[20px]">30+</div>
                                    <div className='text-gray-500 font-semibold text-[10px] '>emotionxbike@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <div className='bg-white/10 lg:w-10 w-10 lg:h-20 rounded-full flex items-center justify-center text-blue text-xl lg:text-4xl'>
                                <AiOutlineMail />
                            </div>
                            <div>
                                <div className="text-xl font-bold lg:text-[20px]">10+</div>
                                <div className='text-gray-500 text-[10px] font-semibold'>Trusted customers service</div>
                                <div className='text-gray-500 text-[10px] font-semibold'>emotionxbike@gmail.com</div>

                            </div>
                        </div>
                        <div className="flex items-center ">
                            <div className='bg-white/10 lg:w-10 w-10 lg:h-20 rounded-full flex items-center justify-center text-blue text-xl lg:text-4xl'>
                                <TfiLocationPin />
                            </div>
                            <div>
                                <div className="text-xl font-bold lg:text-[20px]">195</div>
                                <div className='text-gray-500 font-semibold text-[10px]'>Countries Supported</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div > */}
                <img className='shadow-2xl mt-2 lg:mt-[-40px] p-2' src={BIKE} alt='' />
                {/* </div> */}
            </div>

        </div>
  )
}

export default ContactUs