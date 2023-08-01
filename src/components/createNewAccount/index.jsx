import React from "react";
import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Card_container from "../../UI/Card_container";
import Card_container_1 from "../../UI/Card_container_1";
import Loading from "../../UI/Loading";

const CreateNewAccount = React.memo(() => {
  const navigate = useNavigate("/");

  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";

  function cancelHandler() {
    navigate("/");
  }

  return (
    <Card>
      <Card_container>
        <Form
          method="post"
          className="flex flex-col p-5 m-auto rounded-md bg-gray-700"
        >
          <label className="text-[#00df9a]">Name</label>
          <input
            type="text"
            name="name"
            required
            minLength="3"
            placeholder=""
            pattern="[a-zA-Z]+"
            className="text-center rounded-md outline-none m-1"
          />
          <label className="text-[#00df9a]">Email</label>

          <input
            type="email"
            name="email"
            className="text-center rounded-md outline-none m-1"
            required
          />
          <label className="text-[#00df9a]">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength="6"
            maxLength="12"
            pattern="[a-zA-Z0-9]+"
            className="text-center  rounded-md outline-none m-1"
          />
          <label className="text-[#00df9a]">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            required
            minLength="6"
            maxLength="12"
            pattern="[a-zA-Z0-9]+"
            className="text-center rounded-md outline-none m-1"
          />
          <label className="text-[#00df9a]">Balance</label>
          <input
            type="number"
            name="balance"
            required
            className="text-center rounded-md outline-none m-1"
          />
          <div className="flex mx-[15px] justify-between m-2">
            <Button isSubmitting={isSubmitting}>
              {isSubmitting ? <p>Loading</p> : <p>Submit</p>}
            </Button>
            <Button type="button" onClick={cancelHandler}>
              Cancel
            </Button>
          </div>
          {isSubmitting ? <Loading /> : null}
        </Form>
      </Card_container>

      <Card_container_1>
        <div className="flex flex-col h-[500px] justify-center w-[300px] text-gray-200">
          <h2 className="md:text-lg font-semibold">Create your Account!</h2>
          <p>
            Create your personal account and start tracking your expense and
            income!
          </p>
        </div>
      </Card_container_1>
    </Card>
  );
});

export default CreateNewAccount;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const response = await fetch(
    "https://expense-tracker-nodejs-dgov.onrender.com/api/users/register",
    {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log("Failed to register an Account!");
    return null;
  }

  const responseData = await response.json();

  const token = responseData.accessToken;

  localStorage.setItem("token", token);

  window.alert("Account Created!");

  return redirect("/dashboard");
}
