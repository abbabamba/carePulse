import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from './RelatedDoctors'

const Appointment = () => {

  const {docId}= useParams()
  const {doctors, currencySymbol} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    //getting current date
    let today = new Date()

    for(let i=0; i<7; i++){
      //getting date with index 
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      //setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate()+ i)
      endTime.setHours(19,0,0,0)

      //setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+ 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes()> 30 ? 30 : 0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      //getting available slots
      let timeSlots = []

      while (currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

        // add slot to timeSlots
        timeSlots.push({
          datetime: new Date(currentDate),
          time : formattedTime
        })
        //incrementing time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes()+ 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]) )
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [docId, doctors])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])


  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      {/* ----------Doctors details-------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt=''/>
        </div>

        <div className="flex-1 border border-gray-200 rounded-lg p-8 py-7 bg-gray-100 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ----------Doctors info-------- */}
          <p className="flex items-center gap-2 text-2xl font-bold text-dark-200 ">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt=''/>
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-sm rounded-full">{docInfo.experience}</button>
          </div>
          {/* ----------Doctors info-------- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-bold text-dark-200  mt-3">
              About <img src={assets.info_icon}/>
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{docInfo.fees} {currencySymbol} </span>
          </p>
        </div>
      </div>

      {/* ----------Booking slot-------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-secondary">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          { docSlots.length && docSlots.map((item, index)=>(
            <div 
              onClick={()=>setSlotIndex(index)} 
              key={index} 
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white": "border border-gray-200"}`}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length && docSlots[slotIndex].map((item, index)=>(
            <p 
              onClick={()=>setSlotTime(item.time)}
              key={index} 
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white": "text-secondary border border-gray-300"}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
          <button className="bg-secondary text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book an appointment
          </button>
      </div>
      {/* ----------listing related doctors-------- */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
