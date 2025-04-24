import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import TermsAndConditions from "./TermsAndConditions";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
