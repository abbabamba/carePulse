import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {

  const {doctors} = useContext(AppContext)
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-secondary border-b">My Appointments</p>
      <div>
        {doctors.slice(0,4).map((item, index) => (
        <div key={index} className="grid grid-cols-[1fr_2fr] sm:flex sm:gap-6 py-2 border-b border-primary/20">
          <div>
            <img src={item.image} alt="" className="w-32 bg-secondary rounded-lg shadow-md" />
          </div>

          <div className="flex-1 text-sm text-secondary">
            <p className="font-bold">{item.name}</p>
            <p className="font-medium">{item.speciality}</p>
            <p className="font-medium mt-1">Address: </p>
            <p className="text-xs">{item.address.line1}</p>
            <p className="text-xs">{item.address.line2}</p>
            <p className="text-sm mt-1">
            <span className="text-sm font-medium">Date & Time: </span>  
              12,07,2024 | 8:30PM</p>
          </div>

          <div></div>
          <div className="flex flex-col gap-2 justify-end">
            <button className=" text-center sm:min-w-48 border border-secondary px-8 py-2 text-primary rounded-full hover:bg-blue-600 hover:text-white hover:border-none">
              Pay online
            </button>
            <button className=" text-center sm:min-w-48 border bg-secondary px-8 py-2 text-primary rounded-full hover:bg-red-600 hover:text-white hover:border-none">
            Cancel appointment
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment