/* eslint-disable consistent-return */

import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";

import {
  XCircleIcon,
  PaperAirplaneIcon,
  CheckIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/solid";

import fetchMessages, {
  createMessage,
  deleteMessage,
  getPhoneNumbers,
} from "../api/message.api";
import { toast } from "react-toastify";
import { addPhoneNumber } from "../redux/features/user.feature";

const Messages = () => {
  let { phoneNumbers } = useSelector((state) => state.user);

  const [nav, setNav] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(phoneNumbers || []);
  const [query, setQuery] = useState("");
  const [removeModal, setRemoveModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [messageState, setMessageState] = useState({
    message: "",
    phone: "",
  });

  const dispatch = useDispatch();

  const { messages, message, error } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(fetchMessages());
    dispatch(getPhoneNumbers());
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
    setMessageState({ ...messageState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createMessage({ message: messageState.message, phone: selected[0] })
    );
  };

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(deleteMessage(userToRemove));
    setRemoveModal(false);
  };

  const filteredPhone =
    query === ""
      ? phoneNumbers || []
      : phoneNumbers.filter((p) => {
          return p
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
        });

  const columns = [
    {
      Header: "Message",
      accessor: "message",
    },

    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => (
        <div className=" items-center justify-center flex space-x-2 text-center w-full">
          <XCircleIcon
            width="30"
            height="30"
            cursor="pointer"
            className="text-red-500"
            onClick={() => {
              setRemoveModal(true);
              setUserToRemove(row.original._id);
            }}
          />
        </div>
      ),
    },
  ];

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
              Send New Message
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8" onSubmit={handleSubmit}>
              <label className="mb-12"> Phone Number </label>

              <Combobox value={selected} onChange={setSelected} multiple>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                      displayValue={(phone) => phone.map((p) => p)}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDoubleDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {query.length > 9 && (
                        <Combobox.Option
                          value={query}
                          className="cursor-pointer p-1 hover:bg-primary hover:text-white"
                          onClick={() => {
                            setSelected([...selected, query]);
                            dispatch(addPhoneNumber([...phoneNumbers, query]));
                            setQuery("");
                          }}
                        >
                          Add This Number "{query}"
                        </Combobox.Option>
                      )}
                      {filteredPhone.map((p) => (
                        <Combobox.Option
                          key={p}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? "bg-primary text-white" : "text-gray-900"
                            }`
                          }
                          value={p}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {p}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-primary"
                                  }`}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>

              <label className="mb-12"> Message </label>
              <div className="input   flex">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
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
                >
                  Send Message
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
              Delete message
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8">
              <div>
                <h2 className="text-center m-4 text-xl">
                  Are you sure you want to delete this message
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
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Remove Modal */}
      <div className="flex flex-col h-screen">
        <div className="flex flex-row">
          <Sidebar
            toggle={handleClick}
            style="hidden lg:flex"
            className="mt-72"
          />
          <div className="w-full min-h-screen bg-[#F9F9FB] mt-[90px]">
            <div className="flex items-left px-5 lg:px-60 pt-8 pb-8">
              <div className="space-x-8 lg:ml-7">
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryHover "
                  onClick={() => setModal(true)}
                >
                  <PaperAirplaneIcon className="text-white w-6 mt-1 -ml-2" />{" "}
                  Send Message
                </button>
              </div>
            </div>
            <div className=" m-6 md:m-3 mt-10">
              {messages?.length > 0 && (
                <DataTable
                  data={messages}
                  columns={columns}
                  title="Messages"
                  placeholder=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
