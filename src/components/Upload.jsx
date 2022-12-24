import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Papaparse from "papaparse";
import { useEffect } from "react";
const Upload = ({ RefEmail }) => {
  const [File, SetFile] = useState([]);
  const [bigdata, setbigdata] = useState([]);
  const [User_id, SetUser_id] = useState("");
  useEffect(()=>{
    RefEmail = JSON.parse(localStorage.getItem('Email'));
  },[]);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const handle_click = async () => {
    if (File.type !== "text/csv") {
      Toast.fire({
        icon: "error",
        title: "Wrong format! Kindly submit CSV file",
      });
      return;
    }
    // console.log(File);
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papaparse.parse(target.result, { header: true });
      const parsedData = csv?.data;
      setbigdata(parsedData);
      // console.log(typeof(parsedData));
      parsedData.pop();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: parsedData,
          user_id : User_id,
        }),
      };
      fetch("http://localhost:8001/Upload/postupload", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "submitted successfully to database",
          });
        });
      // const columns = Object.keys(parsedData[0]);
    };
    reader.readAsText(File);
    bigdata.pop();

    // const rep = await fetch("http://localhost:8001/file_upload", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       file: bigdata,
    //     }),
    //   });

    //   console.log(rep.json());
  };

  const handle_change = async (e) => {
    SetFile(e.target.files[0]);
    JSON.stringify(RefEmail);
    
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };
    const finaldata = await fetch(`http://localhost:8001/User/userdetail/${RefEmail}`, requestOptions)
      .then((response) => response.json())
      // .then((data) => console.log(data))
    // console.log(finaldata);
    SetUser_id(finaldata._id);
  };
  return (
    <div className="ContainerClass">
      <div className="InputFile">
        <div>Upload your CSV file</div>
        <input id="csvfileupload" type="file" onChange={handle_change} />
        <button className="ButtonSubmit" onClick={handle_click}>
          submit
        </button>
      </div>
    </div>
  );
};

export default Upload;
