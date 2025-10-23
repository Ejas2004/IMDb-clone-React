import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton({ to = "/" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to === "back") {
      navigate(-1);
    } else {
      navigate(to);
    }
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <ArrowLeft className="back-button-icon" />
      <span>Back</span>
    </button>
  );
}

export default BackButton;
