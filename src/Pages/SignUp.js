import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from "../Services/UserServices";
const SignUP = () => {
  const [formData, setFormData] = useState({
    yourName: "",
    yourSurname: "",
    yourEmail: "",
    yourPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstname: formData.yourName,
      lastname: formData.yourSurname,
      email: formData.yourEmail,
      password: formData.yourPassword,
    };

    //Api Fetching
    UserServices.createuser(data)
      .then((res) => {
        navigate("/login", {
          state: { user: formData.email },
          replace: false,
        });

        alert("Account Create Successfully");
      })
      .catch((err) => {
        if (err.response.data) {
          alert(err.response.data.message);
        }
      });
    console.log(data);
  };
  return (
    <div>
      <section className="mx-auto mt-10 w-full flex-grow mb-10 max-w-[1200px] px-5">
        <div className="container rounded-lg mx-auto border px-5 py-5 shadow-sm md:w-1/2">
          <div className="">
            <p className="text-4xl text-center font-bold">CREATE AN ACCOUNT</p>
          </div>

          <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
            <label className="text-left" for="name">
              First Name
            </label>
            <input
              className="mb-3 mt-3 rounded border px-4 py-2"
              type="text"
              placeholder="Aman"
              value={formData.yourName}
              onChange={handleChange}
              id="your-name"
              name="yourName"
            />
            <label className="text-left" for="name">
              Last Name
            </label>
            <input
              className="mb-3 rounded mt-3 border px-4 py-2"
              type="text"
              placeholder="Jha"
              id="your-surname"
              name="yourSurname"
              value={formData.yourSurname}
              onChange={handleChange}
            />

            <label className="mt-3 text-left" for="email">
              Email Address
            </label>
            <input
              className="mt-3 rounded border px-4 py-2"
              type="email"
              placeholder="user@mail.com"
              id="your-email"
              name="yourEmail"
              value={formData.yourEmail}
              onChange={handleChange}
            />

            <label className="mt-5 text-left" for="email">
              Password
            </label>
            <input
              className="mt-3 rounded border px-4 py-2"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={formData.yourPassword}
              name={"yourPassword"}
              onChange={handleChange}
            />
            <input
              className="mt-3 border px-4 py-2 cursor-pointer bg-slate-800 text-white rounded"
              type="submit"
              placeholder="&bull;`&bull;&bull;&bull;&bull;&bull;&bull;"
            />
          </form>

          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-slate-900">
              Login now
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUP;
