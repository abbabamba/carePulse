import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctor = () => {
  const {speciality} = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const {doctors } = useContext(AppContext)

  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [speciality, doctors])

  return (
    <div className="mt-20">
      <p className="text-dark-200 font-medium text-2xl">Browse through the doctors specialist.</p>
      <hr className="bg-primary h-[50px] border-none"/>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-10">
          <button 
            onClick={()=>setShowFilter(prev => ! prev)} 
            className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-secondary text-primary" : ""}`}>
          Filters
          </button>
        <div className={`flex-col gap-4 text-sm text-secondary ${showFilter ? "flex":"hidden sm:flex"}`}>
          <p onClick={()=>speciality === 'General physician'? navigate('/doctors'): navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-10 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-secondary text-white" : ""}`}>General physician</p>
          <p onClick={()=>speciality === 'Gynecologist'? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-secondary text-white" : ""}`}>Gynecologist</p>
          <p onClick={()=>speciality === 'Dermatologist'? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-secondary text-white" : ""}`}>Dermatologist</p>
          <p onClick={()=>speciality === 'Dentist'? navigate('/doctors'): navigate('/doctors/Dentist')} className={`w-[94vw]sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dentist" ? "bg-secondary text-white" : ""}`}>Dentist</p>
          <p onClick={()=>speciality === 'Cancer'? navigate('/doctors'): navigate('/doctors/Cancer')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Cancer" ? "bg-secondary text-white" : ""}`}>Cancer</p>
          <p onClick={()=>speciality === 'Chirurgie'? navigate('/doctors'): navigate('/doctors/Chirurgie')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Chirurgie" ? "bg-secondary text-white" : ""}`}>Chirurgie</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-6 gap-y-6">
          { 
            filterDoc.map((item, index) =>(
            <div 
                onClick={()=>navigate(`/appointments/${item._id}`)}
                key={index} 
                className="border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500 shadow-md">
                <img src={item.image}
                    className="bg-white object-fill h-48 w-96" alt=""   
                    />
                <div className="p-2 bg-primary/25">
                    <div className="flex items-center gap-2 text-sm text-center text-primary font-medium">
                        <p className="w-2 h-2 bg-green-600 rounded-full"></p> <p>Available</p>
                    </div>
                    <p className="text-secondary font-medium">{item.name}</p>
                    <p className="text-secondary text-sm">{item.speciality}</p>
                </div>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor
