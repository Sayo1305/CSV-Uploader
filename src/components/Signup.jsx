import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Signup = ({SetrefEmail}) => {
  const URL = "http://localhost:8001/User/userregister";
  const [Result, SetResult] = useState([]);
  const [Password, SetPassword] = useState("");
  const [Email, SetEmail] = useState("");
  const navigate = useNavigate();
  useState(() => {}, [Result]);
  const handle_submit = async (email, password) => {
    if(email === "" || password === "")
    {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "Something went wrong! please fill details",
      })
      return;
    }
    localStorage.setItem('Email' , JSON.stringify(email));
    const result = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    SetResult(result);
    console.log(result);
    result["Ok"] === "false" || result.length === 0
      ? Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            "Something went wrong!" + Result.length === 0
              ? "Please fill the form"
              : Result["status"],
        })
      : Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered Sucessfully",
          showConfirmButton: false,
          timer: 1500,
        });
  };
  const handle_change_email = (e) => {
    SetEmail(e.target.value);
    SetrefEmail(e.target.value);
  };
  const handle_change_password = (e) => {
    SetPassword(e.target.value);
  };
  return (
    <div className="SignUpContainer">
      <div className="SignUpBox">
        <input
          className="InputSignup"
          placeholder="Test@gmail.com"
          onChange={handle_change_email}
          type={"email"}
        ></input>
        <input
          className="InputSignup"
          placeholder="Password"
          onChange={handle_change_password}
          type={"text"}
        ></input>
        <button
          className="InputSignup button"
          onClick={() => {
            handle_submit(Email, Password);
          }}
        >
          Sign In
        </button>
      </div>
        <div className="InputLoginContainer">
          <button
            className="InputLogin button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Please Login to Go home page
          </button>
        </div>
    </div>
  );
};

export default Signup;
