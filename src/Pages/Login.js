import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserServices from "../Services/UserServices";
import { useAuth } from "../Utils/Auth";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirPath = location.state?.path || "/";
  const [formFields, setFormFields] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormFields((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    UserServices.userlogin({
      email: formFields.email,
      password: formFields.password,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('resData', res.data.token.accessToken)
          localStorage.setItem("user", res.data.token.accessToken);
          auth.login();
          navigate(redirPath, { replace: true });
        }
      })
      .catch((err) => {
        if (!err.response) {
          setErrorMessage(err.message);
          return;
        }
        if (err.response.status === 403) {
          navigate("/accounts/verify-email", {
            state: { user: formFields.email },
            replace: false,
          });
          return;
        }
        setErrorMessage(err.response.data.message);
      });
  };
  return (
    <div>
      <section className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5">
        <div className="container rounded-md mx-auto border px-5 py-5 shadow-sm md:w-1/2">
          <div className="">
            <p className="text-4xl text-center font-bold">LOGIN</p>
            <p className="text-center	">Welcome back</p>
          </div>

          <form className="mt-6 flex flex-col" onSubmit={submitForm}>
            <label className="text-left" for="email">
              Email Address
            </label>
            <input
              name="email"
              className="mb-3 rounded mt-3 border px-4 py-2"
              type="email"
              placeholder="youremail@domain.com"
              value={formFields.email || ""}
              required
              onChange={handleChange}
            />

            <label className="text-left" for="email">
              Password
            </label>
            <input
              name="password"
              className="mt-3 rounded border px-4 py-2"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={formFields.password || ""}
              required
              onChange={handleChange}
            />

            <input
              className="mt-3 border px-4 cursor-pointer rounded bg-red-700 py-2 text-white"
              type="submit"
            />
          </form>

          <p className="text-center">
            Don`t have account?
            <Link to="/signup" className="text-red-800 font-bold">
              Register now
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
