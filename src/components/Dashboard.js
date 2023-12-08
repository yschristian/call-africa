import { ChatIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchMessages from "../api/message.api";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  return (
    <div className="flex flex-col grow bg-light-bg mt-20">
      <div className="flex flex-row pb-8 justify-center">
        <div className="lg:ml-56 w-[90%]  h-[100%]">
          <div className="grid grid-cols-2 mb-12 md:mb-24 lg:mb-0 lg:grid-cols-4">
            <div className="border bg-white py-4 dark:bg-dark-bg md:w-[70%] h-32 md:h-40 mx-2 md:ml-16 lg:ml-10 mt-12 md:mt-20 lg:mt-8 text-center flex flex-col justify-center items-center rounded-lg">
              <h4 className="font-['sans'] font-medium mt-2 text-base text-black">
                Messages
                <ChatIcon className="text-primary w-10" />
              </h4>
              <h1 className="font-['sans] font-semibold text-4xl mb-2 text-black">
                {messages?.length > 0 ? messages?.length : 0}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
