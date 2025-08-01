import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImageUpload.css";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    console.log(pickedFile);
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className="image-upload">
        <div
          style={{ display: "flex" }}
          className={`image-upload__preview ${props.center && "center"}`}
        >
          {previewUrl && (
            <img className="image-picker" src={previewUrl} alt="Preview" />
          )}
          {!previewUrl && <p>Please select photo</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};
export default ImageUpload;
