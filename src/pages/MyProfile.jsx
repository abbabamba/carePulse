import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "John Doe",
    image:assets.profile_pic,
    email: "johndoe@gmail.com",
    phone: "+33 041 94 96 52",
    address:{
      line1: "123, Main Street",
      line2: "Paris, France",
    },
    gender:"Male",
    dob: "01/01/1990",
  })

  const [isEdit, setIsEdit] = useState(false)
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img src={userData.image} className="w-36 rounded"/>
      {isEdit 
      ? <input 
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type='text' 
          value={userData.name} 
          onChange={e => setUserData(prev =>({...prev, name:e.target.value}))}/>
      : <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      }
      <hr className="bg-primary h-[1px] border-none"/>
      <div>
        <p className="text-secondary underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-secondary">
          <p className="font-medium">Email:</p>
          <p className="text-gray-600">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit 
            ? <input 
                type='text' 
                value={userData.phone} 
                onChange={e => setUserData(prev =>({...prev, phone:e.target.value}))}
                className="bg-gray-100 max-w-52"
              />
            : <p className="text-gray-600">{userData.phone}</p>
            }
            <p className="text-secondary">Address:</p>
            {
            isEdit
            ? <p>
              <input 
                type='text' 
                value={userData.address.line1} 
                onChange={(e)=>setUserData(prev =>({...prev, address:{...prev.address, line1: e.target.value}}))}
                className="bg-gray-50"
                />
              <br/>
              <input 
                type='text'value={userData.address.line2} 
                onChange={(e)=>setUserData(prev =>({...prev, address:{...prev.address, line2: e.target.value}}))}
                className="bg-gray-50"
                />
            </p>
            : <p className="text-gray-600">
              {userData.address.line1}
              <br/>
              {userData.address.line2}
              </p>
            }
        </div>
      </div>

      <div>
        <p className="text-secondary underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-secondary">
          <p className="font-medium">Gerder:</p>
          {isEdit 
          ? <select 
              onChange={(e)=> setUserData(prev =>({...prev, gender: e.target.value}))} 
              value={userData.gender}
              className="max-w-20 bg-gray-100"
            >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
          : <p className="text-gray-600">{userData.gender}</p>
          }
        <p className="font-medium">Birthday:</p>
        {
        isEdit 
        ? <input 
            className="max-w-28 bg-gray-100"
            type='date' 
            onChange={(e)=> setUserData(prev =>({...prev, dob: e.target.value}))} 
            value={userData.dob}/>
        : <p className='text-gray-600'>{userData.dob}</p>
        }
        </div>
      </div>

      <div className="mt-10">
        {isEdit
        ? <button 
          className="border border-primary px-8 py-2 bg-secondary text-primary rounded-full hover:bg-primary hover:text-white" 
          onClick={()=> setIsEdit(false)}>
          Save information
          </button>
        : <button
          className="border border-primary px-8 py-2 bg-secondary text-primary rounded-full hover:bg-primary hover:text-white"  
          onClick={()=> setIsEdit(true)}>
          Edit information
          </button>
        }
      </div>
    </div>
  )
}

export default MyProfile
