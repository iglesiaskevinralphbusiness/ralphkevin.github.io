import React from "react";

import { Link } from "react-router-dom";

class Header extends React.Component {
  state = {
    searchResult: [],
    list: this.props.list,
    show: false
  };

  render() {
    const { bookmarks } = this.props;
    const myBookmarks = this.countBookmarks(bookmarks);

    return (
      <header>
        <div className="header-block">
          <div className="wrap">
            <div className="colL">
              <Link to="/">
                <h1>
                  <img
                    src="./images/logo-body.png"
                    alt="MangaRiot - Read Manga Online"
                  ></img>
                </h1>
              </Link>
            </div>
            <div className="colR">
              <Link to="/bookmarks">Bookmarks ({myBookmarks})</Link>
              <Link to="/contact-us">Contact Us</Link>
            </div>
          </div>
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
            </ul>
            <div className="header-nav-search">
              <input
                type="text"
                placeholder="Search Manga Name / Artist"
                onKeyUp={this.handleSearch}
              ></input>
              <div
                className={
                  this.state.show
                    ? "auto-search-result"
                    : "auto-search-result hide"
                }
              >
                <ul>
                  {this.state.searchResult.map(s => (
                    <li>
                      <Link to={s.url} onClick={this.handleSelected}>
                        <div class="colL">
                          <span
                            style={{ backgroundImage: "url(" + s.image + ")" }}
                          ></span>
                        </div>
                        <div class="colR">
                          <span className="title">{s.name}</span>
                          <span className="artist">{s.artist}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                  {this.state.searchResult.length <= 0 && this.state.show ? (
                    <li className="no-found">
                      No matches found. Try different search...
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  handleSearch = e => {
    if (e.key === "Enter") {
      console.log("enter press here! ");
    } else {
      const value = e.target.value.trim();
      if (value.length >= 4) {
        const searchResult = this.state.list.filter(
          l =>
            l.name.toUpperCase().includes(value.toUpperCase()) ||
            l.artist.toUpperCase().includes(value.toUpperCase())
        );
        const show = true;
        this.setState({ searchResult, show });
      } else {
        const show = false;
        this.setState({ show });
      }
    }
  };
  handleSelected = () => {
    const searchResult = [];
    const show = false;
    this.setState({ searchResult, show });
  };

  countBookmarks = bookmarks => {
    const total = bookmarks.length;
    return total;
  };
}

export default Header;
