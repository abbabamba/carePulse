import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality, docId}) => {
    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()


    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)

        }
    }, [docId, speciality, doctors])


  return (
    <div className="flex flex-col items-center gap-4 text-secondary md:mx-10">
    <h1 className="text-3xl font-medium text-primary">Top Doctors to book </h1>
    <p className="sm:w-1/3 text-center text-sm">List of trusted  doctors,schedule an appointment.</p>
    <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0,5).map((item, index) =>(
        <div 
            onClick={()=>{navigate(`/appointments/${item._id}`); scrollTo(0,0)}}
            key={index} 
            className="border shadow-lg rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500 ">
            <img 
                src={item.image}
                className="bg-white object-fill h-48 w-96" 
                alt=""   
                />
            <div className="p-4 bg-primary/25">
                <div className="flex items-center gap-2 text-sm text-center text-primary">
                    <p className="w-2 h-2 bg-green-600 rounded-full"></p> <p>Available</p>
                </div>
                <p className="text-dark-200 font-medium">{item.name}</p>
                <p className="text-dark-200 text-sm">{item.speciality}</p>
            </div>
        </div>
        ))}
    </div>
</div>
  )
}

export default RelatedDoctors
