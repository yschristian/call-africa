import React from "react";
import { Link } from "react-router-dom";

const FormExtra = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="text-sm">
        <Link
          to="/password/forgot"
          className="font-medium text-yellow-600 hover:text-yellow-500"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default FormExtra;
