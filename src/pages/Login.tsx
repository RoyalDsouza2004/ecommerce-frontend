import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import toast from "react-hot-toast"
import { BiArrowBack } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { useLoginMutation } from "../redux/api/userAPI"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { MessageResponse } from "../types/api-types"

const Login = () => {

      const navigate = useNavigate()

      const [gender, setGender] = useState<string>("")
      const [date, setDate] = useState<string>("")

      const [login] = useLoginMutation()

      const loginHandler = async () => {
            try {
                  const provider = new GoogleAuthProvider();

                  const { user } = await signInWithPopup(auth, provider);

                  const res = await login({
                        name: user.displayName!,
                        email: user.email!,
                        photo: user.photoURL!,
                        gender,
                        dob: date,
                        _id: user.uid

                  })

                  if("data" in res){
                        toast.success(res.data?.message! )
                        
                  }else{
                        const error = res.error as FetchBaseQueryError
                        const message =(error.data as MessageResponse).message
                        toast.error(message)
                  }
                  return navigate("/")


            } catch (error) {
                  toast.error("Sign in Fail")
            }
      }

      return (
            <div className="h-[90vh] flex flex-col justify-center items-center gap-4">
                  <button className="h-10 w-10 bg-lightblack text-white flex justify-center items-center fixed top-20 left-8 rounded-full shadow-md max-sm:top-16" onClick={() => navigate("/")}><BiArrowBack className=" transition-all hover:-translate-x-1" /></button>
                  <main className="w-full h-[80%] max-w-sm p-8 shadow-2xl flex flex-col justify-center items-stretch gap-4">
                        <h1 className="uppercase font-light tracking-tighter text-3xl mb-8 text-center">Login</h1>
                        <div className="flex flex-col justify-center items-stretch gap-1">
                              <label>Gender:</label>
                              <select value={gender} onChange={e => setGender(e.target.value)} className="input font-montserrat">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                              </select>
                        </div>
                        <div className="flex flex-col justify-center items-stretch gap-1">
                              <label>Date of Birth:</label>
                              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input font-montserrat" />
                        </div>

                        <div>
                              <p className="m-8 text-center">Already Signed in Once</p>
                              <button className="w-[70%] m-auto h-12 p-4 cursor-pointer flex gap-4 items-center bg-[#2c25ff] text-white rounded-md hover:opacity-80" onClick={loginHandler}>
                                    <FcGoogle /> <span className="w-full">Sign in with Google</span>
                              </button>
                        </div>
                  </main>
            </div>
      )
}

export default Login