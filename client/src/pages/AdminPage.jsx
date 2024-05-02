import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function AdminPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [ItemDelete, setItemToDelete] = useState("");
  
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const [user, setuser] = useState([])
  console.log(user);

  

  const handleChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch(`/api/user/useral`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setuser(data.infoo);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCat();
  }, []);

  const handleEditClick = (userId) => {
    // Find the user with the corresponding _id
    const selected = user.find((u) => u._id === userId);
    if (selected) {
      setSelectedUser(selected);
      setEditModalOpen(true); // Open the edit modal
    } else {
      console.error(`User with _id ${userId} not found.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUser),
      });
      if (res.ok) {
        // Update user data in the state
        setuser(
          user.map((u) =>
            u._id === selectedUser._id ? { ...u, ...selectedUser } : u
          )
        );
        toast.success("User updated successfully");
        setEditModalOpen(false);
      } else {
        const error = await res.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };


  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `/api/user/delete/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setuser((prev) => prev.filter((item) => item._id !== ItemDelete));
        
        toast.success("Deleted");
      } else {
        console.log(data.message);
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div className="flex bg-slate-300 ">
      <div className="">
        <SideBar className="mt-[-200px]" />
      </div>
     

    
      <div className="flex flex-col gap-3 ml-[350px] mt-10 font-inter">
        <div>

          <h1 className="text-center font-serif text-slate-700 text-4xl text-secendoryColor">
            Manage Clients
          </h1>
        </div>
        <div>
          <Link to="/addnewuser">
          <button
             className="px-4 py-1 font-serif rounded-md bg-lime-600 hover:bg-mainColor text-white font-bold"
          >
            Add Client
          </button>
          </Link>
        </div>

        {/* display events list */}
        <div>
          <div>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase bg-mainColor dark:bg-mainColor text-black">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Added date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((user) => {
                      return (
                        <tr
                          key={user._id}
                          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {`${user.username} `}
                          </th>
                          <td className="px-6 py-4">{user.phone}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <button
                              onClick={() => handleEditClick(user._id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </button>
                            <button   onClick={() => {
                      setItemToDelete(user._id);
                      handleDeleteUser();
                    }} className="font-medium text-red-600 hover:underline">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        
        {editModalOpen && (
          <>
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="modal">
                    <div className="modal-content">
                      <div className="flex justify-center w-[400px] bg-white mx-auto rounded-xl p-5">
                        <form className="pt-4 w-full" onSubmit={handleSubmit}>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="username"
                              value={selectedUser.username}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                              placeholder=" "
                              required
                              onChange={handleChange}
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
                              name="phone"
                              value={selectedUser.phone}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                              placeholder=" "
                              required
                              maxLength={10}
                              onChange={handleChange}
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
                              name="email"
                              value={selectedUser.email}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                              placeholder=" "
                              required
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="email"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600"
                            >
                              Email
                            </label>
                          </div>

                          <div className="flex justify-between gap-1">
                            <button
                              type="submit"
                              className="bg-green-700 hover:bg-green-800 text-white px-2 py-2 rounded-md w-full cursor-pointer mt-5"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditModalOpen(false)}
                              className="bg-red-600 hover:bg-red-800 text-white px-2 py-2 rounded-md w-full cursor-pointer mt-5"
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        
      </div>
      </div>
   
  );
}
