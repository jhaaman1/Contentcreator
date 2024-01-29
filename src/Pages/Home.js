import React, { useEffect, useState } from "react";
import ContentServices from "../Services/ContentServices";
import { useAuth } from "../Utils/Auth";
import { Link } from "react-router-dom";
import Delete from "../Components/Buttons/Delete";

const Home = () => {
  const [data, setData] = useState();
  const auth = useAuth();

  useEffect(() => {
    ContentServices.getAllContents(auth.user)
      .then((res) => {
        console.log("data", res);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth]);
  return (
    <div className="w-5/6 m-auto">
      <ul role="list" className="divide-y divide-gray-100">
        {data?.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ZoOJAQl5up8iciDNEwS-CgHaE8%26pid%3DApi&f=1&ipt=2fbf21bdb39f9f61a75bcdfa62cb8b64f914773418bb6f7b91a4c3259f5b130f&ipo=images"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <Link to={`/api/${person._id}`}>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.title}
                  </p>
                </Link>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.difficultyLevel}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {person.targetAudience}
                </p>

                <div className="mt-1 flex items-center gap-x-1.5">
                  <p className="text-xs leading-5 text-gray-500">
                    {new Date(person?.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 mt-4 bg-red sm:flex sm:flex-col sm:items-end">
                <Delete id={person._id}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
