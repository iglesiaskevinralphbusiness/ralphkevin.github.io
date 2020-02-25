import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header-block">
          <div className="wrap"></div>
        </div>
        <div className="header-nav">
          <div className="wrap">
            <ul>
              <li>
                <a href="">HOME</a>
              </li>
              <li>
                <a href="">MANGA LIST</a>
              </li>
              <li>
                <a href="">LATEST RELEASE</a>
              </li>
              <li>
                <a href="">TOP MANGA</a>
              </li>
              <li>
                <a href="">ADVANCE SEARCH</a>
              </li>
            </ul>
            <div className="header-nav-search"></div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
