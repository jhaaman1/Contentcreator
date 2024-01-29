import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../Utils/Auth";
import ContentServices from "../Services/ContentServices";
import { useParams } from "react-router-dom";

const SingleContent = () => {
  const [data, setData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const auth = useAuth();
  const { id } = useParams();

  useEffect(() => {
    ContentServices.getContent(id, auth.user)
      .then((res) => {
        const { _id, __v, ...dataWithoutIdAndV } = res.data;
        setData(dataWithoutIdAndV);
        setEditedData(dataWithoutIdAndV);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth, id]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission with editedData
    ContentServices.updateContent(editedData, id, auth.user)
      .then((res) => {
        // Handle success
        console.log("data updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    setEditMode(false);
  };

  return (
    <>
      <div className="px-4 sm:px-0 flex justify-between items-center">
        <h1 className="text-base text-center font-semibold leading-7 ml-4 text-gray-900">
          Subject Information
        </h1>
        {editMode ? (
          <button className="border bg-black rounded w-40 h-10 text-white" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="border bg-black rounded w-40 h-10 text-white" onClick={handleEditToggle}>
            Toggle Edit
          </button>
        )}
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Render fields dynamically */}
          {Object.entries(data || {}).map(([key, value]) => (
            // Exclude _id and __v from rendering
            key !== "_id" && key !== "__v" && (
              <div key={key} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {key}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {editMode ? (
                    <input
                      type="text"
                      name={key}
                      value={editedData[key] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                </dd>
              </div>
            )
          ))}
        </dl>
      </div>
    </>
  );
};

export default SingleContent;
