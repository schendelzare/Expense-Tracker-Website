import { AiFillGithub, AiOutlineFacebook } from "react-icons/ai";
import { Outlet, useNavigate, useSubmit } from "react-router-dom";

import NavBar from "../navbar";
import Alert from "../../UI/Alert";
import { useContext, useEffect } from "react";
import { Context } from "../context/context";
import getAuthToken from "../auth/getAuthToken";

const RootLayout = () => {
  //context data...
  const contextData = useContext(Context);
  const { alertIsShown, message, setAlertOff } = contextData;
  const token = getAuthToken();
  const submit = useSubmit();
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    setTimeout(() => {
      logoutHandler();
    }, 1 * 60 * 60 * 1000);
  }, [token, submit]);

  return (
    <div className="  ">
      <div className="flex max-w-[1200px] mx-auto justify-center ">
        {alertIsShown && <Alert onClick={setAlertOff}>{message}</Alert>}
      </div>
      <div className="">
        <NavBar />
        <Outlet />
      </div>
      <div className="fixed bottom-0 xl:left-[70px] 2xl:left-[400px] ">
        <div className="flex gap-2 ">
          <a href="https://github.com/">
            <AiFillGithub size={20} />
          </a>
          <a href="https://www.facebook.com/raymark.s.vergara">
            <AiOutlineFacebook size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
