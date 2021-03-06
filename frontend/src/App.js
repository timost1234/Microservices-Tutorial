import React, { useState } from "react";
import { Basic as Dropzone } from "./Components/DropZone.js";

const App = () => {
  const [image, setImage] = useState(null);
  const onResetHandler = () => {
    setImage(null);
  };
  const onPredictHandler = () => {
    console.log(image);
    
    
  };

  return (
    <div className="flex flex-col h-full items-center justify-center bg-blue-500 select-none">
      <div className="flex flex-col items-center bg-white w-96 rounded-lg shadow-xl py-5 px-8">
        <p className="uppercase text-center font-mono text-blue-500 text-3xl font-extrabold">
          wood classifer
        </p>
        <p className="mt-4 text-gray-700 text-justify text-sm">
          This is an APP that demenstrates how to connect a frontend web page to
          a backend server through API calls.
        </p>

        <div className="mt-4 w-full">
          {!image && <Dropzone setImage={setImage} />}
          {image && (
            <>
              <p className="text-sm uppercase font-medium mb-2">
                👇 your image
              </p>
              <img className="rounded-md w-full" src={image} />
            </>
          )}
        </div>

        <div className="flex ml-auto mt-4 gap-2">
          <button
            type="button"
            onClick={onResetHandler}
            class="w-24 transition duration-200 text-md bg-gray-400 rounded-md p-1 items-center justify-center text-white hover:bg-gray-300 focus:outline-none"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onPredictHandler}
            class="w-24 transition duration-200 text-md bg-yellow-400 rounded-md p-1 items-center justify-center text-white hover:bg-yellow-300 focus:outline-none"
          >
            Predict!
          </button>
        </div>
      </div>
      <span className="mt-2 text-sm text-blue-300">© 2021 Kuan-Ting</span>
    </div>
  );
};

export default App;
