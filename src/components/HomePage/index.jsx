import React from "react";
import { useNavigate } from "react-router-dom";
import Custom_Button from "../../UI/Custom_Button";
import img from "../../assets/savings.png";
import getAuthToken from "../auth/getAuthToken";

const HomePage = React.memo(() => {
  const navigate = useNavigate();
  const token = getAuthToken();

  return (
    <div className="antialiased flex max-w-[1200px] mx-auto py-5 mt-[10px] flex-col md:flex-row justify-center">
      <div className="z-10 md:w-[500px]">
        <h1 className="text-6xl font-extrabold  tracking-tighter text-center w-[20rem] mx-auto orange_gradient font-sans uppercase">
          Expense Tracker
        </h1>
        <h3 className="text-2xl tracking-tighter text-center font-bold">
          Tracking your daily expense
        </h3>
        <p className=" antialiased text-md mx-6 my-5 p-5 border border-[#a8b3cf33] hover:border-cyellow  rounded-3xl bg-cgray text-ctextcolor text-justify md:text-center">
          When it comes to tracking your spending, there can be different
          reasons for doing it. Maybe you’re curious about where your money is
          going, are working towards a specific goal, or want to deal with your
          debt once and for all. Whatever your reasons, we’ve got the tools and
          resources to help you get started.
        </p>
      </div>
    </div>
  );
});

export default HomePage;
