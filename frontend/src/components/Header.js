import React, { Component } from "react";
import HRCLogo from "../assets/logo.svg";
import mainLogo from "../assets/lefttext.png";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="Main-Grid">
          <div className="Left-Grid">
            <img src={mainLogo} className="CustLogo" />
          </div>
          <div className="Right-Grid">
            <img src={HRCLogo} className="HRCLogo" />
          </div>
        </div>
        <div className="Header">
          <h3>Invoice List</h3>
        </div>
      </div>
    );
  }
}

export default Header;
