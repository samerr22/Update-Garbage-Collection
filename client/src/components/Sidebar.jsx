import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="bg-gradient-to-r from-[#409649] to-[#f3f8f3] via-white h-[550px] w-[220px]">
    <div className="w-[200px] bg-mainColor  fixed top-[-200px] bottom-0 left-0 flex justify-center items-center">
      <div className=" flex flex-col gap-5">
       <Link to="/collection">
        <button 
         className="bg-white shadow-lg shadow-slate-600 font-semibold w-[150px] h-[40px] rounded-md hover:bg-green-800 hover:text-white">Collection</button>
       </Link>
       <Link to="/userMange">
        <button
       
        className="bg-white shadow-lg shadow-slate-600 font-semibold w-[150px] h-[40px] rounded-md hover:bg-green-800 hover:text-white">Clients</button>
        </Link>

          <Link to="/reword">
        <button
     
        className="bg-white shadow-lg shadow-slate-600 font-semibold w-[150px] h-[40px] rounded-md hover:bg-green-800 hover:text-white">Reward Score</button>
</Link>
        <button className="bg-white shadow-lg shadow-slate-600 font-semibold w-[150px] h-[40px] rounded-md hover:bg-green-800 hover:text-white">Special Notices</button>
      </div>
    </div>
    </div>
  );
}

export default SideBar;
