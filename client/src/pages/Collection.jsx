
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

      <div className="flex flex-col gap-3 ml-[50px] mt-20  ">
       
        <div >

       
        <div className="flex flex-col gap-3 ml-[300px] font-inter">
      <div className="w-[600px] h-[300px] bg-gradient-to-r from-[#409649] to-[#f3f8f3] via-white rounded-md">
        <h1 className="text-center font-bold text-slate-800 text-3xl mt-5">
          Manage Collection
        </h1>
        <div className="flex flex-col gap-3 p-[20px]">
          <input type="text" name="" id="" placeholder="Collection name" />
          <input type="text" name="" id="" placeholder="Collection type" />
          <input type="text" name="" id="" placeholder="Other details" />
        </div>
        <div className="flex justify-center">
          <button className="px-[20px] py-[5px] bg-slate-300 rounded-xl ">
            Submit
          </button>
        </div>
      </div>
    </div>
        </div>
        

        
        

       
      </div>
    </div>
  )
}

