import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login = () => {
  const URL = "http://localhost:8001/User/userlogin";
  const navigate = useNavigate();
  const [Result, SetResult] = useState([]);
  const [Password, SetPassword] = useState("");
  const [Email, SetEmail] = useState("");
  const handle_change_email = (e) => {
    SetEmail(e.target.value);
  };
  const handle_change_password = (e) => {
    SetPassword(e.target.value);
  };
  const handle_submit = async (email , password) => {
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
    result["status"] === "error"
      ? Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.length === 0 ? "Please fill the form" : Result["error"],
        })
      : Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Sucessfully",
          showConfirmButton: false,
          timer: 1500,
        });
    if (result["status"] === "ok") {
      navigate("/upload");
    }
  };
  return (
    <div className="LoginContainer">
      <div>Login To upload</div>
      <div className="SignUpBox">
        <input
          className="InputSignup"
          placeholder="Test@gmail.com"
          type={"email"}
          onChange={handle_change_email}
        ></input>
        <input
          className="InputSignup"
          placeholder="Password"
          type={"password"}
          onChange={handle_change_password}
        ></input>
        <button
          className="InputSignup button Login"
          onClick={() => {
            handle_submit(Email, Password);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
