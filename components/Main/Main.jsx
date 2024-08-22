"use client";

import { useState, useContext } from "react";
import "./Main.css";
import { Context } from "@components/ContextProvider/ContextProvider";

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input) {
      onSent();
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="main-container">
      <div className="greet">
        <p>
          <span>Welcome back!</span>
        </p>
        <p>Never Late than never!</p>
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyUp={handleKeyPress}
            type="text"
            placeholder="enter your name here"
            value={input}
          />
          <div>
            <img src={""} alt="" className="cursor-not-allowed" />
            <img src={""} alt="" className="cursor-not-allowed" />

            <img
              onClick={() => onSent()}
              src={""}
              alt=""
              className="cursor-pointer"
            />
          </div>
        </div>
        <p className="bottom-info">Gemini may provide inaccurate info</p>
      </div>

      <div className="main-result">
        <div className="flex flex-col my-5">
          <p>Meaning:</p>
          <p dangerouslySetInnerHTML={{ __html: meaning }}></p>
        </div>

        <div>
          <p>Figures:</p>
          <div className="flex flex-col gap-2">
            {figuresNames.map((figure, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{figures[index]}</p>
                <img
                  src={figuresImage[index]}
                  alt=""
                  className="w-24 rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
