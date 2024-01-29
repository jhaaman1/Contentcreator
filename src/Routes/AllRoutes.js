import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import SignUP from "../Pages/SignUp";
import Home from "../Pages/Home";
import AddContent from "../Pages/AddContent";
import { RequireAuth } from "../Utils/RequireAuth";
import SingleContent from "../Pages/SingleContent";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/api/:id"
          element={
            <RequireAuth>
              <SingleContent/>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUP />} />
        <Route
          path="/addcontent"
          element={
            <RequireAuth>
              <AddContent />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
