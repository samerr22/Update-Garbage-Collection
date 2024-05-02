import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import Run from "../img/man.jpg";


export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  console.log(formData);

  const navigate = useNavigate();

  const handleUploadVideo = async () => {
    try {
      if (!file) {
        setUploadError("Please select a video");
        return;
      }
      setUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadError("Video upload failed");
          setUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadProgress(null);
            setUploadError(null);
            setFormData({ ...formData, video: downloadURL });
          });
        }
      );
    } catch (error) {
      setUploadError("Video upload failed");
      setUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/Info/createe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div>
   
   <img src={Run} alt="" className="w-full h-[800px] object-cover " />


<div className="absolute transform -translate-x-0 translate-y-0 top-20 ">
    <div className="p-3 max-w-3xl mx-auto min-h-screen ml-[450px]  ">
      <div className="bg-slate-400  mt-5 w-[600px] h-20 rounded-2xl   border border-white  bg-opacity-50">
        
      <h1 className="text-center text-3xl font-serif text-slate-700">
      Hy Admin
      </h1>
      <h1 className="text-center text-xl  font-serif text-slate-300">
      Add you new video
      </h1>
     
      </div>
      <form className="flex flex-col mt-2 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
         
        <input
              type="text"
              placeholder="Name"
              required
              id="name"
              className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            
            />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-none  p-3">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 bg-white rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            className=" font-serif text-slate-800  hover:text-white bg-green-500 hover:bg-green-700 bg-opacity-60  shadow-xl font-bold py-2 px-4  rounded-full"
            size="sm"
            onClick={handleUploadVideo}
            disabled={uploadProgress}
          >
            {uploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Video"
            )}
          </button>
        </div>
        {uploadError && (
          <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
            {uploadError}
          </p>
        )}
        {formData.video && (
          <video
            controls
            src={formData.video}
            className="w-full h-72 object-cover"
          />
        )}

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="description"
            required
            id="description"
            maxLength={40}
            className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
            onChange={(e) => setFormData({ ...formData,   description: e.target.value })}
          />

         
        </div>

        <button
          type="submit"
          className=" font-serif text-slate-800  hover:text-white bg-green-500 hover:bg-green-700 bg-opacity-60  shadow-xl font-bold py-2 px-4 lg:w-full  rounded-full w-[460px] h-11 "
        >
        Publish Video
        </button>
        {publishError && (
          <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
            {publishError}
          </p>
        )}
      </form>
    </div>
</div>
    </div>
  );
}
