import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Run from "../img/group.jpg";
import { toast } from "react-toastify";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const [info, setinfo] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [infoId, setinfoId] = useState("");

  console.log("arra", info);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/Info/getinfo`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setinfo(data.infoo);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchInfo();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/Info/deleted/${infoId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setinfo((prev) => prev.filter((infooo) => infooo._id !== infoId));
        toast.success("deleted");
      } else {
        console.log(data.message);
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <img src={Run} alt="" className="w-full h-[800px] object-cover " />

      <div className="absolute transform -translate-x-0 translate-y-0 top-20 ">
        <div className=" ">
          <div className="flex justify-center items-center gap-4">
            {currentUser?.isAdmin && (
              <>
                <Link to={"/create-post"}>
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                      className="hidden sm:inline font-serif text-slate-800  hover:underline bg-green-500 hover:bg-green-700 bg-opacity-60  shadow-xl font-bold py-2 px-4  rounded-full"
                      type="button"
                    >
                      Add New Video
                    </button>
                  </div>
                </Link>
              </>
            )}
          </div>

          <div className="flex justify-center">
            <div className="max-h-[700px] mt-4 overflow-y-auto">
              <div className="flex flex-wrap justify-center">
                {info && info.length > 0 ? (
                  <>
                    {info.map((infooo) => (
                      <div
                        key={infooo._id}
                        className="w-[380px] h-[300px] ml-8 bg-slate-200 bg-opacity-45 border shadow-lg shadow-black  mt-20 mb-10 gap-10 rounded-2xl  "
                      >
                        <div className="px-6 py-4  ">
                          <div className="flex justify-center items-center ">
                            <video
                              className="w-[300px] h-[200px] rounded-xl"
                              controls
                            >
                              <source src={infooo.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>

                          <div className="flex justify-center items-center mt-2">
                            <div className="font-serif text-slate-700  text-xl mb-2 truncate">
                              {infooo.name}
                            </div>
                          </div>

                          <div className="flex justify-center items-center">
                            <div className="text-gray-700  font-extralight max-w-[200px] break-words truncate">
                              {infooo.description}
                            </div>
                          </div>

                          {currentUser?.isAdmin && (
                            <>
                              <div className="flex justify-center items-center gap-8 mt-8">
                                <Link
                                  to={`/update-info/${infooo._id}`}
                                  className="hidden sm:inline font-serif  hover:underline bg-green-500 hover:bg-green-700 bg-opacity-70  shadow-xl text-slate-700   py-2 px-6 hover:text-white  rounded-full cursor-pointer"
                                >
                                  Edit
                                </Link>
                                <div>
                                  <span
                                    onClick={() => {
                                      setinfoId(infooo._id);
                                      handleDelete();
                                    }}
                                    className="hidden sm:inline  hover:underline bg-green-500 hover:bg-green-700  font-bold py-2 bg-opacity-70  shadow-xl text-slate-700 px-4 hover:text-white  rounded-full cursor-pointer"
                                  >
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No Video</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
