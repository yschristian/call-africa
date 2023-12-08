/* eslint-disable consistent-return */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../../api/userApi";
import { resetFields } from "../../constants/formFields";
import Input from "./Input";
import Alert from "./Alert";
import { toast } from "react-toastify";

const fields = resetFields;
const fieldsState = {};

fields.forEach((field) => {
  fieldsState[field.id] = "";
});

const Reset = () => {
  const [resetState, setResetState] = useState(fieldsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { error, isLoading, message } = useSelector((state) => state.login);

  const token = window.location.pathname.split("/")[3];

  useEffect(() => {
    if (!error && message) {
      toast(message);
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [error, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = resetState;
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    dispatch(resetPassword({ ...resetState, token }));
  };

  const handleChange = (e) => {
    setResetState({ ...resetState, [e.target.id]: e.target.value });
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="">
        {error && <Alert message={error} heading="Error" variant="error" />}
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={resetState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            isLoading={isLoading}
          />
        ))}
      </div>
      <button
        disabled={isLoading}
        className={`group relative w-full flex justify-center py-2 px-4
         border border-transparent text-lg font-medium rounded-md text-white bg-[#DA091F] hover:bg-[#ea3c4f] focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-[#DA091F] mt-10`}
        onSubmit={onSubmit}
      >
        {isLoading ? (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-2 mt-2 w-6 h-4 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="white"
              ></path>
            </svg>
            <span>Resetting password...</span>
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
};

export default Reset;