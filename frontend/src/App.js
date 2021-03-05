import React, {useState} from "react";
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Rate,
  Upload,
  Typography,
  Space,
  Divider,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./App.less";

const { Dragger } = Upload;

const App = () => {
  const [fileList, setFileList] = useState([
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      <div className="bg-blue-500 flex justify-center h-screen w-screen">
        <div className="bg-white flex-col self-center w-96 rounded-lg shadow-xl px-5">
          <p className="mt-4 text-center font-mono text-blue-500 text-3xl font-extrabold">
            WOOD CLASSIFIER
          </p>
          <div className="w-full mt-2">
            <Dragger
              action=""
              listType="picture"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support only for a single upload.
              </p>
            </Dragger>
          </div>
          <div className="flex my-5 justify-end gap-2">
            <button
              type="button"
              class="w-24 text-lg bg-gray-400 rounded-md p-1 items-center justify-center text-white hover:bg-gray-300 focus:outline-none"
            >
              Reset
            </button>
            <button
              type="button"
              class="w-24 text-lg bg-yellow-400 rounded-md p-1 items-center justify-center text-white hover:bg-yellow-300 focus:outline-none"
            >
              Predict!
            </button>
          </div>
        </div>
        {/* <p className="flex text-blue-200 text-center items-center justify-center">© 2020 Kuan-Ting</p> */}
      </div>
    </>
  );
};

export default App;
