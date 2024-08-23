"use client";

import { useState, useContext } from "react";
import "./Main.css";
import { Context } from "@components/ContextProvider/ContextProvider";
import { useSession } from "next-auth/react";

const Main = () => {
  const {
    input,
    setInput,
    showResult,
    loading,
    resultData,
    onSent,
    meaning,
    figures,
    figuresNames,
    figuresImage,
  } = useContext(Context);

  const send_style = {
    cursor: input ? "pointer" : "not-allowed",
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input) {
      handleOnSent();
    }
  };

  const handleOnSent = () => {
    setShowAlert(false);
    if (session?.user) {
      onSent();
    } else {
      setShowAlert(true);
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="main-container">
      <div className="greet">
        <p>
          <span>Welcome to Origin!</span>
        </p>
        <p className="desc">Unveil the Stories Behind Your Name</p>
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <div className="inside-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyUp={handleKeyPress}
              type="text"
              placeholder="enter your name here"
              value={input}
            />

            <img
              src={"/assets/send_icon.png"}
              alt=""
              style={send_style}
              onClick={() => (input ? handleOnSent() : null)}
            />
          </div>
        </div>
        <p className="bottom-info">This app may provide inaccurate info.</p>
        {showAlert && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Alert!</span> Please Sign In first
              and try submitting again.
            </div>
          </div>
        )}
      </div>

      {showResult ? (
        <div className="main-result ">
          <div className="flex flex-col my-5 items-center">
            <p className="result-title">Meaning:</p>
            <div className="flex w-full h-fit items-center">
              <img src="/assets/right.png" className=" w-8 self-start" alt="" />

              <p
                dangerouslySetInnerHTML={{ __html: meaning }}
                className="text-center px-5 py-3 text-2xl font-semibold font-caveat w-full"
              ></p>

              <img src="/assets/left.png" className=" w-8 self-end" alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center mt-10">
            <p className="result-title">
              Historical Figures that share similar name:
            </p>
            <div className="flex flex-col gap-7 mt-4">
              {figuresNames.length !== 0 ? (
                <>
                  {figuresNames.map((figure, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center h-48"
                    >
                      <div className="bg-green-200 w-full h-fit text-center text-xl font-semibold py-2">
                        {figure}
                      </div>
                      <div className="flex justify-center items-center h-full overflow-hidden">
                        <img
                          src={figuresImage[index]}
                          alt=""
                          className="w-32 h-full"
                        />
                        <p className="w-72 text-center">{figures[index]}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="mt-4 text-sm text-center font-light sm:px-40">
                  Sorry, we couldn't find any historical figures with similar
                  names. Please try another name, such as Alex, that might be
                  more well-known.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
