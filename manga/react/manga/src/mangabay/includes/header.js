import React from "react";

import { Link } from "react-router-dom";

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
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/manga-list">MANGA LIST</Link>
              </li>
              <li>
                <Link to="/latest-release">LATEST RELEASE</Link>
              </li>
              <li>
                <Link to="/top-manga">TOP MANGA</Link>
              </li>
              <li>
                <Link to="/advance-search">ADVANCE SEARCH</Link>
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
