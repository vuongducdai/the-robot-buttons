"use client";
import { calculateTimeToComplete } from "@/utils/calculateTimeToComplete";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [time, setTime] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setTime(calculateTimeToComplete(inputValue));
      toast.success("Sucessfully calculated");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
          <p className="fixed top-0 left-0 flex justify-center w-full pt-8 pb-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            You can find the source at&nbsp;
            <code className="font-mono font-bold">
              <a href={"https://github.com/vuongducdai/the-robot-buttons"}>
                https://github.com/vuongducdai/the-robot-buttons
              </a>
            </code>
          </p>
          <div className="fixed bottom-0 left-0 flex items-end justify-center w-full h-48 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <p
              className="flex gap-2 p-8 pointer-events-none place-items-center lg:pointer-events-auto lg:p-0"
              rel="noopener noreferrer"
            >
              By Dai Vuong
            </p>
          </div>
        </div>
        <div className="flex-col items-center justify-center w-full grow-1 h-[50vh]">
          <form onSubmit={handleSubmit} className="w-full md:w-[70%] mx-auto my-5">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Type in the path
            </label>
            <div className="relative">
              <input
                value={inputValue}
                onChange={handleOnChange}
                type="search"
                id="search"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type in the path"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Calculate
              </button>
            </div>
          </form>

          {time ? (
            <h4 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-center text-gray-900 dark:text-white">
              Time needed to complete the run:{" "}
              <span className="text-blue-600 dark:text-blue-500">{time}</span>
            </h4>
          ) : null}
        </div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
