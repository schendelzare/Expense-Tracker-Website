import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import getAuthToken from "../../auth/getAuthToken";

import Button from "../../../UI/Button";
import Loading from "../../../UI/Loading";

const AddIncomeTransaction = React.memo(() => {
  const navigate = useNavigate();

  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";

  function cancelHandler() {
    navigate("/dashboard");
  }

  return (
    <div className="grid  grid-rows-2  md:grid-cols-2 mt-20">
      <div className="flex w-[300px] h-[350px]  mx-auto md:mr-0 border border-cgray hover:border-cyellow shadow-lg shadow-cgray text-cwhite">
        <Form
          method="post"
          className="flex flex-col p-5 m-auto rounded-md bg-gray-700"
        >
          <label className=" d:text-lg my-3">Amount</label>
          <input
            type="number"
            name="amount"
            required
            className=" rounded-md outline-none text-center bg-black"
          />
          <label className=" d:text-lg my-3">Remarks</label>
          <textarea
            type="text"
            name="remarks"
            required
            className="resize-none rounded-md outline-none text-center bg-black"
            maxLength={30}
          />
          <div className=" flex justify-between min-h-[100px] items-center  gap-2">
            <Button isSubmitting={isSubmitting}>
              {isSubmitting ? <p>Loading</p> : <p>Submit</p>}
            </Button>
            <Button type="button" onClick={cancelHandler}>
              Cancel
            </Button>
          </div>
          {isSubmitting && <Loading />}
        </Form>
      </div>

      <div>
        <div className="flex flex-col h-[200px] h-[350px]  justify-center w-[300px] text-gray-200 mx-auto md:ml-0 px-6">
          <h2 className="md:text-lg font-semibold">Add Income</h2>
          <p>
            Please input your desire amount into the form. It will be stored and
            add into your Personal savings.
          </p>
        </div>
      </div>
    </div>
  );
});

export default AddIncomeTransaction;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const token = getAuthToken();

  console.log("Action", postData);

  const response = await fetch(
    "https://expense-tracker-nodejs-dgov.onrender.com/api/transactions/addIncome",
    {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    console.log("unauthorized loggin");
    throw new Error("unauthorized loggin");
  }

  window.alert("Add Income Success!");

  return redirect("/dashboard");
}
