import React, { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import Button from "../../../UI/Button";
import FormWrapper from "../../../UI/FormWrapper";

const ResetPassword = React.memo(() => {
  const [isLoading, setIsLoading] = useState();

  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";

  return (
    <FormWrapper>
      <Form method="post" className="text-center">
        <div className="flex flex-col m-1 ">
          <h2 className="text-white text-center m-3">
            Enter your reset code and new password
          </h2>
          <input
            className="text-center my-1 mx-auto rounded-md"
            placeholder="email"
            required
            name="email"
          />
          <input
            className="text-center my-1 mx-auto rounded-md"
            placeholder="reset code"
            required
            name="reset_code"
          />
          <input
            className="text-center my-1 mx-auto rounded-md"
            placeholder="new-password"
            minLength="6"
            maxLength="12"
            required
            name="new_password"
          />
        </div>
        <Button isSubmitting={isSubmitting}>
          {isSubmitting ? <p>Loading</p> : <p>Submit</p>}
        </Button>
      </Form>
    </FormWrapper>
  );
});

export default ResetPassword;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await fetch(
    "https://expense-tracker-nodejs-dgov.onrender.com/api/users/resetpw",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    window.alert("Wrong reset code!");
    return null;
  }

  window.alert("Change Password successful!");

  return redirect("/");
}
