import React from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from "../redux/user/userSilce";

export default function () {
  const {currentUser} = useSelector((state) => state.user);

  const dispatch = useDispatch();


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#409649] to-[#f3f8f3] via-white text-white">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-serif text-xl shadow-lg shadow-green-800 h-8  rounded-full w-40  ">
            <div className="flex justify-center items-center  ">EcoCollect</div>
            </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="font-serif text-xl text-slate-700 hover:text-slate-900 ">Home</li>
          </Link>

          {currentUser && currentUser.UserManager && (<>
        <Link to="/userMange">
               <h1 className="font-serif text-xl text-slate-700 hover:text-slate-900">ManageUser</h1>
               </Link>
      
      
      </>)}  
          
         

            {currentUser ? (
              <>


<Link to={"/Blog"}>
                
                  <div
                   
                  className="font-serif text-xl text-slate-700 hover:text-slate-900"
                   
                  >
                    Blog
                  </div>
              
              </Link>
              
              <Link to="/point">
               <span className="font-serif text-xl text-slate-700 hover:text-slate-900">
                Point
               </span>
               </Link>
               <Link to="/profile">
               <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
               </Link>
               <span onClick={handleSignout} className=' cursor-pointer font-serif text-xl text-slate-700 hover:text-slate-900'>
               Sign Out
             </span>
             </>
            
               )
           
            :(
              <Link to="/sign-in" >
              <li className="font-serif text-xl text-slate-700 hover:text-slate-900">Sing In</li>
              </Link>
            )}
            
        
        </ul>
      </div>
    </div>
  );
}