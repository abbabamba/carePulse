import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border text-secondary rounded-xl text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "Sign up" : "log in"} to book appointment</p>
          {
            state === "Sign Up" 
            && 
            <div className="w-full">
            <p>Full Name</p>
            <input 
              className="border border-primary rounded w-full p-2 mt-1" 
              type='text' 
              onChange={(e) => setName(e.target.name)} 
              value={name} 
              required
            />
            </div>
          }


        <div className="w-full">
          <p>Email</p>
          <input 
            className="border border-primary rounded w-full p-2 mt-1" 
            type='email' 
            onChange={(e) => setEmail(e.target.name)} 
            value={email} 
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input 
            className="border border-primary rounded w-full p-2 mt-1" 
            type='password' 
            onChange={(e) => setPassword(e.target.name)} 
            value={password} 
            required
          />
        </div>
        <button className="bg-secondary text-primary w-full py-2 rounded-full text-base mt-4">
          {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {state === "Sign Up" 
          ? <p>Already have an account? <span onClick={()=>setState('Login')} className="text-primary underline font-bold cursor-pointer">login here</span></p>
          : <p>Create an new account ? <span onClick={()=>setState('Sign Up')} className="text-primary underline font-bold cursor-pointer">click here</span></p>}
      </div>
    </form>
  )
}

export default Login