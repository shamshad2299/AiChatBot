import React, { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import myImage from "./shamshad.jpg"

function GeminiApp() {
  const [data, setData] = useState([]);
  const refElement = useRef();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  //console.log("data ",data);
  const GeminiResponce = async () => {
    setLoading(true);
    const data = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAeUxJVodaz1UPM0Al0M4X0zXDcek6OYrg`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    setLoading(false);
    const ActualData = await data.json();
    const finalData = ActualData.candidates[0].content.parts[0];
    // console.log(finalData);
    //setData([...data , finalData]);
    setData((prev) => [...prev, [finalData]]);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setPrompt(refElement.current.value);
    refElement.current.value = "";
  };

  useEffect(() => {
    GeminiResponce();
  }, [prompt]);

  return (
    <div className="background">
      <div className="myImage">
        <img src={myImage} alt="" />
        <p>Shamshad Ahamad's AI chatBot</p>
      </div>
      <form onClick={handleGenerate} className="prompt-input">
        <input
          type="text"
          placeholder="please Enter your Question Here .."
          ref={refElement}
        />
        <button>Generate Responce</button>
      </form>

    
      {loading ? (
        <div className="loaders">
          {data.map((text, index) => {
            return (
              <div key={text + index + 1} className="Responce">
                <p>
                  {" "}
                  <span className="robo">
                    <i class="ri-robot-2-line"></i>
                  </span>{" "}
                  : {text[0].text}
                </p>
              </div>
            );
          })}
          <Loading></Loading>
        </div>
      ) : (
        data.map((text, index) => {
          return (
            <div key={text + index + 1} className="Responce">
              <p>
                {" "}
                <span className="robo">
                  <i class="ri-robot-2-line"></i>
                </span>{" "}
                : {text[0].text}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default GeminiApp;
