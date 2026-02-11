import React from 'react';
import {CgComedyCentral } from 'react-icons/cg';

const Footer = () => {
  return (
    <div className="mt-[6rem] m-auto p-[2rem] bg-gray-100 w-full">
    <div className="">
        <h1 className="text-2xl p-4">E-MONTIONX - <span className='font-bold'>SERVICES</span></h1>
    </div>
    <div className="flex text-center justify-center items-center text-[14px]">
    <CgComedyCentral size={20} />
    <p className='text-center'>E-MOTIONZ services</p>
    </div>
    </div>
  )
}

export default Footer