import React from "react";
import { useState } from "react";
import { useAuth } from "../Utils/Auth";
import ContentServices from "../Services/ContentServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AddContent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mockFileLink: "",
    category: "",
    difficultyLevel: "",
    targetAudience: "",
    date: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const auth = useAuth();

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      description: formData.description,
      mockFileLink: formData.mockFileLink,
      category: formData.category,
      difficultyLevel: formData.difficultyLevel,
      targetAudience: formData.targetAudience,
      date: formData.date ? formData.date.toISOString() : null, // Format date
    };
  
    ContentServices.createContent(data, auth.user)
      .then((res) => {
        console.log("Form Submitted. Response:", res);
        alert("Content added successfully!");
        setFormData({
          title: "",
          description: "",
          mockFileLink: "",
          category: "",
          difficultyLevel: "",
          targetAudience: "",
          date: "",
        });
      })
      .catch((err) => {
        if (err.response.data) {
          alert(err.response.data.message);
        }
      });
    console.log(data);
  };
  
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add Content
        </h2>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-between">
            <label
              htmlFor="date"
              className="block text-sm mt-4 font-semibold leading-6 text-gray-900 text-left"
            >
              Date
            </label>
            <div className="mt-2.5">
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Category
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="category"
                id="category"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="mockFileLink"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Mockfile Link
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="mockFileLink"
                id="mockFileLink"
                autoComplete="off"
                value={formData.mockFileLink}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="difficultyLevel"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Difficulty Level
            </label>
            <div className="mt-2.5">
              <select
                name="difficultyLevel"
                id="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select Difficulty Level
                </option>
                <option value="Hard">Hard</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Easy">Easy</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="targetAudience"
              className="block text-sm font-semibold leading-6 text-gray-900 text-left"
            >
              Target Audience
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="targetAudience"
                id="targetAudience"
                autoComplete="off"
                value={formData.targetAudience}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
