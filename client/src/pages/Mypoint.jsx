import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Run from "../img/girl.jpg";

export default function Mypoint() {
  const [garbageType, setGarbageType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [user, setuser] = useState(null);
  console.log(user);
  const CurrentuseId = currentUser ? currentUser._id : null;
  console.log(CurrentuseId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/userr/${CurrentuseId}`);
        const data = await response.json();
        console.log("dataa", data);

        if (response.ok) {
          setuser(data.user);
        } else {
          setuser("");
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [CurrentuseId]);

  const handleChange = (e) => {
    setGarbageType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!garbageType) {
      toast.error("Please select a garbage type.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/addpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentuserId: currentUser._id, // Assuming you have current user ID in your Redux state
          garbageType,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Points added successfully!");
        window.location.reload();
      } else {
        throw new Error(data.message || "Failed to add points");
      }
    } catch (error) {
      console.error("Failed to add points:", error);
      toast.error(error.message || "Failed to add points");
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <img src={Run} alt="" className="w-full h-[800px] object-cover " />

      <div className="absolute transform -translate-x-0 translate-y-0 top-20 ">
        <div className="bg-slate-400 mt-20 w-[600px] h-[200px] rounded-2xl ml-[480px] border border-white  bg-opacity-50">
          <form onSubmit={handleSubmit} className=" mt-20">
            <div className="flex justify-center items-center">
              <select
                id="garbageType"
                value={garbageType}
                onChange={handleChange}
                className="rounded-lg bg-white bg-opacity-50 border border-gray-300 text-gray-700 p-2 select-none  hover:border-gray-400 focus:outline-none"
              >
                <option value="">Select Garbage Type</option>
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                {/* More options can be added here */}
              </select>
            </div>
            <div className="ml-[220px] mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-800 bg-opacity-50 hover:opacity-45 font-serif text-white w-40 h-10 rounded-2xl"
              >
                {loading ? "Adding Points..." : "Add Points"}
              </button>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>
        </div>
        {user && (
          <div className="bg-slate-400 mt-20 w-[800px] h-[200px] rounded-2xl ml-[370px] border border-white  bg-opacity-50">
            <h1 className="flex justify-center items-center mt-2 font-serif text-3xl text-slate-300">
              Hi
            </h1>
            <div className="flex justify-center  items-center font-serif mt-5 text-slate-300  text-3xl">
              {user.username}
            </div>
            <div className="flex justify-center  items-center font-serif mt-5 text-slate-300  text-3xl">
              {user.points}
            </div>
            <h1 className="flex justify-center items-center mt-2 font-serif text-xl text-slate-300">
              Current Point
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
