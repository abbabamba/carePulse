import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-xl pt-20 text-dark-200">
        <p>CONTACT <span className="font-semibold text-primary text-2xl">US</span></p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img 
          src={assets.contact_image} 
          alt=''
            className="w-full md:max-w-[360px] rounded-xl shadow-xl border-l-8 border-primary"
          />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-primary text-lg">OUR OFFICE</p>
          <p className="text-gray-500">33 rue centre ville <br/> 75001 Paris</p>
          <p className="text-gray-500">Tel: +33 00 00 00 00 <br/> Email: doctorpro@care.fr</p>
          <p className="font-semibold text-lg text-dark-200"> Career at Carepulse </p>
          <p className="text-gray-500">Learn more about our teams and job openings</p>

          <button className="border-2 border-primary bg-dark-200 px-8 py-2 text-sm rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-300">Explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact