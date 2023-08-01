import React, { useState, useContext, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../UI/Button";
import FormWrapper from "../../UI/FormWrapper";
import Input from "../../UI/Input";
import Loading from "../../UI/Loading";
import { Context } from "../context/context";

const Login = React.memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  //context data...
  const contextData = useContext(Context);
  const { setAlertOn } = contextData;

  //navigate...
  const navigate = useNavigate();

  //login ...
  const LoginToBackend = useCallback(async (account) => {
    let message = <p>Login Successful!</p>;

    setisLoading(true);
    await fetch(
      "https://expense-tracker-nodejs-dgov.onrender.com/api/users/login",
      {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          setisLoading(false);
          message = <p>"Wrong email or password!"</p>;
          setAlertOn(message);
          throw new Error("Wrong email or password!");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.accessToken);

        setisLoading(false);

        setEmail(""), setPassword("");
        setAlertOn(message);
        navigate("/dashboard");
      });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    //validations
    if (!email) {
      window.alert("Enter a valid email!");
      return;
    }
    if (password.length < 6) {
      window.alert("Password must be 5 characters long!");
      return;
    }

    const account = {
      email: email,
      password: password,
    };

    LoginToBackend(account).catch((e) => {
      console.log(e);
      setErrorMessage(e.message);
      return;
    });
  }

  return (
    <div className="mt-10">
      <FormWrapper className="h-[380px] bg-gray ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col  rounded-md text-center my-auto  h-[300px]"
        >
          <h2 className="text-xl text-cwhite font-bold mb-2 font-sans">
            User Login
          </h2>

          <Input
            id="email"
            type="email"
            placeholder="ea.@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2  w-[15rem]  md:w-[17rem] text-center outline-none autofill:none "
          />

          <Input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            maxLength="12"
            className="p-2 w-[15rem]  my-1 md:w-[17rem] text-center outline-none "
          />
          {isLoading ? (
            <Button isSubmitting={isLoading}>Log in</Button>
          ) : (
            <Button>Log in</Button>
          )}

          <Link to="/create-new-account" className="text-violet-800  my-2">
            create new account
          </Link>
          <Link to="/forgot-password" className="text-yellow-400  mb-2">
            forgot password?
          </Link>

          {isLoading && <Loading />}
        </form>
      </FormWrapper>
    </div>
  );
});

export default Login;
