import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import Button from "../../../UI/Button";
import Card from "../../../UI/Card";
import Card_container from "../../../UI/Card_container";
import Card_container_1 from "../../../UI/Card_container_1";

const ForgotPassword = React.memo(() => {
  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";

  return (
    <Card>
      <Card_container>
        <Form
          method="POST"
          className="flex flex-col p-5 m-auto rounded-md bg-gray-700"
        >
          <p className="text-[#00df9a]">
            We will provide a code to be sent to your email
          </p>
          <input
            type="email"
            className="text-center rounded-md outline-none m-3"
            placeholder="Enter your email"
            name="email"
            required
          />
          <Button isSubmitting={isSubmitting}>
            {isSubmitting ? <p>Loading</p> : <p>Submit</p>}
          </Button>
        </Form>
      </Card_container>
      <Card_container_1>
        <div className="flex flex-col h-[500px] justify-center w-[300px] text-gray-200">
          <h2 className="md:text-lg font-semibold">Forgot Password</h2>
          <p>We will provide a code to be sent to your email.</p>
        </div>
      </Card_container_1>
    </Card>
  );
});

export default ForgotPassword;

export async function Action({ request }) {
  const formData = await request.formData();
  const email = Object.fromEntries(formData);
  console.log(email);

  const response = await fetch(
    "https://expense-tracker-nodejs-dgov.onrender.com/api/users/forgotpw",
    {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    window.alert("Email is not registered user!");
    return null;
  }

  window.alert("Reset code is sent to your email!");

  return redirect("/reset-password");
}
