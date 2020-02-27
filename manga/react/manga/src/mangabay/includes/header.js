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
                <a href="/">HOME</a>
              </li>
              <li>
                <a href="/manga-list">MANGA LIST</a>
              </li>
              <li>
                <a href="/latest-release">LATEST RELEASE</a>
              </li>
              <li>
                <a href="/top-manga">TOP MANGA</a>
              </li>
              <li>
                <a href="/advance-search">ADVANCE SEARCH</a>
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
