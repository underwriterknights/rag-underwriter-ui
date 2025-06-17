import React from "react";
import { useState } from "react";   
import "../styles/Upload.css";
import AWS from "aws-sdk";

export const UploadComponent = (props) => {
  const [file, setFile] = useState(null);
  const [awsFilePath, setAwsFilePath] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  // Function to upload file to s3
  const handleUpload = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "underwriterknightsbucket";

    // S3 Region
    const REGION = "us-east-1";

    // S3 Credentials
    AWS.config.update({
          accessKeyId: "xxxxxxxx",
      secretAccessKey: "xxxxxxxx",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const paramsObject = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    

    // Uploading file to s3

    var uploadFile = s3
      .putObject(paramsObject)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await uploadFile.then((err, data) => {
      setAwsFilePath(
        `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${file.name}`
      );
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  };

  return (
    <div className="upload-component">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {awsFilePath && <p>File uploaded to: <a href={awsFilePath} target="_blank" rel="noopener noreferrer">{awsFilePath}</a></p>}
      {file && <p>Selected file: {file.name}</p>}
      </div>
  );
}