import React, { useState } from "react";
import "./SideBar2.css";
import AllSide from "./AllSide";

function SideBar2() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <div>
      <AllSide/>
      {/* <div className="sidenav">
      
        <div
          className={`dropdown-container ${activeDropdown === 1 ? "show" : ""}`}
        >
          <a href="0">Link 1</a>
          <a href="0">Link 2</a>
          <a href="0">Link 3</a>
        </div>
        <button
          className={`dropdown-btn ${activeDropdown === 2 ? "active" : ""}`}
          onClick={() => toggleDropdown(2)}
        >
          All Sports
          <i
            className={`fa fa-caret-down ${
              activeDropdown === 2 ? "active" : ""
            }`}
          ></i>
        </button>
        <div
          className={`dropdown-container ${activeDropdown === 2 ? "show" : ""}`}
        >
          <a href="0">Link 1</a>
          <a href="0">Link 2</a>
          <a href="0">Link 3</a>
        </div>
      </div>
      <div className="main"></div> */}
    </div>
  );
}

export default SideBar2;
