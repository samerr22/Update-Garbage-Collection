import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import OnlyuserMangeprivt from "./components/OnlyuserMangeprivt";
import CreatePost from "./pages/CreatePost";
import Updateinfo from "./pages/Updateinfo";
import Rewerdpage from "./pages/Rewerdpage";
import Blog from "./pages/Blog";
import AdminPage from "./pages/AdminPage";
import AddnewUser from "./pages/AddnewUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Collection from "./pages/Collection";
import Mypoint from "./pages/Mypoint";
import DashProfile from "./components/DashProfile";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Blog" element={<Blog />} />

        <Route element={<PrivateRoute />}>
        <Route path="/point" element={<Mypoint />} />
        <Route path="/profile" element={<DashProfile />} />

        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-info/:infooId" element={<Updateinfo />} />
        </Route>
        <Route element={<OnlyuserMangeprivt />}>
        <Route path="/userMange" element={<AdminPage />} />
        <Route path="/addnewuser" element={<AddnewUser />} />
        <Route path="/reword" element={<Rewerdpage />} />
        <Route path="/collection" element={<Collection />} />
        </Route>


      </Routes>

      <ToastContainer/>
      
      <Footer />
    </BrowserRouter>
  );
}
