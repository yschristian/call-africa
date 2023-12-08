import React from "react";

import { Link } from "react-router-dom";

const Header = ({ heading }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-center" />
      <h1 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
        Call Africa
      </h1>
      <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <div className="spinner" />
    </div>
  );
};

export default Header;
