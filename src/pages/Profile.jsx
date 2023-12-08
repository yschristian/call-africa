/* eslint-disable consistent-return */

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

import register, { getUsers, removeUser } from "../api/userApi";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../hooks/useAuth";
import updateFields from "../constants/formFields";
import Input from "../components/Auth/Input";
import FormAction from "../components/Auth/FormAction";

const fields = updateFields;
const fieldsState = {};

fields.forEach((field) => {
  fieldsState[field.id] = "";
});

const Profile = () => {
  const [nav, setNav] = useState(false);
  const [modal, setModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(false);
  const [updateState, setUpdateState] = useState(fieldsState);

  const dispatch = useDispatch();
  const { users, message, error } = useSelector((state) => state.user);

  const { user } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    // dispatch(getUsers());
    if (!error && message) {
      setModal(false);
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message]);

  const handleClick = () => setNav(!nav);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateState({ ...updateState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(updateState));
  };

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeUser(userToRemove));
    setRemoveModal(false);
  };

  return (
    <>
      <div
        className={`h-screen w-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 ${
          modal === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full sm:w-3/4  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
              Add New Organization
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8" onSubmit={handleSubmit}>
              <label className="mb-12"> Organization name </label>
              <div className="input   flex">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="username"
                    className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Enter organization name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label className="mb-12"> Organization email </label> :{" "}
              <div className="input   flex">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="email"
                    name="email"
                    className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Enter organization email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label className="mb-12"> Phone Number </label>
              <div className="input   flex">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="number"
                    name="phoneNumber"
                    className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full mt-2 flex justify-between items-center">
                <button
                  className="group relative  flex justify-center py-2 px-4 border border-transparent
                  text-lg font-medium rounded-md text-white bg-yellow-300 hover:bg-yellow-400
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DA091F] mt-12 w-[30%] md:w-1/4  font-sans "
                  onClick={() => setModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="w-1/2 md:w-1/2  flex justify-center font-sans group relative  py-2 px-4 border
                   text-lg font-medium rounded-md text-primary  border-primary bg-white hover:bg-[#ea3c4f]
                 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DA091F] mt-12"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Remove Modal */}
      <div
        className={`min-h-full w-screen z-30 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center px-4 ${
          removeModal === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm text-gray-700 dark:text-white text-center w-11/12">
              Remove Organization
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8">
              <div>
                <h2 className="text-base dark:text-white text-center m-4">
                  Are you sure you want to remove this organization
                </h2>
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="group relative  flex justify-center py-2 px-4 border border-transparent
text-lg font-medium rounded-md text-white bg-yellow-300 hover:bg-yellow-400
 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DA091F] mt-12 w-[30%] md:w-1/4  font-sans "
                  data-testid="delete"
                  onClick={() => setRemoveModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="w-1/2 md:w-1/2  flex justify-center font-sans group relative  py-2 px-4 border
                  text-lg font-medium rounded-md text-primary  border-primary bg-white hover:bg-[#ea3c4f]
                hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DA091F] mt-12"
                  onClick={handleRemove}
                  type="submit"
                >
                  Remove
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row">
          <Sidebar
            toggle={handleClick}
            style="hidden lg:flex"
            className="mt-72"
          />
          <div className="w-full min-h-screen bg-[#F9F9FB] mt-[90px]">
            <div className="flex items-left px-5 lg:px-60 pt-8 pb-8"></div>
            <div className=" m-6 md:m-3 mt-10  ">
              <div className="bg-white border grid grid-cols-1 md:grid-cols-3 dark:bg-dark-bg shadow-sm px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10">
                <div className=" flex items-center justify-between pb-6 md:col-span-3">
                  <div>
                    <h2 className="text-gray-800 dark:text-white font-semibold text-xl">
                      Profile
                    </h2>
                  </div>
                </div>

                <hr className="mb-2 md:col-span-3" />
                <div
                  className="flex flex-col justify-start items-center font-[Poppins] text-gray-900     p-2
		   rounded-m w-full md:w-5/6 min-h-[300px] max-h-[350px] ml-2 border  text-lg"
                >
                  <FaUser className="w-1/2 h-1/3" />
                  <div className="m-2  mt-10 flex ">
                    <span className="font-bold flex">Name:</span>
                    {user?.username}
                  </div>
                  <div className="m-2 mt-4 flex ">
                    <span className="font-bold flex mr-2">Email:</span>
                    {user?.email}
                  </div>
                  <div className="m-2 mt-4 flex ">
                    <span className="font-bold flex mr-2">Phone Number:</span>
                    {user?.phone}
                  </div>
                </div>
                <div
                  className={`w-full p-2  border
		     md:mb-10   rounded-md md:col-span-2`}
                >
                  <div>
                    <h2 className="text-gray-800 ml-6 dark:text-white font-semibold text-xl">
                      Edit Profile
                    </h2>
                  </div>
                  <div className="flex flex-col items-stretch m-3 ">
                    {fields.map((field) => (
                      <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={updateState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                        customClass="w-full"
                      />
                    ))}
                    {
                      <FormAction
                        text="Save"
                        customClass=" bg-green-400 hover:bg-green-500 focus:ring-green-400 mt-4"
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
