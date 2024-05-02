import React, { useState } from 'react'
import SideBar from "../components/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function AddnewUser() {

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(formData)
    const navigate = useNavigate();

    const handlchange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
      };

   
      const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        try {
          setLoading(true);
          setErrorMessage(null);
    
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success === false) {
            return  toast.error(data.message);
           
          }
          setLoading(false);
          if (res.ok) {
            toast.success("User updated successfully");
            navigate("/userMange");
          }
        } catch (error) {
          setErrorMessage(error.message);
          setLoading(false);
          toast.error(error.message);
        }
      };







  return (
    <div className="flex bg-slate-300 ">
      <div className="">
        <SideBar className="mt-[-200px]" />
      </div>

      <div className="flex flex-col gap-3 ml-[450px] mt-10  ">
       
        <div >

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="modal">
                    <div className="modal-content">
                      <div className="flex justify-center w-[400px] bg-white mx-auto rounded-xl p-5">
                        <form className="pt-4 w-full"  onSubmit={handleSubmit} >
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              id="username"
                            
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                              placeholder=" "
                              required
                              onChange={handlchange}
                            />
                            <label
                              htmlFor="username"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600"
                            >
                              Username
                            </label>
                          </div>

                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              id="phone"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                              placeholder=" "
                              required
                              maxLength={10}
                              onChange={handlchange}
                            />
                            <label
                              htmlFor="phone"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600"
                            >
                              Phone
                            </label>
                          </div>

                          
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="email"
                              id="email"
                              onChange={handlchange}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                              placeholder=" "
                              required
                             
                            />
                            <label
                              htmlFor="email"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600"
                            >
                              Email
                            </label>
                          </div>


                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="password"
                              id="password"
                              onChange={handlchange}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                              placeholder=" "
                              required
                             
                            />
                            <label
                              htmlFor="password"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600"
                            >
                              Password
                            </label>
                          </div>

                          <div className="flex justify-between gap-1">
                            <button
                              type="submit"
                              className="bg-green-700 hover:bg-green-800 text-white px-2 py-2 rounded-md w-full cursor-pointer mt-5"
                            >
                              Save Changes
                            </button>
                          
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
        

        
        

       
      </div>
    </div>
  )
}
