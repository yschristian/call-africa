import React from "react";
import Header from "../components/Auth/Header";
import Login from "../components/Auth/Login";

const LoginView = () => {
  return (
    <>
      <div className="bg-white min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white max-w-md w-full space-y-4 border p-6 rounded shadow-lg">
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <Login />
        </div>
      </div>
    </>
  );
};

export default LoginView;
