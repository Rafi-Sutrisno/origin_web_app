"use client";

import { createContext, useState } from "react";
import run from "@utils/gemini-config";
import fetchWikipediaImage from "@utils/fetch-image";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");

  const [meaning, setMeaning] = useState("");
  const [figures, setFigures] = useState([]);
  const [figuresNames, setFiguresNames] = useState([]);

  const [figuresImage, setFiguresImage] = useState(["", "", ""]);

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setFigures([]);
    setFiguresNames([]);
    setFiguresImage(["", "", ""]);

    let response;
    const prompt = `Provide a brief explanation of the name ${input} in the first paragraph, including its meaning and origin. In the second paragraph, list 3 (max) historical figures who share similar names, including the years they lived (prioritize those that might be on wikipedia). Only answer using the following format (strict formatting always use . in historical figures, exception: if you dont find any historical figures just write None for Historical Figures) : For example: "Name is ...", followed by "Historical Figures: [Name] (Year) Known as ...(.) [Name] (Year) Known as ...(.) [Name] (Year) Known as ...(.)" 2nd example : "Name is ...", followed by "Historical Figures: [Name] (Year) Known as ...(.) [Name] (Year) Known as ...(.) None (.)" 3nd example : "Name is ...", followed by "Historical Figures: None (.) None (.) None (.)" `;
    response = await run(prompt);

    try {
      let rspArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < rspArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += rspArray[i];
        } else {
          newResponse += " " + rspArray[i] + " ";
        }
      }

      let newResponse2 = newResponse.split("*").join(" ");

      setResultData(newResponse2);
      DataSplit(newResponse2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const DataSplit = (data) => {
    let figuresnames = [];
    let split1 = data.split("Historical Figures:")[0];
    setMeaning(split1);

    let split2 = data.split("Historical Figures:")[1];
    let historicalFigures = split2.split("(.)");
    setFigures(historicalFigures);

    for (let i = 0; i < 3; i++) {
      let name = historicalFigures[i].split(" (")[0];

      if (!name.includes("None") && name !== "" && name !== " ") {
        setFiguresNames((prevNames) => [...prevNames, name]);
        figuresnames.push(name);
      }
    }
    getImage(figuresnames);
  };

  const getImage = (data) => {
    // console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      fetchWikipediaImage(data[i]).then((imageUrl) => {
        // console.log("Image URL ke: " + i + " adalah " + imageUrl);
        setFiguresImage((prevArr) => [
          ...prevArr.slice(0, i),
          imageUrl,
          ...prevArr.slice(i + 1),
        ]);
      });
    }
  };

  const contextValue = {
    input,
    setInput,
    loading,
    showResult,
    resultData,
    onSent,
    meaning,
    figures,
    figuresNames,
    figuresImage,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
