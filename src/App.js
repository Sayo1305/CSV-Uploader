import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";

function App() {
  const [RefEmail , SetrefEmail] = useState("");
  return (
    <>
    <Routes>
      <Route element={<Login/>} path="/login" ></Route>
      <Route element= {<Upload RefEmail={RefEmail} SetrefEmail={SetrefEmail} />} path="/upload"></Route>
      <Route element={<Signup SetrefEmail={SetrefEmail}/>}  path ="/"></Route>
    </Routes>
    </>
  );
}

export default App;
