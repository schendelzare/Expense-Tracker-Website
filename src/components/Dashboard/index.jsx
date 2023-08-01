import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import getAuthToken from "../auth/getAuthToken";
import Transactions from "./transactions";

const DashBoard = () => {
  const userData = useLoaderData();
  const { _id, full_name, email, balance, updatedAt } = userData;

  const navigate = useNavigate();

  function navToAddIncome() {
    navigate("add-transaction");
  }
  function navToAddExpense() {
    navigate("add-expense");
  }

  const date = new Date(updatedAt).toDateString();
  const time = new Date(updatedAt).toLocaleTimeString();

  return (
    <div className="mt-10 grid md:grid-cols-2 max-w-[1200px] mx-auto ">
      <div className="mx-10 border-b border-b-cgray shadow shadow-b-cgray">
        <h3 className="text-gray-200 font-medium text-xl my-5">
          Account Details
        </h3>
        <p className="text-gray-200 font-medium flex justify-between mb-1 border-b border-b-gray-500">
          <span className="text-gray-200 font-medium text-sm text-left  w-20">
            Name:
          </span>
          <span className="text-gray-200 font-medium text-sm text-center flex-1">
            {full_name}
          </span>
        </p>
        <p className="text-gray-200 font-medium flex justify-between border-b border-b-gray-500">
          <span className="text-gray-200 font-medium text-sm text-left w-20">
            Email:
          </span>

          <span className=" text-gray-200 font-medium text-sm  text-center flex-1   h-7">
            {email}
          </span>
        </p>
        <p className="text-gray-200 font-medium flex justify-between border-b border-b-gray-500">
          <span className="text-gray-200 font-medium text-sm text-left w-20">
            Balance:
          </span>
          <span className="text-gray-200 font-medium text-sm text-center flex-1 ">
            ${balance}
          </span>
        </p>
        <p className="text-gray-200 font-medium flex justify-between border-b border-b-gray-500">
          <span className="text-gray-200 font-medium text-sm text-left w-20">
            Updated:
          </span>
          <span className="text-gray-200 font-medium text-sm text-center flex-1">
            {date} {time}
          </span>
        </p>
        <div className="flex justify-between min-h-[100px] items-center mx-4 md:mx-16">
          <Button onClick={navToAddIncome}>Add Income</Button>
          <Button onClick={navToAddExpense}>Add Expense</Button>
        </div>
      </div>
      <div className="mx-10 md:m-10">
        {userData ? (
          <Transactions tansId={_id} />
        ) : (
          <p className="text-white mt-3">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default DashBoard;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch(
    "https://expense-tracker-nodejs-dgov.onrender.com/api/users/dashboard",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!response.ok) {
    console.log("unauthorized loggin");
    throw new Error("unauthorized loggin");
  }
  const resData = await response.json();
  // console.log(resData.data);
  return resData.data;
}
