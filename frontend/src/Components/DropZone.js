import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
  borderWidth: 2,
  borderRadius: 5,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#06B6D4",
};

const acceptStyle = {
  borderColor: "#22C55E",
};

const rejectStyle = {
  borderColor: "#F43F5E",
};

export function Basic(props) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Do whatever you want with the file contents
        const str = reader.result;
        console.log(str);
        props.setImage(str);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*",  maxFiles:1 });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          Drag your image here,
          <br /> or click to select one
        </p>
      </div>
    </div>
  );
}
