import React, { useState } from "react";
import { Basic as Dropzone } from "./Components/DropZone.js";
import { FiExternalLink } from 'react-icons/fi';
import { VscLoading } from 'react-icons/vsc'

const species = [
  {
    id: "MaSx",
    sciName: "Melia azedarach",
    commonName: "Chinaberry Tree",
    link: "https://woodsearch.tfri.gov.tw/wood.php?c=2MrFn5pjmw%3D%3D"
  },
  {
    id: "PcSx",
    sciName: "Pistacia chinensis",
    commonName: "Chinese pistache",
    link: "https://woodsearch.tfri.gov.tw/wood.php?c=2MrFn5tgmQ%3D%3D"
  },
  {
    id: "TgSx",
    sciName: "Tectona grandis",
    commonName: "Teak",
    link: "https://woodsearch.tfri.gov.tw/wood.php?c=2MrFn5tjlQ%3D%3D"
  },
  {
    id: "UpSx",
    sciName: "Ulmus parvifolia",
    commonName: "Chinese Elm",
    link: "https://woodsearch.tfri.gov.tw/wood.php?c=2MrFn5tjnQ%3D%3D"
  },
  {
    id: "ZsSx",
    sciName: "Zelkova serrata",
    commonName: "Japanese Elm",
    link: "https://woodsearch.tfri.gov.tw/wood.php?c=2MrFn5tkmA%3D%3D"
  },
];

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onResetHandler = () => {
    setImage(null);
    setResult(null);
  };
  const onPredictHandler = () => {
    // console.log(image);
    // TODO

    const url = "http://localhost:5000/predict/";
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(image.split(",")[1]),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("Success:", response.result[0]);
        setResult(
          response.result[0]
            .sort(function (a, b) {
              return b[1] - a[1];
            })
            .slice(0, 3)
        );
        setLoading(false);
      });
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
          {(image && !result && !loading) && (
            <>
              <p className="text-sm uppercase font-medium mb-2">
                👇 your image
              </p>
              <img className="rounded-md w-full" src={image} />
            </>
          )}
          {
            loading && (
              <><VscLoading className="my-4 mx-auto text-gray-500 text-3xl animate-spin"/></>
            )
          }
          {(result && !loading) && (
            <>
              <p className="text-sm font-medium text-justify mb-2">
                The results are ..
              </p>
              <div className="flex gap-4">
                <div className="w-4/12">
                  <img className="rounded-md w-full" src={image} />
                </div>
                <div className="flex flex-col justify-between w-8/12">
                  {result.map((result, index) => (
                    <div className="flex justify-between">
                      <div className="w-full px-2 text-lg text-blue-500 rounded-md">
                        {index + 1}{" "}
                        {species.find((s) => s.id == result[0]).commonName}
                      </div>
                      <a className="text-blue-500 my-auto" target="_new" href={species.find((s) => s.id == result[0]).link}><FiExternalLink /></a>
                    </div>
                  ))}
                </div>
              </div>
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
          {(!result && !loading) && (
            <button
              type="button"
              onClick={onPredictHandler}
              class="w-24 transition duration-200 text-md bg-yellow-400 rounded-md p-1 items-center justify-center text-white hover:bg-yellow-300 focus:outline-none"
            >
              Predict!
            </button>
          )}
        </div>
      </div>
      <span className="mt-2 text-sm text-blue-300">© 2021 Kuan-Ting</span>
    </div>
  );
};

export default App;
